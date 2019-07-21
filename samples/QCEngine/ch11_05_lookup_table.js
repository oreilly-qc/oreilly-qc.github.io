// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=11-5

var res_aa_bits      = 2;  // Number of bits in x,y per sub-pixel tile. 2 means tiles are 4x4
var num_counter_bits = 4;  // The effective bit depth of the result.
var res_aa           = 1 << res_aa_bits;   // The x and y size of each subpixel tile.

// Author's note:
// While cleaning up this code sample, I made a discovery
// too late to be included in the book. By reversing the
// order of the bits, the table rows are re-ordered,
// so that the entire QSS table becomes much more interesting.
// Give it a try by changing try_version_2 to true. - ej
var try_version_2  = false;
// The QSS lookup table is still useful as a tool for creating
// new applications, building confidence maps and such, but
// the actual QSS process can be performed without it.

var qss_full_lookup_table = null;
var qss_count_to_hits = [];

// The main function draws the full-size image for reference, then constructs the QSS lookup table,
// and then finally uses QSS to draw the sampled image.
function main()
{
    setup_display_boxes();
    // Create the QSS lookup table
    // This can be done beforehand and saved for use with multiple QSS images
    create_qss_lookup_table();
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
        var pixel_size = 1;
        while (xsize * pixel_size < 300)
            pixel_size++;
        disp.setup(xsize, ysize, pixel_size);
        for (var y = 0; y < ysize; ++y)
            for (var x = 0; x < xsize; ++x)
                disp.pixel(x, y, cw[y][x]);
        disp.label('QSS Probability Table<br/>' +
                    'horiz = '+num_subpixels+' hits<br/>' +
                    'vert = '+(1 << num_counter_bits)+' sample rows');
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
    qcount.QFT();
    if (!try_version_2)
        qcount.reverseBits();

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

function grover_iteration(mask, mask_with_condition)
{
    qc.label('Grover iteration');
    qc.hadamard(mask);
    qc.not(mask);
    qc.cphase(180, mask_with_condition);
    qc.not(mask);
    qc.hadamard(mask);
}


var display_cwtable = null;



function setup_display_boxes()
{
    show_graphics_output(true);
    hide_qss_image_panes();
    display_cwtable = new DisplayBox('display_cwtable');
    display_cwtable.setup(0, 0, 0);
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

    this.label = function(text)
    {
        this.span.innerHTML = text;
    }
}



main();

