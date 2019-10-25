var editor = ace.edit("editor_div");
editor.session.setMode("ace/mode/javascript");
editor.commands.addCommand({
    name: "run",
    bindKey: {win: "Shift-Enter", mac: "Shift-Enter"},
    exec: function(editor) {
        handle_run_button();
    }
});

var editor_div = document.getElementById('editor_div');
var editor_boot_panel = document.getElementById('editor_boot_panel');
var staff_boot_panel = document.getElementById('staff_boot_panel');
var circle_boot_panel = document.getElementById('circle_boot_panel');
var editor_frame_div = document.getElementById('editor_frame_div');
var example_github_span = document.getElementById('example_github_span');
var github_links_footer = document.getElementById('github_links_footer');
var script_output_textarea = document.getElementById('script_output_textarea');
var staff_popin_div = document.getElementById('staff_popin_div');


///////////////////////////////////////////////////////////////
// This is a small workaround for the issue where the editor
// doesn't get informed about size changes
var last_editor_div_width = 0;
var last_editor_div_height = 0;
var last_circle_div_width = 0;
var last_circle_div_height = 0;
var check_serial = 0;
function check_for_editor_resize()
{
    // Editor
    var w = editor_boot_panel.offsetWidth;
    var h = editor_boot_panel.offsetHeight;
    if (w != last_editor_div_width || h != last_editor_div_height)
    {
        editor_div.style.height = "" + (h - 10) + "px";
        editor.resize();
        last_editor_div_width = w;
        last_editor_div_height = h;
    }

    // Circle chart
    var w = circle_boot_panel.offsetWidth;
    var h = circle_boot_panel.offsetHeight;
    if (w != last_circle_div_width || h != last_circle_div_height)
    {
        qc_options.circle_div.width = w;
        qc_options.circle_div.height = h;
        qc.panel_chart.draw();
        last_circle_div_width = w;
        last_circle_div_height = h;
    }

    var seconds_per_check_for_editor_resize = 0.5;
    window.setTimeout(check_for_editor_resize,
                      1000 * seconds_per_check_for_editor_resize);
}

function click_circle_fill(up_down)
{
    var e = {ctrlKey:false, shiftKey:true, deltaY:-up_down};

    list = qc.panel_chart.widgets;
    for (var i = 0; i < list.length; ++i)
    {
      var widget = list[i];
      // Boost the reaction a bit
      if (up_down > 0)
        list[i].magScale *= 1.5;
      else
        list[i].magScale *= 1.0/1.5;
      list[i].mouseWheel(e);
    }
}

function click_circle_style(style)
{
  if (style == 0)
  {
    qc_options.color_by_phase = false;
    qc_options.book_render = false;
  }
  else if (style == 1)
  {
    qc_options.color_by_phase = false;
    qc_options.book_render = true;
  }
  else if (style == 2)
  {
    qc_options.color_by_phase = true;
    qc_options.book_render = false;
  }
  else if (style == 3)
  {
    qc_options.color_by_phase = true;
    qc_options.book_render = true;
  }
  qc.panel_chart.draw();
}

function click_editor_zoom(up_down)
{
  var editor_fontsize = parseInt(editor.getOption('fontSize'));
  if (up_down == 0)
    editor_fontsize = 12;
  else
    editor_fontsize += up_down;
  if (editor_fontsize < 4)
    editor_fontsize = 4;
  editor.setOptions({fontSize: '' + editor_fontsize + 'pt'});
}

function click_gate_zoom(up_down)
{
  var old_scale = qc.get_param('draw_scale', 1.0);
  var new_scale = 1.0;
  if (up_down == 1)
    new_scale = old_scale * 1.1;
  if (up_down == -1)
    new_scale = old_scale / 1.1;
  qc.set_param('draw_scale', new_scale);
  qc.draw();
}

function click_circle_zoom(up_down)
{
  var e = {ctrlKey:true, shiftKey:false, deltaY:-up_down};

  list = qc.panel_chart.widgets;
  for (var i = 0; i < list.length; ++i)
  {
    var widget = list[i];
    list[i].mouseWheel(e);
  }
}

function click_output_zoom(up_down)
{
  var fontsize = parseInt(script_output_textarea.style.fontSize);
  if (up_down == 0)
    fontsize = 12;
  else
    fontsize += up_down;
  if (fontsize < 4)
    fontsize = 4;
  script_output_textarea.style.fontSize = '' + fontsize + 'pt';
}









function load_json_from_url(file_url)
{
    fetch(file_url, {cache: 'reload'})
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return false;
          }

          response.json().then(function(data) {
            console.log(data);
          });
          return true;
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
        return false;
      });
}

function load_code_from_url(file_url)
{
    var use_fetch = false; // fetch is not supported on Kindles
    if (use_fetch)
    {
        fetch(file_url, {cache: 'reload'})
          .then(
            function(response) {
              if (response.status !== 200) {
                console.log('Error loading ' + file_url + '. Status Code: ' + response.status);
                return false;
              }
              response.text().then(function(data) {
                editor.focus();
                editor.setValue(data);
                editor.gotoLine(0);
              });
              return true;
            }
          )
          .catch(function(err) {
            console.log('Fetch Error :-S', err);
            return false;
          });
    }
    else
    {
        var http_request = new XMLHttpRequest();
        http_request.open('GET', file_url, true);

        // If specified, responseType must be empty string or "text"
        http_request.responseType = 'text';

        http_request.onload = function ()
        {
            if (http_request.readyState === http_request.DONE)
            {
                if (http_request.status === 200)
                {
                    // console.log(http_request.response);
                    // console.log(http_request.responseText);
                    editor.focus();
                    editor.setValue(http_request.responseText);
                    editor.gotoLine(0);
                    make_github_source_links();
                    make_engine_menu();
                }
                else
                {
                  do_failed_load_sample(file_url);
                }
            }
        };
        http_request.onerror = function ()
        {
          do_failed_load_sample(file_url);
        };
        try {
          http_request.send(null);
        }
        catch (error) {
          do_failed_load_sample(file_url);
        }
        return true;
    }
    make_github_source_links();
    make_engine_menu();
}

function do_failed_load_sample(file_url)
{
  var code_str = '// The sample ' + file_url + '\n// could not be loaded.\n//\n';
  code_str += '// (basic teleportation sample follows)\n\n';
  code_str += default_program;
  editor.focus();
  editor.setValue(code_str);
  editor.gotoLine(0);
  make_github_source_links();
  make_engine_menu();
}

qc_options.staff_canvas = document.getElementById('draw_gate_canvas');
qc_options.staff_div = document.getElementById('staff_popin_div');
qc_options.circle_canvas = document.getElementById('circle_canvas');
qc_options.circle_div = document.getElementById('circle_div');
var valid_engine_list = [];
//qc_options.draw_scale = 3.0;
var qc = QPU();
qc.set_param('draw_scale', 1.0);
// qc.set_canvas(document.getElementById('draw_gate_canvas'));
// panel_staff = qc.panel_staff;
// panel_chart = qc.panel_chart;

var current_sample = null;
var current_engine = engine_list[0];
var all_sample_contents = {};
function fetch_one_sample_dir(engine)
{
    var base_url = 'https://api.github.com/repos/oreilly-qc/oreilly-qc.github.io/contents/samples/';
    var http_request = new XMLHttpRequest();
    http_request.open('GET', base_url + engine.name, true);

    // If specified, responseType must be empty string or "text"
    http_request.responseType = 'text';

    http_request.onload = function ()
    {
        if (http_request.readyState === http_request.DONE)
        {
            if (http_request.status === 200)
            {
                if (http_request.responseText)
                {
                    engine.dir_list = http_request.responseText;
                    make_github_source_links();
                    make_engine_menu();
                }
            }
            else
            {
                engine.dir_list = '';
            }
        }
    };
    http_request.send(null);
}

function fetch_sample_contents()
{
    for (var i = 0; i < engine_list.length; ++i)
        fetch_one_sample_dir(engine_list[i]);
}

function make_sample_menu()
{
    // Populate the sample-code dropdown
    var str = '';
    str += '<button id="sample_menu_button" type="button" class="btn btn-outline-dark dropdown-toggle" data-toggle="dropdown">';
    str += '    Choose a sample';
    str += '</button>';
    str += '<div id="example_choice_dropdown" class="dropdown-menu" aria-labelledby="sample_menu_button">';
    for (i = 0; i < sample_menu.length; ++i)
    {
        sample = sample_menu[i];
        str += '<a class="dropdown-item" href="#" onclick="choose_sample_menu(sample_menu['+i+'], null);">';
        str += sample.menu_title;
        str += '</a>';
    }
    str += '</ul>'
    str += '</div>'
    document.getElementById('example_choice_span').innerHTML = str;
    // Note: Using jquery $('#example_choice_dropdown').append(str) to build the menu
    //       breakds the Kindle version
    try_to_get_program_from_passed_in_url();
}

function set_current_engine(engine)
{
    if (engine == null)
        engine = engine_list[0];
    current_engine = engine;
    if (current_engine.name == 'QCEngine')
    {
        editor.session.setMode("ace/mode/javascript");
    }
    else if (current_engine.name == 'Qiskit')
    {
        editor.session.setMode("ace/mode/python");
    }
    else if (current_engine.name == 'Cirq')
    {
        editor.session.setMode("ace/mode/python");
    }
    else if (current_engine.name == 'DWave')
    {
        editor.session.setMode("ace/mode/python");
    }
    else if (current_engine.name == 'OpenQASM')
    {
        editor.session.setMode("ace/mode/plain_text");
    }
    else if (current_engine.name == 'QSharp')
    {
        editor.session.setMode("ace/mode/csharp");
    }
}

function choose_sample_menu(sample, engine)
{
    show_graphics_output(false);
    do_sample_special_cases(sample.shortcut);
    console.log('Sample menu chosen: ' + sample.sample_file);
    if (engine == null)
    engine = engine_list[0];
    set_current_engine(engine);
    var sample_menu_button = document.getElementById('sample_menu_button');
    m_title = sample.menu_title
    if(m_title.length > 20) {
        m_title = m_title.substring(0,19)+"...";
    }
    sample_menu_button.innerHTML = m_title;
    load_code_sample(sample.sample_file, engine);
    var engine_menu_button = document.getElementById('engine_menu_button');
    if (engine_menu_button)
      engine_menu_button.innerHTML = engine.name;
    clear_output();
}

function choose_engine_menu(engine)
{
  console.log('Engine menu chosen: ' + engine.name);
  var engine_menu_button = document.getElementById('engine_menu_button');
  engine_menu_button.innerHTML = engine.name;
  set_current_engine(engine);
  load_code_sample(current_sample.sample_file, engine);
  clear_output();
}

function make_engine_menu()
{
    str = '';
    str += '<button id="engine_menu_button" type="button" class="btn btn-outline-dark dropdown-toggle" data-toggle="dropdown">';
    str += current_engine.link_name;
    str += '</button>';
    str += '<div id="engine_choice_dropdown" class="dropdown-menu" aria-labelledby="engine_menu_button">';
    for (i = 0; i < valid_engine_list.length; ++i)
    {
        var engine_index = valid_engine_list[i];
        engine = engine_list[engine_index];
        str += '<a href="#" class="dropdown-item" onclick="choose_engine_menu(engine_list['+engine_index+']);">';
        str += engine.link_name;
        str += '</a>';
    }
    str += '</div>';
    // Note: Using jquery $('#engine_choice_dropdown').append(str) to build the menu
    //       breakds the Kindle version
    document.getElementById('engine_choice_span').innerHTML = str;
}

function do_engine_modal(engine_name)
{
    var options = null;
    var val = $('#'+engine_name+'_runModal').modal(options);
}

function do_addengine_modal()
{
    var options = null;
    var val = $('#AddEngine_runModal').modal(options);
}

function do_aboutqce_modal()
{
    var options = null;
    var val = $('#AboutQCE_runModal').modal(options);
}

function do_contact_modal()
{
    var options = null;
    var val = $('#Contact_runModal').modal(options);
}

function do_cheatsheet_modal()
{
    // var options = null;
    // var val = $('#CheatSheet_runModal').modal(options);
    window.open('./docs/build/index.html', '_blank');
}

function make_github_source_links()
{
    var sample = current_sample;
    if (sample == null)
        return;
    valid_engine_list = [0];
    // str = '<br/>';
    // str += 'View source in Github: ';
    str = 'Source code on Github <div class="btn-group btn-group-sm float-right" role="group" aria-label="Other simulators">'
    for (i = 0; i < engine_list.length; ++i)
    {
        engine = engine_list[i];
        // if (i > 0)
        //     str += ' / ';
        var sample_ok = false;
        if (engine && engine.dir_list)
            sample_ok = engine.dir_list.includes(sample.sample_file);
        if (sample_ok)
        {
            var link = 'https://github.com/oreilly-qc/oreilly-qc.github.io/blob/master/samples/' + engine.name;
            link +=  '/' + sample.sample_file + engine.suffix;
            str += '<a href="'+link+'" class="btn btn-secondary">'+engine.link_name+'</a>';
            if (i > 0)
              valid_engine_list.push(i);
        }
        else
        {
            var link = 'https://github.com/oreilly-qc/oreilly-qc.github.io/tree/master/samples/' + engine.name;
            str += '<a href="'+link+'" class="btn btn-secondary disabled">'+engine.link_name+'</a>';
            // str += '<span style="color:#aaa" title="This version is not implemented yet, but if you\'d like to add it, please contact us at octopus@qcengine.com">';
            // str += '<b><a href="'+link+'" target="_blank">'+engine.link_name+'</a></b></span>';
       }
    }

    str += '</div>'
    github_links_footer.innerHTML = str;

    str = '';
    //
    // If there's a chapter notebook, link to that.
    if (current_engine.name == 'Qiskit')
    {
        var wb_text = null;
        var wb_name = null;
        var wb_link = null;
        if (sample.shortcut.startsWith('2-'))
        {
            wb_text = 'Download the complete Chapter2 ';
            wb_name = 'Qiskit Notebook';
            wb_link = current_engine.subdir + '/Chapter2-samples.ipynb';
        }
        else if (sample.shortcut.startsWith('3-'))
        {
            wb_text = 'Download the complete Chapter3 ';
            wb_name = 'Qiskit Notebook';
            wb_link = current_engine.subdir + '/Chapter3-samples.ipynb';
        }
        else if (sample.shortcut.startsWith('4-'))
        {
            wb_text = 'Download the complete Chapter4 ';
            wb_name = 'Qiskit Notebook';
            wb_link = current_engine.subdir + '/Chapter4-samples.ipynb';
        }
        else if (sample.shortcut.startsWith('5-'))
        {
            wb_text = 'Download the complete Chapter5 ';
            wb_name = 'Qiskit Notebook';
            wb_link = current_engine.subdir + '/Chapter5-samples.ipynb';
        }
        else if (sample.shortcut.startsWith('6-'))
        {
            wb_text = 'Download the complete Chapter6 ';
            wb_name = 'Qiskit Notebook';
            wb_link = current_engine.subdir + '/Chapter6-samples.ipynb';
        }
        else if (sample.shortcut.startsWith('7-'))
        {
            wb_text = 'Download the complete Chapter7 ';
            wb_name = 'Qiskit Notebook';
            wb_link = current_engine.subdir + '/Chapter7-samples.ipynb';
        }
        if (wb_text)
        {
//            str += '<br/>';
            str += wb_text;
            str += '<b>';
            str += '<a href="'+wb_link+'" download>'+wb_name+'</a>';
            str += '</b>';
        }
    }
    else if (current_engine.name == 'QSharp')
    {
        var notebook_link = 'Run the Q# notebooks online <b><a href="https://mybinder.org/v2/gh/oreilly-qc/oreilly-qc.github.io/master" target="_blank">here</a></b>';
        if (sample.shortcut.startsWith('2-'))
            notebook_link = 'Run the Q# Chapter 2 notebook online <b><a href="https://mybinder.org/v2/gh/oreilly-qc/oreilly-qc.github.io/master?filepath=Chapter2-samples.ipynb" target="_blank">here</a></b>';
        else if (sample.shortcut.startsWith('3-'))
            notebook_link = 'Run the Q# Chapter 3 notebook online <b><a href="https://mybinder.org/v2/gh/oreilly-qc/oreilly-qc.github.io/master?filepath=Chapter3-samples.ipynb" target="_blank">here</a></b>';
        else if (sample.shortcut.startsWith('5-'))
            notebook_link = 'Run the Q# Chapter 5 notebook online <b><a href="https://mybinder.org/v2/gh/oreilly-qc/oreilly-qc.github.io/master?filepath=Chapter5-samples.ipynb" target="_blank">here</a></b>';
        else if (sample.shortcut.startsWith('6-'))
            notebook_link = 'Run the Q# Chapter 6 notebook online <b><a href="https://mybinder.org/v2/gh/oreilly-qc/oreilly-qc.github.io/master?filepath=Chapter6-samples.ipynb" target="_blank">here</a></b>';

        str += notebook_link;
        str += ', or download <b><a href="https://github.com/oreilly-qc/oreilly-qc.github.io/tree/master/samples/QSharp" target="_blank">here</a></b> to run locally.';
    }

    // str += '<span style="font-size:8pt; color:#77a">';
    // str += '<br/>Developers: Add your engine, or add a sample! <b><a href="#" onclick="do_addengine_modal();">Click here</a></b> for more info.';
    // str += '</span>';

    example_github_span.innerHTML = str;
}

// get_url_param() is adapted from JeffreyCrofte's work here: https://www.creativejuiz.fr/blog/en/javascript-en/read-url-get-parameters-with-javascript
function get_url_param(param)
{
  var vars = {};
  window.location.href.replace( location.hash, '' ).replace( 
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function( m, key, value ) { // callback
      vars[key] = value !== undefined ? value : '';
    }
  );
  if (param) {
    result = vars[param]
    if (!result)
      return null;
    // Strip stray # symbols
    result = result.replace('#','');
    return result;
  }
  return vars;
}

function get_sample_from_string(sample_str)
{
    for (var i = 0; i < sample_menu.length; ++i)
    {
        var sample = sample_menu[i];
        if (sample_str == sample.sample_file || sample_str == sample.shortcut)
            return sample;
    }
    return sample_menu[0];
}

function get_engine_from_string(engine_str)
{
    if (engine_str == null)
      engine_str = 'qcengine';
    for (var i = 0; i < engine_list.length; ++i)
    {
        var engine = engine_list[i];
        if (engine_str.toLowerCase() == engine.name.toLowerCase())
            return engine;
    }
    return engine_list[0];
}

function try_to_get_program_from_passed_in_url()
{
    var sample_str = get_url_param('p');
    var engine_str = get_url_param('e');

    var sample = get_sample_from_string(sample_str);
    var engine = get_engine_from_string(engine_str);

    // Special case: sample 4-1 in the book needs to appear in
    //               QASM by default.
    if (sample_str == '4-1' && engine_str == null)
      engine = get_engine_from_string('OpenQASM');
    do_sample_special_cases(sample_str);

    choose_sample_menu(sample, engine);
}

function do_sample_special_cases(sample_str)
{
    // Sample special cases
    var sample_info_span = document.getElementById("sample_info_span");
    sample_info_span.style.display = 'none';

    if (sample_str == '4-2')
    {
        // Takes a while to eat a chocodile
        var sstr = '<i class="fas fa-exclamation-triangle" style="color:red;"></i> This sample takes a while to run.</b>';
        sample_info_span.innerHTML = sstr;
        sample_info_span.style.display = 'block';
    }
    else if (sample_str == '11-4' || sample_str == '11-5' || sample_str == '11-6')
    {
        // Takes a while to eat a chocodile
        var sstr = '<img src="images/caution.png" height="28" /><b>This sample takes a while to run.</b>';
        sstr += '<br/>For a video demo of quantum supersampling, <a href="https://vimeo.com/180284417" target="_blank">click here</a>.';
        console.log(sstr);
        sample_info_span.innerHTML = sstr;
        sample_info_span.style.display = 'block';
    }
}

function show_sim_disabled(do_reset)
{
    // Sample special cases
    var span = document.getElementById("disable_info_span");
    span.style.display = 'none';

    var disabled = qc.qReg.disableSimulation;
    if (disabled && !do_reset)
    {
        var num_qubits = qc.qReg.numQubits;
        var size_gb = (Math.pow(2, num_qubits + 3) / (1024 * 1024 * 1024)).toFixed(1);
        var sstr = '<img src="images/caution.png" height="28" />';
        sstr += '<b>The sim is disabled.</b> ('+num_qubits+' qubits would require '+size_gb+' GB of memory.)';
        span.innerHTML = sstr;
        span.style.display = 'block';
    }
}

function show_graphics_output(do_show)
{
    var div = document.getElementById("image_output_div");
    if (do_show)
        div.style.display = 'block';
    else
        div.style.display = 'none';
    document.getElementById('images_table').style.display = 'block';
}

function hide_qss_image_panes()
{
    document.getElementById('images_table').style.display = 'none';
}

function load_code_sample(sample_str, engine)
{
    var sample = get_sample_from_string(sample_str);
    if (sample == null)
        return false;
    current_sample = sample;

    var qce = engine_list[0];
    if (engine != null)
      qce = engine;
    var raw_qce_code_url = qce.subdir + sample.sample_file + qce.suffix;

    var github_links_str = '';

    ok = load_code_from_url(raw_qce_code_url);
    if (!ok)
    {
        var code_str = '// sample ' + raw_qce_code_url + ' could not be loaded.\n';
        editor.focus();
        editor.setValue(code_str);
        editor.gotoLine(0);
    }
    return ok;
}

// function test_cc(canvas, color)
// {
//     canvas.width = 200;
//     canvas.height = 200;

//     console.log(canvas);
//     var ctx = canvas.getContext('2d');
//     ctx.save();
//     {
//         ctx.fillStyle = color;
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//     }
//     ctx.restore();
// }

function show_bug(enable, err)
{
    var span = document.getElementById('bug_span');
    var sstr = '';
    if (enable)
    {
        sstr += '<br/>';
        sstr += '<span style="color:darkred;">';
        sstr += '<img src="images/icon_bug.png" height="20" /> '
        sstr += '<b>Error:</b> ' + err.message;
        sstr += '</span>';
    }
    span.innerHTML = sstr;
}

function show_info(message)
{
    var span = document.getElementById('info_span');
    var sstr = '';
    if (message)
    {
        sstr += '<br/>';
        sstr += message;
    }
    span.innerHTML = sstr;
}

function run_script()
{
    qc_options.color_by_phase = false;
    qc_options.circle_scale = 0.5;
    qc.start();
    if (qc) {
//      qc.disableAnimation();
//      qc.enableRecording();
      qc.codeLabel('');
    }
    show_graphics_output(false);

    qc.enableRecording();
    qc.enableAnimation();

    show_sim_disabled('reset');
    show_state_vector();
    try {
      show_bug(false);
      runQCScriptInTextArea('editor', 'script_output_textarea');
    }
    catch (err) {
      show_bug(true, err);
    }
    show_sim_disabled();
    qc.qReg.changed();
    show_state_vector();
    qc.panel_staff.draw();
    qc.panel_chart.draw();

    qc.enableAnimation();
}

function clear_output(show_default_message)
{
  if (show_default_message == null)
    show_default_message = true;
  if (show_default_message)
    script_output_textarea.value = '(output prints here)\n';
  else
    script_output_textarea.value = '';
}

function rewind_to_beginning()
{
  // if (current_language != 'javascript')
  //   return;
  console.log('instructions: ' + qc.qReg.staff.insertionStart);
  qc.qReg.staff.rewind_insertion_to_start();
}

function show_state_vector()
{
  list = qc.panel_chart.widgets;
  for (var i = 0; i < list.length; ++i)
  {
    if (list[i].stateVector)
    {
      // console.log(list[i]);
      list[i].collapsed = false;
      list[i].barHeight = 0;
    }
    else if (list[i].blochSphere ||
             list[i].densityMatrix || 
             list[i].graphState || 
             list[i].stabilizerState ||
             list[i].drawQInt)
    {
        list[i].in_use = false;
    }
  }
}

function set_progress(percent, message)
{
    var progress_panel = document.getElementById('progress_panel');
    var progress_bar = document.getElementById('progress_bar');
    progress_panel.style.display = 'block';
    // console.log(progress_bar);
//    progress_bar['aria-valuenow'] = percent;
    percent = Math.round(percent);
    progress_bar.style.width = ''+percent+'%';
    progress_bar.setAttribute('aria-valuenow', percent);
    if (message)
        progress_bar.innerHTML = ''+percent+'%'+' ('+message+')';
    else
        progress_bar.innerHTML = ''+percent+'%';
}

function handle_run_button()
{
    if (current_engine.name != 'QCEngine')
    {
        do_engine_modal(current_engine.name);
        return;
    }
    // set_progress(50, '');
    run_script();
    qc.panel_staff.setVisible(true);
    qc.panel_chart.setVisible(true);
    max_width = 20000;
    qc.panel_staff.staff.fullSnapshot(max_width);
}

var default_program = 'qc.reset(3);\nqc.write(0);\nqc.had(0x1);\nqc.cnot(0x2, 0x1);\n';


window.onload = function() {
    check_for_editor_resize();
    fetch_sample_contents();
    make_sample_menu();
};


