Fader
=====
A lightweight replacement for jQueryUI fader. It provides no styling or markup, and it only goes horizontally. 

    $(selector).fader([options], [callback])

Options
-------
    control_selector: A css selector for the slidable
                      control element within the fader

Callback 
--------
    function(left, percent){}
    left:    Position of the control's left edge,
             relative to the fader container.
    percent: Float value of the control's centerpoint
             within the fader, from 0.0 to 1.0

Usage
-----

    <div class='fader'><div class='control'></div></div>

    $(".fader").fader(callback);

where .control is absolutely positioned within .fader, which is relatively positioned.

Copyright
---------
Copyright 2012 Scott Burton, ChaiOne; all right reserved
