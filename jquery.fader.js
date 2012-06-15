(function($) {
  // Fader
  // A lightweight replacement for jQueryUI fader.
  // It provides no styling or markup, and it only goes
  // horizontally. It is NOT a drop-in replacement.
  //
  // Copyright 2012 Scott Burton, ChaiOne; all right reserved
  // 
  // $(selector).fader([options], [callback])
  // 
  // Options (object):
  // control_selector: A css selector for the slidable
  //                   control element within the fader
  // 
  // Callback (function): function(left, percent){}
  // left:    Position of the control's left edge,
  //          relative to the fader container.
  // percent: Float value of the control's centerpoint
  //          within the fader, from 0.0 to 1.0
  // 
  // Usage:
  // 
  //    <div class='fader'><div class='control'></div></div>
  // 
  //    $(".fader").fader(callback);
  // 
  // where .control is absolutely positioned within .fader, 
  // which is relatively positioned.
  $.fn.fader = function() {

    var options, callbacks;

    if (!this.length) { return this; }
  
    var args = Array.prototype.slice.call(arguments);

    if (typeof(args[0]) === "function") {
      options = {};
      callbacks = args;
    } else {
      options = args.shift();
      callbacks = args;
    }

    var opts = $.extend(true, {}, $.fn.fader.defaults, options);

    var container;
    var control;
    var width;
    var controlWidth;
    var pageX, pageY;
    var screenX, screenY;
    var offset;
    var position;
    var left;
    var fader;
    var callbacks = $.Callbacks();

    for (var i = arguments.length - 1; i >= 0; i--) {
      callbacks.add(arguments[i])
    };

    this.each(function() {
      var $this = $(this);
      $this.mousedown(startDrag);
    });
  
    function startDrag(e) {
      $this = $(this);
      fader = this;
      control = $this.find(opts.control_selector);
      container = $this;
      controlWidth = control.width();
      width = $this.width();
      offset = $this.offset();
      position = $this.position();
      $(window).on("mousemove.fader", handleMouseMove);
      $(window).on("mouseup.fader", stopDrag);
    }

    function stopDrag(e) {
      $(window).off("mousemove.fader", handleMouseMove);
    }

    function handleMouseMove(e) {
      pageX = e.pageX;
      pageY = e.pageY;
      callbacks.fire({
        left: calculatePosition(),
        relative: calculateRelativePosition(),
        width: width, 
        controlWidth: controlWidth,
        pageX: pageX,
        pageY: pageY,
        fader: fader,
        currentTarget: control,
        offset: offset,
        position: position,
        event: e
      });
    }

    function handleLeft(event) {
      control.css("left", event.left);
    }

    function calculatePosition() {
      left = (pageX - offset.left);
      left = Math.min(Math.max(left, 0), width);
      left = left - controlWidth/2;
      return left;
    }

    function calculateRelativePosition() {
      var percent = 0.0;
      percent = left/width;
      return percent;
    }

    function debug(event) {
      console.log(event);
    }

    if (opts.debug) {
      callbacks.add(debug);
    };

    callbacks.add(handleLeft);

    return this;
  };
  
  // default options
  $.fn.fader.defaults = {
    control_selector: ".control",
    debug: false
  };

})(jQuery);
