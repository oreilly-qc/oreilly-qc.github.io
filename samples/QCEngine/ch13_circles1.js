// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=13-4

// PERFORMANCE NOTE: Increasing any of the following parameters by 1 will
//   cause the program to take either 2x longer or 4x longer.
//   For example: if the numbers are 6,2,1,10 and the program takes 10 seconds to run,
//   then increasing them to 12,8,6,16 will cause the program to take approximately 2,700 years.
//   ...so when experimenting here it's best to start with small changes.

var res_full_bits    = 6;  // Number of bits in x,y in the complete image. 8 means the image is 256x256
var res_aa_bits      = 2;  // Number of bits in x,y per sub-pixel tile. 2 means tiles are 4x4
var num_counter_bits = 1;  // The effective bit depth of the result.
var accum_bits       = 10; // Scratch qubits for the shader. More scratch bits means we can do more complicated math

var res_full        = 1 << res_full_bits; // The x and y size of the full image, before sampling.
var res_aa          = 1 << res_aa_bits;   // The x and y size of each subpixel tile.
var res_tiles       = res_full / res_aa;  // The number of tiles which make up one image row or column.

// The main function draws the full-size image for reference, then constructs the QSS lookup table,
// and then finally uses QSS to draw the sampled image.
function main()
{
    setup_display_boxes();

    qc.clearOutput();
    qc.disableAnimation();

    // Draw the whole image, so we can see what we're sampling.
    draw_full_res_image();

    var shader_params = {};
    test_quantum_supersample_counter3(shader_params);
}

// The quantum pixel shader is the function which is called for each iteration.
// When drawing the full-size image, this is called per sub-pixel. 
function shader_quantum(qx, qy, tx, ty, qacc, condition, out_color)
{
    var num_bins = 16;
    var hbin = 0|(num_bins * tx / res_tiles);
    var vbin = 0|(num_bins * ty / res_tiles);

    var ball_pos = [2, 2];
    var ball_radius = 1;
    var is_ball = hbin >= (ball_pos[0] - ball_radius) && hbin < (ball_pos[0] + ball_radius)
                         && vbin >= (ball_pos[1] - ball_radius) && vbin < (ball_pos[1] + ball_radius);
    var is_sky = (vbin & 4) == 0 && !is_ball;
    var is_ground = !is_ball && !is_sky;

    if (1 || is_ball)
    {
        // drawing a circle is tricky, because we want x^2+y^2<r^2, but we don't have
        // a great way to accumulate the squared sum of tx*res+qx. Instead,
        // we can make use of (a+b)^2 = a^2+2ab+b^2.
        var tiles_per_bin = res_tiles / num_bins;
        var bx = ball_pos[0] * tiles_per_bin;
        var by = ball_pos[1] * tiles_per_bin;
        var br = ball_radius * tiles_per_bin * res_aa;
        var dx = tx - bx;
        var dy = ty - by;
        if (dx < 0) dx = -(dx + 1);
        if (dy < 0) dy = -(dy + 1);
        dx *= res_aa;
        dy *= res_aa;
//        console.log('tx'+tx+' ty'+ty+' dx'+dx+' dy'+dy);
        qacc.add(dx * dx + dy * dy - br * br);
        if (tx < bx)
            qx.not();
        if (ty < by)
            qy.not();
        for (var i = 0; i < dx; ++i)
            qacc.addShifted(qx, 1);
        for (var i = 0; i < dy; ++i)
            qacc.addShifted(qy, 1);
        qacc.addSquared(qx);
        qacc.addSquared(qy);
//        qacc.add(dx + dy - br);
        var acc_sign_bit = 1 << (accum_bits - 1);
        var mask = qacc.bits(acc_sign_bit);
        mask.orEquals(condition);
        xor_color(null, mask, out_color);
//        qacc.subtract(dx + dy - br);
        qacc.subtractSquared(qx);
        qacc.subtractSquared(qy);
        for (var i = 0; i < dx; ++i)
            qacc.subtractShifted(qx, 1);  // todo make this shifted again
        for (var i = 0; i < dy; ++i)
            qacc.subtractShifted(qy, 1);
        qacc.subtract(dx * dx + dy * dy - br * br);
        if (tx < bx)
            qx.not();
        if (ty < by)
            qy.not();
    }
    if (0 && is_sky)
    {
        // sky
        if (0) {
        qacc.addShifted(ty, ty_shift);
        qacc.addShifted(qy, qy_shift);
        xor_color(null, mask, out_color);
        qacc.subtractShifted(ty, ty_shift);
        qacc.subtractShifted(qy, qy_shift);
        } else {
            // just gray sky
            qx.cnot(qy, 0x1);
            var mask = qx.bits(0x1);
            mask.orEquals(condition);
            xor_color(null, mask, out_color);
            qx.cnot(qy, 0x1);
        }
    }
    if (0 && is_ground)
    {
        // perspective checkerboard
        var tile_shift = res_aa_bits;
        var y_offset = res_full >> 2;
        if (ty >= (res_tiles >> 1))
            y_offset += res_full >> 1;

        var x_offset = (res_full) >> 1;

        var left_side = (tx < (res_tiles >> 1));
        var slopes = [[1,0],[0,1],[0,2]]; // checkerboard vertical edge slopes
        if (left_side)
            slopes = [[0,0],[0,1],[0,2]];
// Draw checkerboard perspective
        for (var slope = 0; slope < slopes.length; ++slope)
        {

            var num = slopes[slope][0];
            var denom = slopes[slope][1];

            // mirror horiz
            x_offset = 0;
            txx = tx % (res_tiles >> 1);
            if (left_side)
            {
                txx = (res_tiles >> 1) - txx;
                qx.not();
            }

            qacc.add((txx << (tile_shift + num)) - (x_offset << num));
            qacc.addShifted(qx, num);
            qacc.subtract((ty << (tile_shift + denom)) - (y_offset << denom));
            qacc.subtractShifted(qy, denom);
            var acc_sign_bit = 1 << (accum_bits - 1);
            var mask = qacc.bits(acc_sign_bit);
            mask.orEquals(condition);
            xor_color(null, mask, out_color);
            qacc.addShifted(qy, denom);
            qacc.add((ty << (tile_shift + denom)) - (y_offset << denom));
            qacc.subtractShifted(qx, num);
            qacc.subtract((txx << (tile_shift + num)) - (x_offset << num));

            if (left_side)
            {
                txx = (res_tiles >> 1) - txx;
                qx.not();
            }
        }

        // Draw checkerboard parallel
        for (var band = 0; band < 6; ++band)
        {
                var band_bit = 1 << (band + 1);
                qacc.subtract((ty << (tile_shift)) - (y_offset));
                qacc.subtract(qy);
                var acc_bit =qacc.bits(~(band_bit - 1));
                var mask = acc_bit;
                mask.orEquals(condition);
                xor_color(null, mask, out_color);
                qacc.add(qy);
                qacc.add((ty << (tile_shift)) - (y_offset));
        }
    }
}

var auto_counter_tables = [];

function get_counter_table(qres_bits, sp)
{
  test_create_all_tables(qres_bits, qres_bits, num_counter_bits, num_counter_bits, sp);
  return auto_counter_tables[qres_bits][num_counter_bits];
}

var count_full_translation_table = null;

function trace_merge(x, count, condition)
{
  for (var i = 0; i < count; ++i)
  {
    x.not(i);
    x.phaseShift(180, ~0, condition);
//    xor_color(x, condition, null);
    x.not(i);
  }
}
function trace_merge_nophase(x, count, condition, out_bit)
{
  var mask = qintMask([x, ~0]);
  mask.orEquals(condition);
  for (var i = 0; i < count; ++i)
  {
    x.not(i);
    xor_color(null, mask, out_bit);
    x.not(i);
  }
}

function test_create_all_tables(min_qres_bits, max_qres_bits, min_counter_bits, max_counter_bits, sp)
    {
        var counter_tables = auto_counter_tables;
        for (var qres_bits = 0; qres_bits <= max_qres_bits; ++qres_bits)
        {
            while (counter_tables.length <= qres_bits)
                counter_tables.push([]);


            for (var counter_bits = 0; counter_bits <= max_counter_bits; ++counter_bits)
            {
                count_full_translation_table = null;
                if (qres_bits >= min_qres_bits && counter_bits >= min_counter_bits)
                {
                    var max_hits = (1 << (qres_bits - 0));
                    for (var hits = 0; hits <= max_hits; ++hits)
                        test_create_table(qres_bits, counter_bits, hits, sp);
                }
                var table_obj = {probabilities: null,
                count_wave_table_full: count_full_translation_table
            }

            var cw = table_obj.count_wave_table_full;
            if (cw)
            {
                // Build the count-to-hits lookup
                table_obj.count_to_hits = [];
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
                    table_obj.count_to_hits.push(best_hits);
                }
                // Build the count-to-hits (second-most-likely) lookup
                table_obj.count_to_hits2 = [];
                for (var count = 0; count < cw.length; ++count)
                {
                    var skip_hits = table_obj.count_to_hits[count];
                    var best_hits = 0;
                    var best_prob = 0;
                    for (var hits = 0; hits < cw[0].length; ++hits)
                    {
                        if (hits != skip_hits && best_prob < cw[count][hits])
                        {
                            best_prob = cw[count][hits];
                            best_hits = hits;
                        }
                    }
                    // Now find the best count for that number of hits
                    best_prob = 0;
                    best_cc = 0;
                    for (var cc = 0; cc < cw.length; ++cc)
                    {
                        if (table_obj.count_to_hits[cc] != skip_hits && best_prob < cw[cc][best_hits])
                        {
                            best_prob = cw[cc][best_hits];
                            best_cc = cc;
                        }
                    }
                    table_obj.count_to_hits2.push(table_obj.count_to_hits[best_cc]);
                }

                // Build the count-to-hits (third-most-likely) lookup
                table_obj.count_to_hits3 = [];
                for (var count = 0; count < cw.length; ++count)
                {
                    var skip_hits1 = table_obj.count_to_hits[count];
                    var skip_hits2 = table_obj.count_to_hits2[count];
                    var best_hits = 0;
                    var best_prob = 0;
                    for (var hits = 0; hits < cw[0].length; ++hits)
                    {
                        if (hits != skip_hits1 && hits != skip_hits2 &&
                                best_prob < cw[count][hits])
                        {
                            best_prob = cw[count][hits];
                            best_hits = hits;
                        }
                    }
                    // Now find the best count for that number of hits
                    best_prob = 0;
                    best_cc = 0;
                    for (var cc = 0; cc < cw.length; ++cc)
                    {
                        if (table_obj.count_to_hits[cc] != skip_hits1 &&
                                table_obj.count_to_hits[cc] != skip_hits2 &&
                                best_prob < cw[cc][best_hits])
                        {
                            best_prob = cw[cc][best_hits];
                            best_cc = cc;
                        }
                    }
                    table_obj.count_to_hits3.push(table_obj.count_to_hits[best_cc]);
                }
                // Draw the cw table
                if (cw && display_cwtable)
                {
                    var disp = display_cwtable;
                    var ysize = cw.length;
                    var xsize = cw[0].length;
                    disp.setup(xsize, ysize, 16);//789789
                    for (var y = 0; y < ysize; ++y)
                        for (var x = 0; x < xsize; ++x)
                            disp.pixel(x, y, cw[y][x]);
                    disp.span.innerHTML = 'QSS Probability Table<br/>' +
                                            'horiz = '+(1 << (res_aa_bits*res_aa_bits))+' hits<br/>' +
                                            'vert = '+(1 << counter_bits)+' output gray levels';
                }
            }
            while (counter_tables[qres_bits].length <= counter_bits)
                counter_tables[qres_bits].push(null);
            counter_tables[qres_bits][counter_bits] = table_obj;
        }
    }
    auto_counter_tables = counter_tables;
    var str = JSON.stringify(auto_counter_tables);
    console.log(str);
}

function get_pregenerated_counter_tables()
{
  return null;
}

// THIS WILL CREATE the table!
function test_create_table(bits, count_bits, width, sp)
{

// If we have a table for this already, skip the construction.
    var tables = get_pregenerated_counter_tables();
    if (tables
        && tables.length > bits
        && tables[bits].length > count_bits
        && tables[bits][count_bits])
    {
        console.log('Using pre-generated table for qx_bits='+bits+' count_bits='+count_bits);
        count_full_translation_table = tables[bits][count_bits];
        return;
    }



    qc.reset(bits + count_bits);
    var max_hits = 1 << bits;

    var true_count = width;

    var ray_x = qint.new(bits, 'ray_x');
    var count = qint.new(count_bits, 'count');
    count.write(0);
    count.hadamard();
    ray_x.write(0);
    ray_x.hadamard(~0);


    var qcolor_index = 0;
    for (var i = 0; i < count_bits; ++i)
    {
        var reps = 1 << i;
        var condition = qintMask([count, reps]);
        var xmask = qintMask([ray_x, ~0]);
        var xmask_cond = qintMask([ray_x, ~0]);
        xmask_cond.orEquals(condition);
        for (var j = 0; j < reps; ++j)
        {
            trace_merge(ray_x, true_count, condition);
            grover_iteration(ray_x, condition);
        }
    }
    invQFT(count);

    // Construct the translation table
    // TODO: We can also construct a confidence table from this.
    if (1)
    {
        var table = [];
        for (var i = 0; i < (1 << count_bits); ++i)
            table.push(count.peekProbability(i));
        if (count_full_translation_table == null)
        {
            count_full_translation_table = [];
            for (var i = 0; i < (1 << count_bits); ++i)
            {
                count_full_translation_table.push([]);
                for (var j = 0; j < max_hits; ++j)
                    count_full_translation_table[i].push(0);
            }
        }
        for (var i = 0; i < (1 << count_bits); ++i)
        {
            count_full_translation_table[i][true_count] = table[i];
        }
        if (1)  // Check and print
        {
            var str = '';
            for (var i = 0; i < (1 << count_bits); ++i)
            {
                for (var j = 0; j < max_hits; ++j)
                    str += '' + count_full_translation_table[i][j] + ' ';
                str += '\n'
            }
            console.log(str);
        }
    }
}



///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

function draw_full_res_image()
{
    qc.disableAnimation();
    qc.disableRecording();

    var disp = display_qfull_res;
    var bits = res_aa_bits;
    var total_qubits = 2 * bits + accum_bits + 1 + 30; // +30 is to disable sim
    if (enableGPUBlocks)
    qc.reset(total_qubits, total_qubits);
    else
    qc.reset(total_qubits);

    var qx = qint.new(bits, 'qx');
    var qy = qint.new(bits, 'qy');
    var qacc = qint.new(accum_bits, 'scratch');
    var color = qint.new(1, 'color');
    qc.write(0);
    if (qacc)
        qacc.write(0);

    for (var y = 0; y < res_full; ++y)
    {
        console.log('row ' + y);
        for (var x = 0; x < res_full; ++x)
        {
            var tx = x >> res_aa_bits;
            var ty = y >> res_aa_bits;
            qx.write(x % res_aa);
            qy.write(y % res_aa);
            color.write(0);
            shader_quantum(qx, qy, tx, ty, qacc, null, color);
            disp.pixel(x, y, color.read());
        }
    }
    disp.label('quantum shader<br/>full res');
    qc.qReg.disableSimulation = false;
}

function qss_tile(sp, is_qne)
{
//  console.log(' ty ' + sp.ty + ' tx ' + sp.tx);
    sp.qx.write(0);
    sp.qy.write(0);
    sp.counter.write(0);
    if (sp.qcolor)
        sp.qcolor.write(0);
    sp.qx.hadamard();
    sp.qy.hadamard();
    sp.counter.hadamard();
    for (var cbit = 0; cbit < num_counter_bits; ++cbit)
    {
        var iters = 1 << cbit;
        var condition = qintMask([sp.counter, iters]);
        var qxqy_mask = qintMask([sp.qx, ~0, sp.qy, ~0]);
        var qxqy_cond = qintMask([sp.counter, iters, sp.qx, ~0, sp.qy, ~0]);
        if (sp.qcolor)
            shader_quantum(sp.qx, sp.qy, sp.tx, sp.ty, sp.qacc, condition, sp.qcolor);
        for (var i = 0; i < iters; ++i)
        {
            if (sp.qcolor)
                sp.qcolor.phaseShift(180, ~0, condition);
            else
                shader_quantum(sp.qx, sp.qy, sp.tx, sp.ty, sp.qacc, condition, sp.qcolor);

            grover_iteration_mask(qxqy_mask, qxqy_cond);
        }
    }
    invQFT(sp.counter);

    sp.readVal = sp.counter.read();
    sp.hits = sp.hit_table.count_to_hits[sp.readVal];
    sp.color = sp.hits / (res_aa * res_aa);
    sp.qne_readVal = sp.readVal;
    sp.qne_hits = sp.hits;
    sp.qne_color = sp.color;
    return sp.color;
}

// This one is the best so far.
function test_quantum_supersample_counter3(sp)
{
    qc.disableAnimation();
    qc.disableRecording();
    sp.hit_table = get_counter_table(2 * res_aa_bits, num_counter_bits, sp);

    var total_qubits = 2 * res_aa_bits + num_counter_bits + accum_bits;
    if (enableGPUBlocks)
        qc.reset(total_qubits, total_qubits);
    else
        qc.reset(total_qubits);

    sp.qx = qint.new(res_aa_bits, 'qx');
    sp.qy = qint.new(res_aa_bits, 'qy');
    sp.counter = qint.new(num_counter_bits, 'counter');
    sp.qacc = qint.new(accum_bits, 'scratch');

    qc.codeLabel('init');

    sp.qacc.write(0);
    for (sp.ty = 0; sp.ty < res_tiles; ++sp.ty)
    {
        console.log('ty ' + sp.ty);
        for (sp.tx = 0; sp.tx < res_tiles; ++sp.tx)
        {
            qss_tile(sp);
            display_qss.pixel(sp.tx, sp.ty, sp.color);
        }
    }
    display_qss.label('QC q-count '+num_counter_bits);
}


function grover_iteration(x, condition)
{
    qc.codeLabel('Grover iteration');
    x.hadamard();
    x.not();
    x.phaseShift(180, ~0, condition);
    x.not();
    x.hadamard();
}

function grover_iteration_mask(mask, condition)
{
    qc.codeLabel('Grover iteration');
    qc.hadamard(mask);
    qc.not(mask);
    qc.phase(180, condition);
    qc.not(mask);
    qc.hadamard(mask);
}

function invQFT(x)
{
    var bits = x.numBits;
    qc.codeLabel('inverse QFT');
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
            x.phaseShift(theta, mask1 + mask2);
            theta *= 0.5;
        }
    }
}










var display_ground_truth = null;
var display_qfull_res = null;
var display_qss = null;
var display_cwtable = null;



function setup_display_boxes()
{
    display_ground_truth = new DisplayBox('display_ground_truth');
    display_qfull_res = new DisplayBox('display_qfull_res');
    display_qss = new DisplayBox('display_qss');
    display_ground_truth.setup(res_tiles, res_tiles, res_aa);
    display_qfull_res.setup(res_full, res_full, 1);
    display_qss.setup(res_tiles, res_tiles, res_aa);
    display_cwtable = new DisplayBox('display_cwtable');
    display_cwtable.setup(res_tiles, res_tiles, res_aa);
}



function xor_color(qq, condition, out_color)
{
  if (qq)
  {
    if (out_color)
      out_color.cnot(qq, ~0, condition);
    else
      qq.phaseShift(180, ~0, condition);
  }
  else
  {
    if (out_color)
      out_color.cnot(null, ~0, condition);
    else
      qc.phase(180, condition);
  }
}

function DisplayBox(canvas_name)
{
    console.log('canvas ' + canvas_name);
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
        if (this.canvas.width < this.resolution_x * ss_scale)
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

