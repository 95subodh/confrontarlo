/*	
	JQUERY SLIDER
	jQuery plugin to make a layout like Pinterest
	Developed by Luca Garbin  - lucagarbin.it
	On date: July,18 2013
	
	[HISTORY]
	2013-07-18 : Responsive coming soon...
	
*/

(function($){  
	$.fn.tSlider = function(options) {  

		var defaults = {  
			container : '.sliderCont',
			itemsClass : '.item',
			inSliderWidth : 1083,
			inSliderHeight : 486,
			css3 : $('html').hasClass('csstransforms3d') ? true : false,
			time : 300, //milliseconds
			itemStart : 0,
			btPrev : null,
			btNext : null
		}

		var options = $.extend(defaults, options),
			items,
			itemsCount,
			sliderCont,
			ratio = options.inSliderHeight/options.inSliderWidth,
			sliderWidth,
			sliderHeight,
			drag = options.css3 ? true : false,
			dragValue = 0,
			isDrag = false,
			itemActive = 0,
			browser = jQuery.browser;

		function setSizes(){
			sliderWidth = slider.parent().width()
			sliderHeight = sliderWidth*ratio;
				
			slider.css({
				'width' : sliderWidth,
				'height' : sliderHeight
			})
			
			sliderCont.css({
				'width' : sliderWidth * items.length,
				'height' : sliderHeight,
			})
			
			items.css({
				'width' : sliderWidth,
				'height' : sliderHeight,
				'top' : 0,
				'left' : 0
			})
			
			items.each(function(index){
				$(this).css({left : sliderWidth*index})
			})
		}
		
		function dragging(){
			if(!drag) return
			var initDragValue = 0;
			
			function setDragValues(value,ease){
				
				if(options.css3){
					sliderCont.css({
						'-webkit-transform' : 'translate3d('+(value)+'px,0,0)',
						   		'transform' : 'translate3d('+(value)+'px,0,0)',
					   'transition-duration': (ease ? options.time : 0)+'ms'
					})
				}else{
					sliderCont.css({'left': value+'px'})
				}
				
			}
			
			sliderCont.hammer().on("dragstart", function(e) {
				e.preventDefault();
				if(isDrag) return;
				isDrag = true; 
				
				if(options.css3){
					if(browser.webkit)
						initDragValue = sliderCont.css('-webkit-transform').match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/);
					else
						initDragValue = sliderCont.css('transform').match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/);
				}else{
					initDragValue = sliderCont.css('left').replace('px','');
				}
				
				initDragValue = parseFloat(initDragValue ? initDragValue[5] : 0);

			});
	
			sliderCont.hammer().on("dragleft dragright", function(e) {
				e.preventDefault();
				dragValue = e.gesture.deltaX;
				setDragValues(initDragValue+e.gesture.deltaX);
				
			});
	
			sliderCont.hammer().on("dragend", function(e) {
				e.preventDefault();
	
				if(itemActive == 0 && dragValue > 0)
					goToSlide('prev')
				else if(itemActive == itemsCount - 1 && dragValue < 0)
					goToSlide('next')
				else{
					if(dragValue < 0)
						goToSlide('next');
					else
						goToSlide('prev');
				}
	
				isDrag = false
			});
		}

		function goToSlide(index){
			
			items.eq(itemActive).removeClass('itemActive');
			
			if(index == 'first') itemActive = 0;
			else if(index == 'last') itemActive = itemsCount - 1;
			else if(index == 'next') itemActive ++;
			else if(index == 'prev') itemActive --; // else if(index == 'prev' && itemActive > 0) itemActive --;
			else if(parseInt(index) >= 0) itemActive = index;
			
			items.eq(itemActive == -1 ? itemsCount - 1 : itemActive == itemsCount ? 0 : itemActive ).addClass('itemActive');

			if(options.css3){
				sliderCont.css({
					'-webkit-transform' : 'translate3d('+(-itemActive*sliderWidth)+'px,0,0)',
					   		'transform' : 'translate3d('+(-itemActive*sliderWidth)+'px,0,0)',
				   'transition-duration': options.time+'ms'
				})
				
				setTimeout(function(){
					if(itemActive == -1){
						sliderCont.css({
							'-webkit-transform' : 'translate3d('+(-((itemsCount-1)*sliderWidth))+'px,0,0)',
							   		'transform' : 'translate3d('+(-((itemsCount-1)*sliderWidth))+'px,0,0)',
						   'transition-duration': '0ms'
				   		})
						itemActive = itemsCount - 1
					}else if(itemActive == itemsCount){
						sliderCont.css({
							'-webkit-transform' : 'translate3d(0px,0,0)',
							   		'transform' : 'translate3d(0px,0,0)',
						   'transition-duration': '0ms'
				   		})
						itemActive = 0;
					}
				}, 300)
			}else{
				sliderCont.animate({'left' : -(itemActive*sliderWidth)+'px'},function(){
					if(itemActive == -1){
						sliderCont.css('left',-((itemsCount-1)*sliderWidth))
						itemActive = itemsCount - 1
					}else if(itemActive == itemsCount){
						sliderCont.css('left',0)
						itemActive = 0;
					}
				})
			}
		}

		return this.each(function(){
		
			if(!$('body').hasClass('csstransforms3d') && options.drag)
				options.drag = false;
		
			slider = $(this); 
			items = slider.find(options.itemsClass);
			itemsCount = items.length;
			sliderCont = slider.find(options.container);
			slider.css('position','relative');
			items.css('position','absolute');
			sliderCont.css('position','absolute');
			
			setSizes()
			
			var clone_last = items.eq(itemsCount-1).clone()
			clone_last.css({'position':'absolute','top':0,'left':-sliderWidth})
			items.eq(0).before(clone_last);

			clone_last = items.eq(itemsCount-2).clone()
			clone_last.css({'position':'absolute','top':0,'left':-sliderWidth*2})
			items.eq(0).before(clone_last);

			var clone_first = items.eq(0).clone()
			clone_first.css({'position':'absolute','top':0,'left':(sliderWidth*itemsCount)})
			items.eq(itemsCount-1).after(clone_first);

			clone_first = items.eq(1).clone()
			clone_first.css({'position':'absolute','top':0,'left':(sliderWidth*itemsCount + sliderWidth)})
			items.eq(itemsCount-1).after(clone_first);
			
			if(drag ){
				sliderCont.css({
					'cursor' : 'move'
				})
				dragging();
			}
			
			$(window).resize(function(){
				setSizes();
				goToSlide('current')
			})
			
			items.eq(options.itemStart).addClass('itemActive')
			goToSlide(options.itemStart);
			
			if(options.btPrev)
				$(document).on('click',options.btPrev,function(){ goToSlide('prev') })
			if(options.btNext)
				$(document).on('click',options.btNext,function(){ goToSlide('next') })
			
		})
}})(jQuery); 