// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=12-X

// PERFORMANCE NOTE: Increasing any of the following parameters by 1 will
//   cause the program to take either 2x longer or 4x longer.
//   For example: if the numbers are 6,2,1,10 and the program takes 10 seconds to run,
//   then increasing them to 12,8,6,16 will cause the program to take approximately 2,700 years.
//   ...so when experimenting here it's best to start with small changes.

var res_full_bits    = 11;  // Number of bits in x,y in the complete image. 8 means the image is 256x256
var res_aa_bits      = 4;  // Number of bits in x,y per sub-pixel tile. 2 means tiles are 4x4
var num_counter_bits = 7;  // The effective bit depth of the result.
var accum_bits       = 10; // Scratch qubits for the shader. More scratch bits means we can do more complicated math

var res_full        = 1 << res_full_bits; // The x and y size of the full image, before sampling.
var res_aa          = 1 << res_aa_bits;   // The x and y size of each subpixel tile.
var res_tiles       = res_full / res_aa;  // The number of tiles which make up one image row or column.

var qss_full_lookup_table = null;
var qss_count_to_hits = [];

var do_shortcut_qss = true; // Use classical sampling based on the ideal result to approximate the QSS result
var do_monte_carlo  = true; // Generate the MonteCarlo image

// The main function draws the full-size image for reference, then constructs the QSS lookup table,
// and then finally uses QSS to draw the sampled image.
function main()
{
    setup_display_boxes();

    // Draw the whole image, so we can see what we're sampling.
    draw_reference_res_images();

    // Create the QSS lookup table
    // This can be done beforehand and saved for use with multiple QSS images
    create_qss_lookup_table();

    do_qss_image();

    draw_confidence_map();
}

// The quantum pixel shader is the function which is called for each iteration.
// When drawing the full-size image, this is called per sub-pixel. 
function shader_quantum(qx, qy, tx, ty, qacc, condition, out_color)
{

    var hbin = 0|(2 * tx / res_tiles);
    var stripe_size = res_full_bits - 4;
    var bmask = 1 << stripe_size;
    if (hbin == 0)
        bmask <<= 1;

    var mask = qacc.bits(bmask);
    mask.orEquals(condition);

    // Make big fuzzy stripes
    var ty_shift = res_aa_bits - 1;
    var tx_shift = res_aa_bits - 3;
    var qy_shift = res_full_bits - res_aa_bits - 4;
    var qx_shift = res_full_bits - res_aa_bits - 5;
    qx_shift = (qx_shift < 0) ? 0 : qx_shift;
    qy_shift = (qy_shift < 0) ? 0 : qy_shift;

    var hbin = 0|(5 * tx / res_tiles);
    var vbin = 0|(4 * ty / res_tiles);
    if (vbin == 3)
    {
        if (hbin == 0)
        {
        }
        else if (hbin == 1)
        {
          qx.cnot(qy);
          xor_color(null, qx.bits(0x3).or(condition), out_color);
          qx.cnot(qy);
        }
        else if (hbin == 2)
        {
          qx.cnot(qy);
          xor_color(null, qx.bits(0x1).or(condition), out_color);
          qx.cnot(qy);
        }
        else if (hbin == 4)
            xor_color(null, condition, out_color);
        else if (hbin == 3)
        {
          qx.cnot(qy);
          xor_color(null, condition, out_color);
          xor_color(null, qx.bits(0x3).or(condition), out_color);
          qx.cnot(qy);
        }
    }
    else
    {
        // Make big fuzzy stripes
//        qacc.subtractShifted(tx, tx_shift);
        qacc.addShifted(ty, ty_shift);
        qacc.addShifted(qy, qy_shift);
        xor_color(null, mask, out_color);
//        qacc.addShifted(tx, tx_shift);
        qacc.subtractShifted(ty, ty_shift);
        qacc.subtractShifted(qy, qy_shift);
    }
}


// Flip num_terms_to_flip terms of quantum reg x, conditional on condition
function flip_n_terms(x, num_terms_to_flip, condition)
{
    // This is a simple brute-force way to do it, but as this function
    // is only used to build the look-up tables, that's ok.
    var terms_flipped = 0;
    for (var i = 0; i < num_terms_to_flip; ++i)
    {
        x.not(i);
        x.cphase(180, ~0, condition);
        x.not(i);
    }
}

function create_qss_lookup_table()
{
    qc.clearOutput();
    qc.disableAnimation();
    qc.disableRecording();

    qc.reset((res_aa_bits + res_aa_bits) + num_counter_bits);
    var qxy = qint.new(res_aa_bits + res_aa_bits, 'qxy');
    var qcount = qint.new(num_counter_bits, 'count');

    var num_subpixels = 1 << (res_aa_bits + res_aa_bits);
    qss_full_lookup_table = null;
    for (var hits = 0; hits <= num_subpixels; ++hits)
        create_table_column(hits, qxy, qcount);
    var cw = qss_full_lookup_table;

    qss_count_to_hits = [];
    for (var count = 0; count < cw.length; ++count)
    {
        var best_hits = 0;
        var best_prob = 0;
        for (var hits = 0; hits < cw[0].length; ++hits)
        {
            if (best_prob < cw[count][hits])
            {
                best_prob = cw[count][hits];
                best_hits = hits;
            }
        }
        qss_count_to_hits.push(best_hits);
    }
    // Draw the cw table
    if (qss_full_lookup_table && display_cwtable)
    {
        var disp = display_cwtable;
        var ysize = cw.length;
        var xsize = cw[0].length;
        disp.setup(xsize, ysize, 16);
        for (var y = 0; y < ysize; ++y)
            for (var x = 0; x < xsize; ++x)
                disp.pixel(x, y, cw[y][x]);
        disp.span.innerHTML = 'QSS Probability Table<br/>' +
                                'horiz = '+num_subpixels+' hits<br/>' +
                                'vert = '+(1 << num_counter_bits)+' sample rows';
    }
}

function draw_confidence_map()
{
    // Draw the confidence map
    if (ideal_result && qss_raw_result)
    {
        var cw = qss_full_lookup_table;
        display_confidence.label('Confidence Map');
        for (var ty = 0; ty < res_tiles; ++ty)
        {
            for (var tx = 0; tx < res_tiles; ++tx)
            {
                var ysize = cw.length;
                var xsize = cw[0].length;
                var qss_out = qss_raw_result[ty][tx];
                // Given the QSS result, find the confidence
                var row_total = 0;
                var row_max = 0;
                for (var x = 0; x < xsize; ++x)
                {
                    var val = cw[qss_out][x];
                    row_total += val;
                    if (val > row_max)
                        row_max = val;
                }
                var confidence = row_max / row_total;
                display_confidence.pixel(tx, ty, confidence);
            }
        }
    }
}

function create_table_column(color, qxy, qcount)
{
    var num_subpixels = 1 << (res_aa_bits + res_aa_bits);

    var true_count = color;

    // Put everything into superposition
    qc.write(0);
    qcount.hadamard();
    qxy.hadamard();

    for (var i = 0; i < num_counter_bits; ++i)
    {
        var reps = 1 << i;
        var condition = qcount.bits(reps);
        var mask_with_condition = qxy.bits().or(condition);
        for (var j = 0; j < reps; ++j)
        {
            flip_n_terms(qxy, true_count, condition);
            grover_iteration(qxy.bits(), mask_with_condition);
        }
    }
    invQFT(qcount);

    // Construct the translation table
    var table = [];
    for (var i = 0; i < (1 << num_counter_bits); ++i)
        table.push(qcount.peekProbability(i));
    if (qss_full_lookup_table == null)
    {
        qss_full_lookup_table = [];
        for (var i = 0; i < (1 << num_counter_bits); ++i)
        {
            qss_full_lookup_table.push([]);
            for (var j = 0; j < num_subpixels; ++j)
                qss_full_lookup_table[i].push(0);
        }
    }
    for (var col = 0; col < (1 << num_counter_bits); ++col)
        qss_full_lookup_table[col][true_count] = table[col];
}



///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
var ideal_result = null;
var qss_raw_result = null;

function draw_reference_res_images()
{
    qc.clearOutput();
    qc.disableAnimation();
    qc.disableRecording();

    var bits = res_aa_bits;
    var disable_simulation = 30; // overload the qubits to disable the quantum sim and fall back to digital
    var total_qubits = 2 * bits + accum_bits + 1 + disable_simulation; // +30 is to disable sim
    qc.reset(total_qubits);

    var qx = qint.new(bits, 'qx');
    var qy = qint.new(bits, 'qy');
    var qacc = qint.new(accum_bits, 'scratch');
    var color = qint.new(1, 'color');
    qc.write(0);
    if (qacc)
        qacc.write(0);

    var num_monte_carlo_samples = (1 << num_counter_bits) - 1;
    var num_subpixels = res_aa * res_aa;
    var total_pixel_error = 0;
    var num_zero_error_pixels = 0;

    ideal_result = [];
    for (var ty = 0; ty < res_tiles; ++ty)
    {
        ideal_result.push([]);
        console.log('full-res row ' + ty + ' of ' + res_tiles);
        for (var tx = 0; tx < res_tiles; ++tx)
        {
            // Do full-res reference, and also ideal sampling
            var tile_ideal_sum = 0;
            for (var y = 0; y < res_aa; ++y)
            {
                for (var x = 0; x < res_aa; ++x)
                {
                    qx.write(x);
                    qy.write(y);
                    color.write(0);
                    shader_quantum(qx, qy, tx, ty, qacc, null, color);
                    var subpixel_value = color.read();
                    var full_x = (tx << res_aa_bits) + x;
                    var full_y = (ty << res_aa_bits) + y;
                    display_qfull_res.pixel(full_x, full_y, subpixel_value);
                    tile_ideal_sum += subpixel_value;
                }
            }
            ideal_result[ty].push(tile_ideal_sum);
            display_ground_truth.pixel(tx, ty, tile_ideal_sum / num_subpixels);

            if (do_monte_carlo)
            {
                // Do Monte Carlo sampling
                var tile_monte_carlo_sum = 0;
                for (var sample = 0; sample < num_monte_carlo_samples; ++sample)
                {
                    var x = random_int(res_aa);
                    var y = random_int(res_aa);
                    qx.write(x);
                    qy.write(y);
                    color.write(0);
                    shader_quantum(qx, qy, tx, ty, qacc, null, color);
                    tile_monte_carlo_sum += color.read();
                }
                display_monte_carlo.pixel(tx, ty, tile_monte_carlo_sum / num_monte_carlo_samples);
                var normalized_mc_sum = Math.round(num_subpixels * tile_monte_carlo_sum / num_monte_carlo_samples);
                var pixel_error = Math.abs(normalized_mc_sum - tile_ideal_sum);
                if (pixel_error)
                    total_pixel_error += pixel_error;
                else
                    num_zero_error_pixels++;
            }
        }
    }
    if (do_monte_carlo)
    {
        var average_pixel_error_percent = Math.round(100 * total_pixel_error / (res_tiles * res_tiles * num_subpixels));
        var zero_error_pixels_percent = Math.round(100 * num_zero_error_pixels / (res_tiles * res_tiles));
        display_monte_carlo.label('Monte Carlo result<br/>'+num_monte_carlo_samples+' samples/tile<br/>'
                                  +res_tiles+'x'+res_tiles+' pixels<br/>'
                                  +'avg pixel error: '+average_pixel_error_percent+'%<br/>'
                                  +'zero-error pixels: '+zero_error_pixels_percent+'%<br/>');
    }
    display_qfull_res.label('Full-resolution reference<br/>'+res_full+'x'+res_full+' pixels');
    display_ground_truth.label('Ideal sampling reference<br/>'+res_tiles+'x'+res_tiles+' pixels');
    qc.qReg.disableSimulation = false;
}

// Return a random int [0,range)
function random_int(range)
{
    return Math.floor(Math.random() * range) % range;
}

function qss_tile(sp)
{
    if (do_shortcut_qss && ideal_result)
    {
        var cw = qss_full_lookup_table;
        var ysize = cw.length;
        var xsize = cw[0].length;
        var true_val = ideal_result[sp.ty][sp.tx];

        // Given the true val, simulate a QSS reult
        var total_prob = 0;
        for (var y = 0; y < ysize; ++y)
            total_prob += cw[y][true_val];
        var dice = Math.random() * total_prob;
        var qss_out = 0;
        var prob = 0;
        for (var y = 0; y < ysize; ++y)
        {
            prob += cw[y][true_val];
            if (prob >= dice)
            {
                qss_out = y;
                break;
            }
        }
        sp.readVal = qss_out;
        sp.hits = qss_count_to_hits[sp.readVal];
        sp.color = sp.hits / (res_aa * res_aa);
        return sp.color;
    }
    sp.qx.write(0);
    sp.qy.write(0);
    sp.counter.write(0);
    sp.qx.hadamard();
    sp.qy.hadamard();
    sp.counter.hadamard();
    for (var cbit = 0; cbit < num_counter_bits; ++cbit)
    {
        var iters = 1 << cbit;
        var qxy_bits = sp.qx.bits().or(sp.qy.bits());
        var condition = sp.counter.bits(iters);
        var mask_with_condition = qxy_bits.or(condition);
        for (var i = 0; i < iters; ++i)
        {
            shader_quantum(sp.qx, sp.qy, sp.tx, sp.ty, sp.qacc, condition, sp.qcolor);
            grover_iteration(qxy_bits, mask_with_condition);
        }
    }
    invQFT(sp.counter);

    sp.readVal = sp.counter.read();
    sp.hits = qss_count_to_hits[sp.readVal];
    sp.color = sp.hits / (res_aa * res_aa);
    return sp.color;
}

// This one is the best so far.
function do_qss_image()
{
    var sp = {};
    qc.clearOutput();
    qc.disableAnimation();
    qc.disableRecording();

    var total_qubits = 2 * res_aa_bits + num_counter_bits + accum_bits;
    qc.reset(total_qubits);

    sp.qx = qint.new(res_aa_bits, 'qx');
    sp.qy = qint.new(res_aa_bits, 'qy');
    sp.counter = qint.new(num_counter_bits, 'counter');
    sp.qacc = qint.new(accum_bits, 'scratch');

    var total_pixel_error = 0;
    var num_zero_error_pixels = 0;

    qss_raw_result = [];

    sp.qacc.write(0);
    for (sp.ty = 0; sp.ty < res_tiles; ++sp.ty)
    {
        qss_raw_result.push([]);
        console.log('QSS row ' + sp.ty + ' of ' + res_tiles);
        for (sp.tx = 0; sp.tx < res_tiles; ++sp.tx)
        {
            qss_tile(sp);
            qss_raw_result[sp.ty].push(sp.readVal);
            display_qss.pixel(sp.tx, sp.ty, sp.color);
            if (ideal_result)
            {
                var pixel_error = Math.abs(sp.hits - ideal_result[sp.ty][sp.tx]);
                if (pixel_error)
                    total_pixel_error += pixel_error;
                else
                    num_zero_error_pixels++;
            }
        }
    }

    var num_qss_iterations = (1 << num_counter_bits) - 1;
    if (ideal_result)
    {
        var num_subpixels = res_aa * res_aa;
        var average_pixel_error_percent = Math.round(100 * total_pixel_error / (res_tiles * res_tiles * num_subpixels));
        var zero_error_pixels_percent = Math.round(100 * num_zero_error_pixels / (res_tiles * res_tiles));
        display_qss.label('QSS result<br/>'+num_qss_iterations+' iterations/tile<br/>'
                          +res_tiles+'x'+res_tiles+' pixels<br/>'
                          +'avg pixel error: '+average_pixel_error_percent+'%<br/>'
                          +'zero-error pixels: '+zero_error_pixels_percent+'%<br/>');
    }
    else
    {
        display_qss.label('QSS result<br/>'+num_qss_iterations+' iterations/tile<br/>'
                          +res_tiles+'x'+res_tiles+' pixels<br/>');
    }
}


function grover_iteration(mask, mask_with_condition)
{
    qc.label('Grover iteration');
    qc.hadamard(mask);
    qc.not(mask);
    qc.cphase(180, mask_with_condition);
    qc.not(mask);
    qc.hadamard(mask);
}

function invQFT(x)
{
    var bits = x.numBits;
    qc.label('inverse QFT');
    for (var i = 0; i < bits; ++i)
    {
        var bit1 = bits - (i + 1);
        var mask1 = 1 << bit1;
        x.hadamard(mask1);
        var theta = -90.0;
        for (var j = i + 1; j < bits; ++j)
        {
            var bit2 = bits - (j + 1);
            var mask2 = 1 << bit2;
            x.cphase(theta, mask1 + mask2);
            theta *= 0.5;
        }
    }
}










var display_ground_truth = null;
var display_monte_carlo = null;
var display_qfull_res = null;
var display_qss = null;
var display_confidence = null;
var display_cwtable = null;



function setup_display_boxes()
{
    display_ground_truth = new DisplayBox('display_ground_truth');
    display_monte_carlo = new DisplayBox('display_monte_carlo');
    display_qfull_res = new DisplayBox('display_qfull_res');
    display_qss = new DisplayBox('display_qss');
    display_confidence = new DisplayBox('display_confidence');
    display_cwtable = new DisplayBox('display_cwtable');
    display_ground_truth.setup(res_tiles, res_tiles, res_aa);
    display_monte_carlo.setup(res_tiles, res_tiles, res_aa);
    display_qfull_res.setup(res_full, res_full, 1);
    display_qss.setup(res_tiles, res_tiles, res_aa);
    display_confidence.setup(res_tiles, res_tiles, res_aa);
    display_cwtable.setup(res_tiles, res_tiles, res_aa);
}



function xor_color(qq, condition, out_color)
{
  if (qq)
  {
    if (out_color)
      out_color.cnot(qq, ~0, condition);
    else
      qq.cphase(180, ~0, condition);
  }
  else
  {
    if (out_color)
      out_color.cnot(null, ~0, condition);
    else
      qc.cphase(180, condition);
  }
}

function DisplayBox(canvas_name)
{
    this.canvas = document.getElementById(canvas_name);
    this.span = document.getElementById(canvas_name + '_span');
    this.ctx = this.canvas.getContext('2d');
    this.resolution_x = this.canvas.width;
    this.resolution_y = this.canvas.height;

    this.clear = function()
    {
        this.ctx.fillStyle = '#afafdf';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.setup = function(resolution_x, resolution_y, ss_scale)
    {
        this.resolution_x = resolution_x;
        this.resolution_y = resolution_y;
        this.canvas.width = this.resolution_x * ss_scale;
        this.canvas.height = this.canvas.width * this.resolution_y / this.resolution_x;
    }

    this.pixel = function(x, y, color)
    {
        var gamma_correct = false;
        if (gamma_correct)
        {
            var inv_gamma = 1.0 / 2.2;
            color = Math.pow(color, inv_gamma);
        }
        var bright = (255 * color).toFixed(0);
        var w = this.canvas.width / this.resolution_x;
        var h = this.canvas.height / this.resolution_y;
        var x1 = x * w;
        var y1 = y * h;
        this.ctx.fillStyle = 'rgb('+bright+','+bright+','+bright+')';
        this.ctx.fillRect(x1, y1, w, h);
    }

    this.pixelRGB = function(x, y, color)
    {
        var inv_gamma = 1.0 / 2.2;
        var r = Math.pow(color[0], inv_gamma);
        var g = Math.pow(color[1], inv_gamma);
        var b = Math.pow(color[2], inv_gamma);
        r = (255 * r).toFixed(0);
        g = (255 * g).toFixed(0);
        b = (255 * b).toFixed(0);
        var w = this.canvas.width / this.resolution_x;
        var h = this.canvas.height / this.resolution_y;
        var x1 = x * w;
        var y1 = y * h;
        this.ctx.fillStyle = 'rgb('+r+','+g+','+b+')';
        this.ctx.fillRect(x1, y1, w, h);
    }

    this.label = function(text)
    {
        this.span.innerHTML = text;
    }

    this.get_bw_pixels = function(width, height)
    {
        var imgd = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        var pix = imgd.data;
        var out_bytes = new Array();
        var src_row_index = 0;
        var src_col_pitch = 4 * this.canvas.width / width;
        var src_row_pitch = src_col_pitch * width * this.canvas.height / height;

        for (var row = 0; row < height; ++row)
        {
            var src_index = src_row_index;
            for (var col = 0; col < width; ++col)
            {
                out_bytes.push(pix[src_index]);
                src_index += src_col_pitch;
            }
            src_row_index += src_row_pitch;
        }
    }


}



main();

