/**
 * jQuery Capty - A Caption Plugin - http://wbotelhos.com/capty
 * ---------------------------------------------------------------------------------
 *
 * jQuery Capty is a plugin that generates a customizable caption automatically.
 *
 * Licensed under The MIT License
 *
 * @version         0.1.0
 * @since           12.18.2010
 * @author          Washington Botelho dos Santos
 * @documentation   wbotelhos.com/capty
 * @twitter         twitter.com/wbotelhos
 * @license         opensource.org/licenses/mit-license.php MIT
 * @package         jQuery Plugins
 *
 * Usage with default values:
 * ---------------------------------------------------------------------------------
 * $('#capty').capty();
 *
 * <img id="capty" src="image.jpg" alt="Super Mario Bros.&reg;" width="150" height="150"/>
 *
 */

;(function($) {

	$.fn.capty = function(settings) {
		var options = $.extend({}, $.fn.capty.defaults, settings);

		if (this.length == 0) {
			debug('Selector invalid or missing!');
			return;
		} else if (this.length > 1) {
			return this.each(function() {
				$.fn.capty.apply($(this), [settings]);
			});
		}

		var $this		= $(this),
			name		= $this.attr('name'),
			$caption	= $('<div class="' + options.cCaption + '"/>'),
			$elem		= $this;

		if ($this.parent().is('a')) {
			$elem = $this.parent();
		}

		var $image		= $elem.wrap('<div class="' + options.cImage + '"/>').parent(),
			$wrapper	= $image.wrap('<div class="' + options.cWrapper + '"/>').parent();

		$caption.css({
			height:		options.height,
			opacity:	options.opacity,
			position:	'relative'
		})
		.click(function(evt) {
			evt.stopPropagation();
		})
		.appendTo($wrapper);


		if (name) {
			var $content = $(name);

			if ($content.length) {
				$content.appendTo($caption);
			} else {
				$caption.html('<span style="color: #F00;">Content invalid or missing!</span>');
			}
		} else {
			$caption.html($this.attr('alt'));
		}

		if (options.prefix) {
			$caption.prepend(options.prefix);
		}

		if (options.sufix) {
			$caption.append(options.sufix);
		}

		$wrapper
		.css({
			overflow:	'hidden',
			height:		$this.height(),
			width:		$this.width()
		})
		.hover(
			function() {
				$caption.animate({ top: (-1 * options.height) }, { duration: options.speed,  queue: false });
			},
    		function() {
				$caption.animate({ top: 0 }, { duration: options.speed, queue: false });
			}
    	);

		return $this;
	};

	function debug(message) {
		if (window.console && window.console.log) {
			window.console.log(message);
		}
	};

	$.fn.capty.defaults = {
		cCaption:	'capty-caption',
		cImage:		'capty-image',
		cWrapper:	'capty-wrapper',
		height:		30,
		opacity:	.7,
		prefix:		'',
		speed:		200,
		sufix:		''
	};

})(jQuery);