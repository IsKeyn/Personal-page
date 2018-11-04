$(document)
	.on('click', ".go_up", function() { $('html, body').animate({scrollTop: $('body').offset().top}, 500); })
	.on('click', ".js_copy", function() {
		el_id = $(this).siblings('a').attr('id');
		PersonalPage.CopyToClipboard(el_id); 
	})
	.on('click', ".js_close_error", function() { $('.error_box').hide(); })
	.on('click', ".js_show_more", function() { PersonalPage.show_more(this); })

PersonalPage = {
	init : function() {
		$('header .title').animate(
			{opacity: "1"},
			1500,
			function() {
			}
		);

		this.goUp();
	},

	goUp : function() {
		$(window).scroll(function() {
			if($(this).scrollTop() != 0)
				$('.go_up').fadeIn();
			else
				$('.go_up').fadeOut();
		});
	},

	show_blocks : function() {
		$(window).scroll(function() {

			if ($(this).scrollTop() >= 300) {
				if ($('.js_about').css('opacity')) {
					$('.js_about').animate(
						{opacity: "1"},
						1500
					);
				}
			}

			if ($(this).scrollTop() >= 650) {
				if ($('.js_js').css('opacity')) {
					$('.js_js').animate(
						{opacity: "1"},
						1500
					);
				}
			}

			if ($(this).scrollTop() >= 1000) {
				if ($('.js_contact').css('opacity')) {
					$('.js_contact').animate(
						{opacity: "1"},
						1500
					);
				}
			}

			//console.log($(this).scrollTop())
		});
	},

	CopyToClipboard : function(containerid) {
		if (document.selection) { 
			var range = document.body.createTextRange();
			range.moveToElementText(document.getElementById(containerid));
			range.select().createTextRange();
			document.execCommand("Copy"); 
		} else if (window.getSelection) {
			var range = document.createRange();
			range.selectNode(document.getElementById(containerid));
			window.getSelection().addRange(range);
			document.execCommand("Copy");

			switch(containerid) {
				case 'tel':
					mail_phrase = 'Телефон'; 
					break;

				case 'email':
					mail_phrase = 'E-mail'; 
					break;

				case 'skype':
					mail_phrase = 'Skype'; 
					break;
			}

			PersonalPage.error(mail_phrase + ' скопирован в буфер обмена!', 5000, '#a15200');
		}
	},

	error : function(error_message, time, color) {
		$('.error_message').html(error_message);

		var error_box = $('.error_box');
		var height = "-"+error_box.outerHeight()+"px";

		if (color == undefined)
			error_box.css("background", "#680000");
		else
			error_box.css("background", color);

		error_box.css("top", height);
		error_box.show();

		error_box.animate(
				{top: "0"}, 
				500
			);

		if (time == undefined)
			time = 5500;

		setTimeout(function () {
			error_box.animate(
				{top: height}, 
				1000, 
				function() {
					$(this).hide();
					$(this).css("top", height);
				});
		}, time);
	},

	show_more : function(element) {
		$(element).hide();
		$(element).siblings('span.more').slideToggle("slow");
	},
};

$(function () {
	setTimeout(function () {
		PersonalPage.init();
		PersonalPage.show_blocks();
	}, 500);
});