import $ from 'jquery'
import gsap from 'gsap'
import { Swiper, Pagination, Navigation, Autoplay } from 'swiper'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

window.jQuery = $
window.$ = $

Swiper.use([Navigation, Pagination, Autoplay])

//import vendor plugin example (not module)
require('~/app/libs/owl-carousel/owl.carousel.min.js')
require('~/app/libs/webticker/jquery.webticker.min.js')
require('~/app/libs/fancybox/jquery.fancybox.min.js')

document.addEventListener('DOMContentLoaded', () => {
	gsap.registerPlugin(ScrollTrigger)
	gsap.config({ nullTargetWarn: false })

	// Анимация блоков на главной странице
	function navigation() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.content-nav',
			},
		})
		tl.from('.content-nav .content-nav__item', {
			y: 100,
			opacity: 0,
			duration: 0.5,
		})

		const secMenuTitle = gsap.timeline({
			scrollTrigger: {
				trigger: '.sec-menu__title',
			},
		})
		const secMenuTitleL = gsap.timeline({
			scrollTrigger: {
				trigger: '.sec-menu__title-left',
			},
		})
		const secMenuTitleR = gsap.timeline({
			scrollTrigger: {
				trigger: '.sec-menu__title-right',
			},
		})
		secMenuTitle.from('.sec-menu__title', { y: 100, opacity: 0, duration: 0.5 })
		secMenuTitleL.from('.sec-menu__title-left', {
			x: -100,
			opacity: 0,
			duration: 0.5,
		})
		secMenuTitleR.from('.sec-menu__title-right', {
			x: 100,
			opacity: 0,
			duration: 0.5,
		})

		const infographic = gsap.timeline({
			scrollTrigger: {
				trigger: '.infographic',
			},
		})
		infographic.from('.infographic__item', {
			y: 100,
			opacity: 0,
			duration: 0.5,
		})
	}
	navigation()

	function popupCallCenter() {
		setTimeout(() => {
			document.querySelector('.popup-call').classList.remove('show')
		}, 20000);
	}
	
	popupCallCenter()
	

	const swiperAbout = new Swiper('.swiper-about', {
		loop: false,
		preloadImages: false,
		lazy: true,

		pagination: {
			el: '.swiper-pagination',
		},

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	})

	const swiperOffer = new Swiper('.swiper-offer', {
		loop: false,
		preloadImages: false,
		lazy: true,
		autoHeight: true,
		autoplay: {
			delay: 5000,
		},

		pagination: {
			el: '.swiper-pagination',
		},

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	})

	// Новая шапка --start
	function accardions() {
		const $accardions = document.querySelectorAll('.burger-content-menu__item')
		$accardions.forEach((item) => {
			item.addEventListener('click', function () {
				if (this.classList.contains('active')) {
					this.classList.remove('active')
				} else {
					$accardions.forEach((link) => {
						link.classList.remove('active')
					})
					this.classList.add('active')
				}
			})
		})
	}

	function burgerButton() {
		const $burgerBtn = document.querySelector('.header-top__burger-menu')
		const $burgerContent = document.querySelector('.burger-content')
		$burgerBtn.addEventListener('click', function () {
			if (this.classList.contains('active')) {
				this.classList.remove('active')
				$burgerContent.classList.remove('active')
				// document.body.style.overflow = ''
			} else {
				this.classList.add('active')
				$burgerContent.classList.add('active')
				// document.body.style.overflow = 'hidden'
			}
		})
	}

	function searchButton() {
		const $searchBtn = document.querySelector('.search')
		const $searchMobileBtn = document.querySelector(
			'.header-top__nav-item--search'
		)
		$searchBtn.addEventListener('click', function () {
			$('.search-box').toggleClass('show')
			$(this).toggleClass('search--close')
			$('.search-form__input').focus()
		})
		$searchMobileBtn.addEventListener('click', function () {
			$('.search-box').toggleClass('show')
			$('.search-form__input').focus()
		})
	}

	accardions()
	burgerButton()
	searchButton()
	// Новая шапка --end

	$('img').parent().addClass('img-link')

	$('.header__burger').click(function () {
		$('.menu').toggleClass('active')
		$('.header__burger').toggleClass('active')
		$('body').toggleClass('lock')
	})

	$('.sidebar-button').click(function () {
		$('.sidebar').toggleClass('sidebar--is-active')
		$('.sidebar-button').toggleClass('sidebar-button--close')
	})

	$('.header__video').click(function () {
		$('.video').addClass('video--is-active')
	})
	$('.video__close').click(function () {
		$('.video').removeClass('video--is-active')
	})
	$('.video__close--md').click(function () {
		$('.video').removeClass('video--is-active')
	})

	$('div.dep-tabs').on('click', 'div:not(.active)', function () {
		$(this)
			.addClass('active')
			.siblings()
			.removeClass('active')
			.closest('.slider-dep__content-sync__item')
			.find('.dep-tabs__block')
			.removeClass('active')
			.eq($(this).index())
			.addClass('active')
	})

	$('.header-nav__item_search').click(function () {
		$('.modal-search_wrapper').toggleClass('modal-search_wrapper--active')
		$('.modal-search').toggleClass('modal-search_wrapper--active')
	})

	$('.modal-search_close, .modal-search').click(function () {
		$('.modal-search_wrapper').removeClass('modal-search_wrapper--active')
		$('.modal-search').removeClass('modal-search_wrapper--active')
	})

	$('.sidebar__list>p>a').click(function () {
		$('html, body').animate(
			{
				scrollTop: $($(this).attr('href')).offset().top + 'px',
			},
			{
				duration: 600,
				easing: 'swing',
			}
		)
		return false
	})

	$(function () {
		$('#webTicker').webTicker({
			duplicate: true,
			startEmpty: false,
		})
	})

	function accardionMain() {
		var Accordion = function (el, multiple) {
			this.el = el || {}
			this.multiple = multiple || false

			// Variables privadas
			var links = this.el.find('.link')
			// Evento
			links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown)
		}

		Accordion.prototype.dropdown = function (e) {
			var $el = e.data.el
			let $this
			let $next
			;($this = $(this)), ($next = $this.next())

			$next.slideToggle()
			$this.parent().toggleClass('open')

			if (!e.data.multiple) {
				$el.find('.submenu').not($next).slideUp().parent().removeClass('open')
			}
		}

		var accordion = new Accordion($('#accordion'), false)
	}

	accardionMain()

	$('.header-news__item').owlCarousel({
		animateOut: 'fadeOut',
		loop: false,
		margin: 25,
		items: 3,
		nav: false,
		dots: false,
		smartSpeed: 450,
		navText: [
			"<img src='/templates/ksu/img/left.png' alt='left'>",
			"<img src='/templates/ksu/img/right.png' alt='right'>",
		],
		responsive: {
			// breakpoint from 0 up
			0: {
				items: 1,
				dots: false,
				nav: false,
			},
			412: {
				items: 1,
				dots: false,
				nav: false,
			},
			// breakpoint from 480 up
			615: {
				items: 2,
				dots: false,
				nav: false,
			},
			// breakpoint from 768 up
			768: {
				items: 3,
				dots: false,
				nav: false,
			},
			991: {
				items: 3,
			},
			1200: {
				items: 3,
			},
		},
	})

	$('.certificate').owlCarousel({
		animateOut: 'fadeOut',
		loop: false,
		margin: 15,
		items: 4,
		nav: true,
		dots: true,
		smartSpeed: 450,
		navText: [
			"<img src='/templates/ksu/img/left.png' alt='left'>",
			"<img src='/templates/ksu/img/right.png' alt='right'>",
		],
		responsive: {
			// breakpoint from 0 up
			0: {
				items: 1,
				dots: false,
				nav: false,
			},
			// breakpoint from 480 up
			615: {
				items: 2,
			},
			// breakpoint from 768 up
			768: {
				items: 3,
			},
			991: {
				items: 4,
			},
			1200: {
				items: 4,
			},
		},
	})

	$('.basic-research-slider').owlCarousel({
		animateOut: 'fadeOut',
		loop: false,
		margin: 0,
		items: 4,
		nav: true,
		dots: true,
		smartSpeed: 450,
		navText: [
			"<img src='/templates/ksu/img/icons/slider/arrow-sprite.svg' alt='left'>",
			"<img src='/templates/ksu/img/icons/slider/arrow-sprite.svg' alt='right'>",
		],
		responsive: {
			// breakpoint from 0 up
			0: {
				items: 1,
				dots: true,
				nav: false,
			},
			// breakpoint from 480 up
			615: {
				items: 1,
				nav: true,
			},
			// breakpoint from 768 up
			768: {
				nav: true,
				items: 2,
			},
			991: {
				nav: true,
				items: 3,
			},
			1200: {
				nav: true,
				items: 4,
			},
		},
	})

	$('.target-functions__item').owlCarousel({
		animateOut: 'fadeOut',
		loop: false,
		margin: 0,
		items: 1,
		nav: true,
		dots: true,
		smartSpeed: 450,
		navText: [
			"<img src='/templates/ksu/img/icons/slider/arrow-sprite.svg' alt='left'>",
			"<img src='/templates/ksu/img/icons/slider/arrow-sprite.svg' alt='right'>",
		],
		responsive: {
			// breakpoint from 0 up
			0: {
				dots: false,
				nav: false,
			},
			// breakpoint from 480 up
			615: {
				nav: true,
			},
			// breakpoint from 768 up
			768: {
				nav: true,
			},
			991: {
				nav: true,
			},
			1200: {
				nav: true,
			},
		},
	})

	$('.slider-dep').owlCarousel({
		animateOut: 'fadeOut',
		loop: false,
		margin: 30,
		items: 5,
		nav: true,
		dots: true,
		center: true,
		smartSpeed: 450,
		navText: [
			"<img src='/templates/ksu/img/icons/slider/arrow-sprite.svg' alt='left'>",
			"<img src='/templates/ksu/img/icons/slider/arrow-sprite.svg' alt='right'>",
		],
		responsive: {
			// breakpoint from 0 up
			0: {
				dots: false,
				nav: false,
			},
			// breakpoint from 480 up
			615: {
				nav: true,
			},
			// breakpoint from 768 up
			768: {
				nav: true,
			},
			991: {
				nav: true,
			},
			1200: {
				nav: true,
			},
		},
	})

	//Слайдер в шапке
	$('.content__title').owlCarousel({
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		autoplay: true,
		autoplayTimeout: 8000,
		autoplayHoverPause: true,
		loop: true,
		margin: 0,
		items: 1,
		nav: false,
		dots: true,
		smartSpeed: 700,
	})

	//Актредитация
	$('[data-fancybox="certificate"]').fancybox({
		buttons: ['close'],
		modal: false,
		idleTime: 3,
		animationEffect: 'zoom-in-out',
		animationDuration: 500,
		arrows: false,
		transitionDuration: 300,
	})

	$('[data-fancybox="history"]').fancybox({
		buttons: ['close'],
		modal: false,
		idleTime: 3,
		animationEffect: 'zoom-in-out',
		animationDuration: 500,
		arrows: false,
		transitionDuration: 300,
	})

	function infographics() {
		var target_block = $('.infographic') // Ищем блок

		if (target_block.length === 0) {
			return
		}

		// запоминаем начальные значения
		var textt1 = $('.count1').text()
		var textt2 = $('.count2').text()
		var textt3 = $('.count3').text()
		var textt4 = $('.count4').text()

		var blockStatus = true

		$(window).scroll(function () {
			var targetTop = target_block.offset().top
			var targetBottom = targetTop + target_block.outerHeight()
			var screenTop = $(window).scrollTop()
			var screenBottom = screenTop + $(window).innerHeight()

			var onScreen = false
			if (screenBottom > targetTop && screenTop < targetBottom) {
				onScreen = true
			}

			if (onScreen && blockStatus) {
				blockStatus = false // Запрещаем повторное выполнение функции до следующей перезагрузки страницы.

				$({ numberValue: 0 }).animate(
					{ numberValue: textt1 },
					{
						duration: 900, // Продолжительность анимации, где 500 - 0.5 одной секунды, то есть 500 миллисекунд
						easing: 'linear',
						step: function (val) {
							$('.count1').html(Math.ceil(val)) // Блок, где необходимо сделать анимацию
						},
					}
				)

				$({ numberValue: 0 }).animate(
					{ numberValue: textt2 },
					{
						duration: 900, // Продолжительность анимации, где 500 - 0.5 одной секунды, то есть 500 миллисекунд
						easing: 'linear',
						step: function (val) {
							$('.count2').html(Math.ceil(val)) // Блок, где необходимо сделать анимацию
						},
					}
				)

				$({ numberValue: 0 }).animate(
					{ numberValue: textt3 },
					{
						duration: 900, // Продолжительность анимации, где 500 - 0.5 одной секунды, то есть 500 миллисекунд
						easing: 'linear',
						step: function (val) {
							$('.count3').html(Math.ceil(val)) // Блок, где необходимо сделать анимацию
						},
					}
				)

				$({ numberValue: 0 }).animate(
					{ numberValue: textt4 },
					{
						duration: 900, // Продолжительность анимации, где 500 - 0.5 одной секунды, то есть 500 миллисекунд
						easing: 'linear',
						step: function (val) {
							$('.count4').html(Math.ceil(val)) // Блок, где необходимо сделать анимацию
						},
					}
				)
			}
			if (!onScreen) {
				blockStatus = true
			}
		})
	}

	infographics()
})
