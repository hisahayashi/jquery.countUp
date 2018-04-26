/**
 * jquery.countUp
 * @author hisayoshi hayashi: HYS INC.
 * @license MIT license
 *
 */

;
(function($) {
  $.fn.countUp = function(options) {
    var start_num = Number($(this).text());
    var d = {
      start: 0,
      last: 100,
      duration: 1000,
      frame: 33,
      update: null,
      complete: null
    };
    var o = $.extend(d, options);
    var $that = $(this);

    o.last = parseInt(o.last);
    o.duration = parseInt(o.duration);
    o.frame = parseInt(o.frame);

    $that.each(function(i) {
      var $t = $(this);
      var total_frame = 0;
      var split = (o.last - o.start) / (o.duration / 33);
      var value = o.start;

      var clear = setInterval(function() {
        value = Math.round(value + split);
        $t.text(value);

        if (typeof o.update == 'function') {
          o.update.call($t, value);
        }

        if (total_frame > o.duration) {
          clearInterval(clear);
          $t.text(o.last);

          if (typeof o.complete == 'function') {
            o.complete.call($t, value);
          }
        }
        total_frame += o.frame;
      }, o.frame);
    });
    return $that;
  };
})(jQuery);
