var page = 0,
	on_loading = false,
	end = false,
	instagram_pics,
	home_to = false, // home timeout
	is_safari = navigator.userAgent.indexOf("Safari") > -1 && !(navigator.userAgent.indexOf('Chrome') > -1),
	prod_to = false;

function has_class(_selector,_class) {
	if ($(_selector).hasClass(_class)) { return true; }
	return false;
}

function home_cover() {
	var img_w = 1280,
		img_h = 719,
		ratio_x = img_w/img_h,
		ratio_y = img_h/img_w,
		w_width = $(window).width(),
		w_height = $(window).height();
	
	$('#cover').height($(window).height());
	
	if (w_width*ratio_y < w_height) {
		$('#cover .slide').css({
			'width' : w_height*ratio_x,
			'height' : w_height,
			'margin-top'	: -(w_height)/2,
			'margin-left'	: -(w_height*ratio_x)/2
		})
	}
    else {
		$('#cover .slide').css({
			'width'			: w_width,
			'height'		: w_width*ratio_y,
			'margin-left'	: -(w_width)/2,
			'margin-top'	: -(w_width*ratio_y)/2
		})
	}
	
}

$(document).ready(function() {
	// CUSTOM SELECT

	if ($.fn.selectizer){
		$('#form-add-product select,.selectize').selectizer()

		$('#billing_country').selectizer({
			onChange: function(data){
		        if (data.value == 'IT')
		            $('#fiscal-code-group').show()
		        else
		            $('#fiscal-code-group').hide()
			}
		})
		$('#shipping_country').selectizer({
			onChange : function(data){
		        var shipping_country = data.value;
		        var zip = $('#shipping_zip').val();
		        if (shipping_country != '') {
		            $.post(SITE_URL + 'ajax/shipping_cost', {
		                    country: shipping_country,
		                    zip: zip
		                },
		                function(data) {
		                    if (data.success)
		                        $('label[for=shipping_courier] span').text(data.shipping_cost);
		                    else
		                        $('label[for=shipping_courier] span').text('ERR');
		                },
                        'json'
		            );
		        }

			}
		})

		if (has_class('body','product')) {
			$('#form-add-product select').selectizer()
		}
	}
		


	
	if (has_class('body','home')) {
		home_cover();
		
		$('#home-bt-down').on('click', function(e) {
			e.preventDefault()
			$('html,body').animate({'scrollTop': $('#shop-oline').offset().top - 84},1000,'easeInOutQuint')
		})

		$('#null').instagram({template:'<li>{img}</li>',reset: true,hash: 'folksverona',clientId : '2791a8ea01b544e69a9ccbd14d9dffa9',show:30,onComplete : function (photos, data) {
			var instagram_pics = photos;
			for(var i=0;i<instagram_pics.length;i++) {
				$('#instagram .sliderCont').append('<div class="item"><div class="pic"><img src="'+instagram_pics[i].images.low_resolution.url+'"><div class="hover"><div class="text"><span class="likes">'+instagram_pics[i].likes.count+'</span><p class="dida"><a href="'+instagram_pics[i].link+'" target="_blank">'+instagram_pics[i].caption.text+'</a></p></div></div></div></div>');
				if (i == instagram_pics.length - 1) {
					$('#instagram').tSlider({
						inSliderWidth: 306,
						inSliderHeight: 306,
						itemStart: parseInt($('#instagram .item').length/2)
					})
				}

			}
		}})
	}

	if (has_class('body','about') || has_class('body','brands')) {
		$("#about-slider").responsiveSlides({
	        speed: 800,
	        nav: true,
	        pager: true
	    });
	}	

	if (has_class('body','home')) {
		$('.blogpost').each(function() {
			var els = $(this).find('.blogpost-content img,.blogpost-content iframe')
			var el = els.eq(0);
			$(this).find('.el').html(el);
			if (el.is('iframe')) {
				$(this).fitVids();
			}
		})
        $('.launch-box .valign').on('click', function() {
            location.href = $(this).find('a').attr('href');
        })
	}
	$('nav li').on('click', function() {
		location.href = $(this).find('a').attr('href');
	})
	
	if ($.fn.fancybox) {
		$('.about .launch-box').on('click', function(e) {
			if ($(e.target).hasClass('text'))
				$(this).find('a').trigger('click');
		})
		$('.about .launch-box .bt').fancybox({
			width : 700,
			height : 393,
			padding : 0,
			openEffect  : 'none',
			closeEffect : 'none',
			helpers : {
				media : {},
				overlay : {
		            css : {
		                'background' : 'rgba(255, 255, 255, 0.8)'
		            }
		        }
			}
		});
	}	
	
	if (has_class('body','product')) {


		var galleria = $('#gallery').royalSlider({
			fullscreen: {
				enabled: true,
				nativeFS: false
			},
			controlNavigation: 'none',
			autoScaleSlider: true, 
			autoScaleSliderWidth: 770,     
			autoScaleSliderHeight: 540,
			imageScalePadding: 0,
			loop: false,
			imageScaleMode: 'fit-if-smaller',
			navigateByClick: true,
			numImagesToPreload:2,
			arrowsNav:true,
			arrowsNavAutoHide: true,
			arrowsNavHideOnTouch: true,
			keyboardNavEnabled: true,
			fadeinLoadedSlide: true,
			globalCaption: true,
			globalCaptionInside: false
		}).data('royalSlider');
		

		galleria.ev.on('rsAfterSlideChange', function(event) {
			$('#thumbs li').eq(galleria.currSlideId).trigger('click')
		});
		
		$('#thumbs li').not('.disable').each(function(index){
			$(this).on('click',function(){
				$('#thumbs li').removeClass('active')
				galleria.goTo(index)
				$(this).addClass('active');
			})
		})

	}

    $('#form-add-product').on('submit', function(e) {
        e.preventDefault();
        var t = $(this);
		if(t.find('.submit').hasClass('loading')) return false; 
		t.find('.submit').addClass('loading')
        // animazione
        $.post(t.attr('action'), t.serialize(), function(data) {
			t.find('.submit').removeClass('loading')
			if(!data.success){
				$('#product-tooltip')
					.attr('data-original-title', data.message)
					.tooltip('fixTitle')
					.tooltip('show');

				if(prod_to)
					clearTimeout(prod_to)

				prod_to = setTimeout(function(){
					$('#product-tooltip').tooltip('hide')
				},2000)

				//alert(data.message);
				$('#qty').val(1);
				return;
			}

			if(data.total_items > 0){
				$('#bt-cart').addClass('active');
				$('#bt-cart .num').text('('+data.total_items+')')
			}
			if(data.success)
				t.find('.submit').html('<span class="ion-checkmark"></span> '+t.find('.submit').data('added'));
        }, 'json')
    })
	
	$('.cart-form-update input').on('change', function(e) {
		if($(this).val() == 0)
			$(this).val(1);
		$(this).closest('form').submit();	
	})

	$('.cart-form-update').on('submit',function(e) {
		e.preventDefault();
		var t = $(this);

        if (t.find('input[name=qty]').val() == 0)
            $('#form-delete').submit();
        else {
            $.post(t.attr('action'),t.serialize(), function(data) {

                if(!data.success){
					$('#product-tooltip')
						.attr('data-original-title', data.message)
						.tooltip('fixTitle')
						.tooltip('show');

					if(prod_to)
						clearTimeout(prod_to)

					prod_to = setTimeout(function(){
						$('#product-tooltip').tooltip('hide')
					},2000)

                	//alert(data.message);
                	t.find('input[name=qty]').val(1)
                	return;
                }
                t.closest('tr').find('.item-subtotal').text(data.subtotal)
                $('#cart-total strong').text(data.total)
            }, 'json');
        }
	})

	$('.cart-form-delete').on('submit', function(e) {
		e.preventDefault();
		var t = $(this);
		
		$.post(t.attr('action'),t.serialize(), function(data) {
			t.closest('tr').fadeOut(function() {
				t.closest('tr').remove();
				$('#cart-total strong').text(data.total)
                if (data.total_items == 0)
                    window.location.replace(SITE_URL + 'shop');
			})
		}, 'json');
	})
	
	$('#btn_shipping').on('click', function() {
        // non hide e show, ma precompila campi
		if ($('#same_addresses').is(':checked')) {
            // $('#shipping-address').show()
        }
		else {
            // $('#shipping-address').hide()
            $('#shipping_full_name').val($('#billing_full_name').val());
            $('#shipping_bell_name').val($('#billing_full_name').val());
            $('#shipping_address').val($('#billing_address').val());
            $('#shipping_city').val($('#billing_city').val());
            $('#shipping_zip').val($('#billing_zip').val());
            // Luca: non va sta cosa
            $('#shipping_country').val($('#billing_country').val());

            var current_billing_country = $('#billing_country').data('selectizer').current()
            $('#shipping_country').data('selectizer').selectByValue(current_billing_country.value)



            var shipping_country = $('#shipping_country').data('selectizer').current();
            var zip = $('#shipping_zip').val();

            // perché l'if?
            if (shipping_country.value == 'IT') {
                $.post(SITE_URL + 'ajax/shipping_cost', {
                        country: shipping_country.value,
                        zip: zip
                    },
                    function(data) {
                        if (data.success)
                            $('label[for=shipping_courier] span').text(data.shipping_cost);
                        else
                            $('label[for=shipping_courier] span').text('ERR');
                    },
                    'json'
                );
            }
        }
	})
	
    $('#btn_register').on('click', function() {
        if ($('#register_check').is(':checked'))
            $('#register-password-group').hide()
        else
            $('#register-password-group').show()
    })

    $('#shipping_country').on('change', function() {
    })
    
    $('#shipping_zip').on('focusout', function() {
        if ($('#shipping_country').val() == 'IT') {
            var shipping_country = $('#shipping_country').val();
            var zip = $(this).val();
            $.post(SITE_URL + 'ajax/shipping_cost',
                {
                    country: shipping_country,
                    zip: zip
                },
                function(data) {
                    if (data.success)
                        $('label[for=shipping_courier] span').text(data.shipping_cost);
                    else
                        $('label[for=shipping_courier] span').text('ERR');
                },
                'json'
            );
        }
    })

    $('input[id^=billing], input[id^=shipping]').on('change', function() {
        $('#same_addresses').attr('checked', false);
    })

    $('#check-coupon').on('submit', function(e) {
        e.preventDefault();
        var t = $(this)
        // loading
        $.post($(this).attr('action'),
            {
                coupon_code: $('#coupon_code').val(),
                shipping: parseFloat($('#checkout-shipping td').text()),
                extra: parseFloat($('#checkout-extra td').text())
            },
            function(data) {
                t.children('p').finish()
                t.children('p').text(data.message).fadeTo(200, 1).delay(5000).fadeTo(400, 0)
                $('#checkout-total td').text(data.total)
                $('#checkout-coupon td').text(data.discount)
                if (data.success)
                    $('#checkout-coupon').show()
                else
                    $('#checkout-coupon').hide()
            },
            'json'
        );
    })
    
    $(document).on('click','#products-list .item',function(e){
	    e.preventDefault();
	    window.location = $(this).find('a').attr('href');
    })
	
    $('#blog-list-post').fitVids()

});

$(window).resize(function() {
	if (!Modernizr.touch)
		home_cover();
	
});

$(window).scroll(function() {
	
	if (has_class('body','home')) {

		if(home_to)
			clearTimeout(home_to);

		// timeout per fix safari
		home_to = setTimeout(function(){
			if ($(window).scrollTop() >= $('#shop-oline').offset().top - 168) {
				$('body').removeClass('menu-abs dark');
				$('body').addClass('menu-small');
				if (!Modernizr.touch) {
					$('header').css('top', $(window).scrollTop() + 84-  $('#shop-oline').offset().top <= 0 ? $(window).scrollTop() + 84 - $('#shop-oline').offset().top : 0)
				}
			}
	        else {
				$('body').addClass('menu-abs dark');
				$('body').removeClass('menu-small');
				$('header').css('top', 0)
			}
		},is_safari ? 200 : 0)

	}
    else {
		if ($(window).scrollTop() >= 84) {
			$('body').addClass('menu-small');
		}
        else {
			$('body').removeClass('menu-small');
		}
	}
	
	if (has_class('body','blog')) {
	    //if ($(window).scrollTop() == $(document).height()-$(window).height() && !end) {
	    //console.log($(window).scrollTop() +' : '+ ( $('#blog-list-post').height() - $(window).height() + $('#blog-list-post').position().top ))
	    if ($(window).scrollTop() > ($('#blog-list-post').height() + $('#blog-list-post').offset().top - $(window).height()) && !end && !on_loading) {
			if (on_loading) return;
			on_loading = true;
			$('#blog-list-post-loading').show()
			$.get(SITE_URL+'/journal/page/'+(page+1), function(data) {
				if (data) {
					$('#blog-list-post').append(data);
					page++;
				}
                else {
					end = true;
				}
				on_loading = false;
				$('#blog-list-post-loading').hide()
			},'html')
		}
	}
	
	if (has_class('body','category') && has_class('body','shop')) {
	    if ($(window).scrollTop() >= $(document).height()-$(window).height()-300 && !end) {
			$('#load-more').trigger('click')
		}
	}
	
	$('#load-more').on('click', function(e) {
		e.preventDefault();
		if (on_loading) return;
		on_loading = true;
		
		var bt = $(this);
		
		bt.addClass('loading');

		$.get(bt.attr('href'), function(data) {

			var html = $('<div>'+data+'</div>'),
				prods = html.find('#products-list');
			
			$('#products-list').append(prods.html());
			if(html.find('#load-more').length)
				$('#load-more').attr('href',html.find('#load-more').attr('href'));
			else
				$('#load-more').remove();

			on_loading = false;
			bt.removeClass('loading')
		},'html')
		
	})

});