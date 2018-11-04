$(document)
	.on('click', ".go_up", function() { $('html, body').animate({scrollTop: $('body').offset().top}, 500); })
	.on('click', ".js_copy", function() {
		el_id = $(this).siblings('a').attr('id');
		PersonalPage.CopyToClipboard(el_id); 
	})
	.on('click', ".js_close_error", function() { $('.error_box').hide(); })
	.on('click', ".js_show_more", function() { PersonalPage.show_more(this); })
	.on('click', ".js_button", function() { PersonalPage.scroll(this); })
	.on('click', ".slider_button", function() { PersonalPage.change_slide(this); })

PersonalPage = {
	init : function() {
		$('header .title').animate(
			{opacity: "1"},
			1500,
			function() {
			}
		);

		this.goUp();
		this.create_menu();
		this.portfolio();
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
				if ($('.js_project').css('opacity')) {
					$('.js_project').animate(
						{opacity: "1"},
						1500
					);
				}
			}

			if ($(this).scrollTop() >= 1000) {
				if ($('.js_js').css('opacity')) {
					$('.js_js').animate(
						{opacity: "1"},
						1500
					);
				}
			}

			if ($(this).scrollTop() >= 1350) {
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

	create_menu : function() {

		main_element_width = $('nav').width();

		buttons = [ // Вывод информации в линию
			{
				button_name: 'Обо мне',
				to: 'js_about',
			},
			{
				button_name: 'Мои работы',
				to: 'js_project',
			}, 
			{
				button_name: 'Почему JavaScript',
				to: 'js_js',
			}, 
			{
				button_name: 'Контакты',
				to: 'js_contact',
			}
		];

		one_button_width = (main_element_width / buttons.length) - 2;

		for (i = 0; i < buttons.length; i++) // Создаем информационные блоки
		{
			$('nav').append('<div class="nav_button js_button" style="width: ' + one_button_width + 'px" data-to="' + buttons[i].to + '">' + buttons[i].button_name + '</div>');
		}

		$('.nav_button').animate(
			{opacity: "1"},
			1500,
			function() {
			}
		);
	},

	scroll : function(element) {
		to = $(element).data('to');

		$('html, body').animate({scrollTop: $('.' + to).offset().top}, 500);
	},

	portfolio : function() {

		port = [ // Вывод информации в линию
			{
				pic: 'img/site_1.png',
				info: '<span>Сайт: InSilentHill.ru | Год: 2008</span>',
			},
			{
				pic: 'img/site_2.png',
				info: '<span>Сайт: manuf-74.ru | Год: 2008</span>',
			}, 
			{
				pic: 'img/site_3.png',
				info: '<span>Сайт: nagoroshine.com | Год: 2017 (Битрикс)</span>',
			}, 
			{
				pic: 'img/site_4.png',
				info: '<span>Сайт: shop.ukavt.ru | Год: 2018 (Битрикс)</span>',
			},
			{
				pic: 'img/site_5.png',
				info: '<span>Сайт: афоризмов (в разработке) | Год: 2018</span>',
			}
		];

		for (i = 0; i < port.length; i++) // Создаем информационные блоки
		{
			if (i == 0)
				$('.pic_block').append('<div class="active pic_box"><span class="info_block">' +  port[i].info + '</span><img src="' + port[i].pic + '" ></div>');
			else
				$('.pic_block').append('<div class="pic_box"><span class="info_block">' +  port[i].info + '</span><img src="' + port[i].pic + '""></div>');
		}
	},

	change_slide : function(element) {

		type = $(element).data('type');

		switch (type) {
			case 'right':
				el = $('.pic_block').children('div.active').next();

				if (el.length > 0)
				{
					$('.pic_block').children('div.active').removeClass('active');
					el.addClass('active');
				}
				else
				{
					$('.pic_block').children('div.active').removeClass('active');
					$('.pic_block').children('div:first').addClass('active');
				}
				break;

			case 'left':
				el = $('.pic_block').children('div.active').prev();

				if (el.length > 0)
				{
					$('.pic_block').children('div.active').removeClass('active');
					el.addClass('active');
				}
				else
				{
					$('.pic_block').children('div.active').removeClass('active');
					$('.pic_block').children('div:last').addClass('active');
				}
				break;
		}
	},
};

$(function () {
	setTimeout(function () {
		PersonalPage.init();
		PersonalPage.show_blocks();
	}, 500);
});