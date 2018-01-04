"use strict";

$('ul.slimmenu').slimmenu({
    resizeWidth: '992',
    collapserTitle: 'Main Menu',
    animSpeed: 250,
    indentChildren: true,
    childrenIndenter: ''
});

		
$(window).scroll(function(){
        var scrolltop=$(window).scrollTop();
		if($(window).width()>992){
			if(scrolltop>$('.top-area').height()-60){
			   $('.apply-main-header').css('opacity', '1');
				$('.apply-main-header').css('display', 'block');
			}else{
			   $('.apply-main-header').css('opacity', '0');
			}
		}
		//如果slim-menu不显示，即窗口宽度大于992px的时候
		if($('.slimmenu-menu-collapser').css('display')=='none'){
			if ( $(window).scrollTop() > 60){
			
			$('#main-header').css('top',-60);
			$('#main-header').css('backgroundColor','white');
			$('.small-logo').parent().css('display','inline');
			$('#search-aside').css('left',-230);
			$('.small-logo').fadeIn();
			
			$('.main_menu_wrap .top-user-area').css('display','block');
			}else{
			$('#main-header').css('top',0);
			$('#main-header').css('backgroundColor','rgba(255,255,255,0.9)');
			$('.small-logo').fadeOut();
			$('.small-logo').parent().css('display','none');
			$('#search-aside').css('left',-275);
			$('.main_menu_wrap .top-user-area').css('display','none');
			}
			
		}else{
			if ( $(window).scrollTop() > 60){
				$('#search-aside').css('left',-230);
			}else{
				$('#search-aside').css('left',-275);
			}
		}
		
		if ( $(window).scrollTop() > 400){
			$('.top-btn').fadeIn();
		}
		else{
			$('.top-btn').fadeOut();
		}
		getCurrentPage();
		signUpRemind();
		
});
//筛选框
            $(function() {
				/**
				* the element
				*/
				var $ui= $('#search-aside');
				var $headerSearch=$('.main-header-search');
				/**
				* focus和click的时候显示筛选框 
				*/
				$ui.find('.search-input').on('focus click',function(){
					$ui.find('.sb-dropdown')
					   .show();
				});
				$headerSearch.find('input').on('focus click',function(){
					$headerSearch.find('.sb-dropdown2')
					   .show();
				});
				/**
				* 鼠标离开筛选框或按下键盘就隐藏筛选框
				*/
				$ui.on('mouseleave keyup',function(){
					$ui.find('.sb-dropdown')
					   .hide();
				});
				$headerSearch.on('mouseleave keyup',function(){
					$headerSearch.find('.sb-dropdown2')
					   .hide();
				});
				/**
				* 全选
				*/
				$ui.find('.sb-dropdown').find('span[for="all"]').prev().on('click',function(){
					$(this).parent().siblings().find(':checkbox').attr('disabled',this.checked);
				});
            });
			
			
   $(function() {
	   
	 
	   $('#search-in-community').find('.search-input').bind('focus click',function(){
					$('#search-in-community').find('.key-dropdown')
					   .show();
				});
		$('#search-in-community').bind('mouseleave keyup',function(){
					$('#search-in-community').find('.key-dropdown')
					   .hide();
				});
	});

//返回顶部
$('.top-btn').on('click',function () {
     
          $('html,body').stop().animate({
            scrollTop :0
          }, 800); //平滑滚动动画

          //$('ul .current').removeClass('current'); //去除原按钮的current类
          //$(this).parent().addClass('current'); //给当前按钮添加current类
			
          return false;
        
      
});
//回复评论
$('.comment-reply').on('click',function(){
	$(this).next().css('display','block');
});
$('.cancel-reply').on('click',function(){
	$(this).parent().css('display','none');
});



/*//实现搜索输入框的输入提示js类
function oSearchSuggest(searchFuc){
	var input = $('.search-input');
	var input2 = $('.main-header-search').find('input');
	var suggestWrap = $('.search-suggest');
	var suggestWrap2 = $('.search-suggest2');
	var key = "";
	var init = function(){
		input.bind('keyup',sendKeyWord);
		input.bind('blur',function(){setTimeout(hideSuggest,100);})
		input2.bind('keyup',sendKeyWord);
		input2.bind('blur',function(){setTimeout(hideSuggest,100);})
	}
	var hideSuggest = function(){
		suggestWrap.hide();
		suggestWrap2.hide();
	}
	
	//发送请求，根据关键字到后台查询
	var sendKeyWord = function(event){
		
		//键盘选择下拉项
		if(suggestWrap.css('display')=='block'&&event.keyCode == 38||event.keyCode == 40){
			var current = suggestWrap.find('li.hover');
			if(event.keyCode == 38){
				if(current.length>0){
					var prevLi = current.removeClass('hover').prev();
					if(prevLi.length>0){
						prevLi.addClass('hover');
						input.val(prevLi.html());
					}
				}else{
					var last = suggestWrap.find('li:last');
					last.addClass('hover');
					input.val(last.html());
				}
				
			}else if(event.keyCode == 40){
				if(current.length>0){
					var nextLi = current.removeClass('hover').next();
					if(nextLi.length>0){
						nextLi.addClass('hover');
						input.val(nextLi.html());
					}
				}else{
					var first = suggestWrap.find('li:first');
					first.addClass('hover');
					input.val(first.html());
				}
			}
			
		//输入字符
		}else{ 
			var valText = $.trim(input.val());
			if(valText ==''||valText==key){
				return;
			}
			searchFuc(valText);
			key = valText;
		}			
		
	}
	//请求返回后，执行数据展示
	this.dataDisplay = function(data){
		if(data.length<=0){
            suggestWrap.hide();
			return;
		}
		
		//往搜索框下拉建议显示栏中添加条目并显示
		var li;
		var tmpFrag = document.createDocumentFragment();
		suggestWrap.find('ul').html('');
		for(var i=0; i<data.length; i++){
			li = document.createElement('LI');
			li.innerHTML = data[i];
			tmpFrag.appendChild(li);
		}
		suggestWrap.find('ul').append(tmpFrag);
		suggestWrap.show();
		
		//为下拉选项绑定鼠标事件
		suggestWrap.find('li').hover(function(){
				suggestWrap.find('li').removeClass('hover');
				$(this).addClass('hover');
		
			},function(){
				$(this).removeClass('hover');
		}).on('click',function(){
			input.val(this.innerHTML);
			suggestWrap.hide();
		});
		
	}
	init();
};

//实例化输入提示的JS,参数为进行查询操作时要调用的函数名
var searchSuggest =  new oSearchSuggest(sendKeyWordToBack);

//这是一个模似函数，实现向后台发送ajax查询请求，并返回一个查询结果数据，传递给前台的JS,再由前台JS来展示数据。本函数由程序员进行修改实现查询的请求
//参数为一个字符串，是搜索输入框中当前的内容
function sendKeyWordToBack(keyword){
	   /*  var obj = {
			    "keyword" : keyword
			 };
			 $.ajax({
					   type: "POST",
					   url: "${ctx}/front/suqiu2/search/prompt-keyword.action",
					   async:false,
					   data: obj,
					   dataType: "json",
					   success: function(data){
						 //var json = eval("("+data+")");
						 var key=data.split(",");
						 var aData = [];
						 for(var i=0;i<key.length;i++){
								//以下为根据输入返回搜索结果的模拟效果代码,实际数据由后台返回
							if(key[i]!=""){
								  aData.push(key[i]);
							}
						 }
						//将返回的数据传递给实现搜索输入框的输入提示js类
						 searchSuggest.dataDisplay(aData);
					   }
		 });	  */
			 
				/*//以下为根据输入返回搜索结果的模拟效果代码,实际数据由后台返回
				var aData = [];
				aData.push(keyword+'返回数据1');
				aData.push(keyword+'返回数据2');
				aData.push(keyword+'返回数据3');
				aData.push(keyword+'返回数据4');
				aData.push(keyword+'返回数据5');
				aData.push(keyword+'返回数据6');
				//将返回的数据传递给实现搜索输入框的输入提示js类
				searchSuggest.dataDisplay(aData);
	
}
*/
//展开侧边栏
$('#search-aside .icon').click(function() {

    if ($('.search-aside').hasClass("active")) {
        $('.search-aside').css('left', -230);
		$('.search-aside').toggleClass("active");
       
    } else {
       $('.search-aside').css('left', 0);
	   $('.search-aside').toggleClass("active");
    }
});

//侧边栏hover
$('.icon-wechat').hover(
	function(){
		$('.wechat_holder').css('display','block');	
		$('.wechat_holder').css('opacity',1);	
	},
	function(){
	$('.wechat_holder').css('opacity',0);	
	$('.wechat_holder').css('display','none');	
});
$('.icon-phone').hover(
	function(){
		$('.phone_holder').css('display','block');	
		$('.phone_holder').css('opacity',1);	
	},
	function(){
	$('.phone_holder').css('opacity',0);	
	$('.phone_holder').css('display','none');
});

//微信快速登陆
$('.wechat-login').hover(
	function(){
		$('.wechat_holder_2').css('display','block');	
		$('.wechat_holder_2').css('opacity',1);	
	},
	function(){
		$('.wechat_holder_2').css('display','none');	
		$('.wechat_holder_2').css('opacity',0);	
	
});

// Countdown
$('.countdown').each(function() {
    var count = $(this);
    $(this).countdown({
        zeroCallback: function(options) {
            var newDate = new Date(),
                newDate = newDate.setHours(newDate.getHours() + 130);

            $(count).attr("data-countdown", newDate);
            $(count).countdown({
                unixFormat: true
            });
        }
    });
});

//获取验证码
$('.get-identify').on('click',function(){
	var countSeconds = new Date();
	countSeconds.setSeconds(countSeconds.getSeconds()+59);
	$(this).attr('disabled','true');
	
	$(this).html('重新获取（<span id="clock-i"> </span>）');
	$('#clock-i').countdown(countSeconds, function(event) {
		$(this).html(event.strftime('%S')).on('finish.countdown', function(){
			$(this).parent().removeAttr('disabled');
			$(this).parent().html('重新获取');
			return false;
			}); 
	})	
	
});
$('.get-identify2').on('click',function(){
	
	var countTime = new Date();
	countTime.setMinutes(countTime.getMinutes()+1);
	countTime.setSeconds(countTime.getSeconds()+40);
	$(this).attr('disabled','true');
	
	$(this).html('重新获取语音验证（<span id="clock-i2"> </span>）');
	$('#clock-i2').countdown(countTime, function(event) {
		$(this).html(event.strftime('%M:%S')).on('finish.countdown', function(){
			$(this).parent().removeAttr('disabled');
			$(this).parent().html('重新获取语音验证');
			return false;
			}); 
	})	
	
});
//apply 流程按钮
$("[data-projects-nav] li a").click(function(b){
	 b.preventDefault();
     var c = $(this).attr("href");
     $("[data-projects-nav]").find('a[href="' + c + '"]').parents("ul").find("li").removeClass("active"), $("[data-projects-nav]").find('a[href="' + c + '"]').parent("li").addClass("active");
     var d = $(c);
     d.parent().children(".active").removeClass("active"), d.addClass("active"), $(this).parents(".projects-wrapper").addClass("projects-wrapper-show-details"), setTimeout(function() {
        var b = $(window).width() <= 680 ? $(".nav").outerHeight() + 15 : 0;
        $("body,html").animate({scrollTop: $(this).parents(".projects-wrapper").offset().top - b})
    }.bind(this), 100)
});
 $(".projects-details-slider .button-close").click(function(b) {
    b.preventDefault();
	$(this).parents(".projects-wrapper").removeClass("projects-wrapper-show-details")
});

//展开答复
$('.expand-answer').click(function(event){
	if ($(this).parent().parent().hasClass('expanded')) {
        
        $(this).parent().parent().removeClass('expanded');
		$(this).html('<a class="expand-answer btn btn-link text-small" style="padding:0">展开更多<i class="fa fa-angle-down"></i></a>');
    } else {
        $(this).parent().parent().addClass('expanded');
        
		$(this).html('<a class="expand-answer btn btn-link text-small" style="padding:0">收起<i class="fa fa-angle-up"></i></a>');
    }
});


//apply process 导航切换
 $("#owl-tab .item a").on('click', function () {
	 var iterator=0;
	//遍历所有item
    for (iterator = 0; iterator < $('#owl-tab .item').length; iterator++) {
        if ($('#owl-tab .item').eq(iterator).hasClass('active')) {
            $('#owl-tab .item').eq(iterator).removeClass('active');
        } 
    }
        $(this).parent().addClass('active');
});
$('.apply-tab-nav a[href*=#tab]').on('click',function (){
	var iterator=0;
	var index=0;
	//遍历所有item
    for (iterator = 0; iterator <  $('#owl-tab .item').length; iterator++) {
        if ( $('#owl-tab .item').eq(iterator).hasClass('active')) {
             $('#owl-tab .item').eq(iterator).removeClass('active');
        } 
    }
	
	index=parseInt($(this).attr('href').substr(-1,1));
    $('#owl-tab .item').eq(index-1).addClass('active');
	var owl = $(".owl-carousel").data('owlCarousel');
	owl.goTo(index-1);
	 
	$('html,body').stop().animate({
        scrollTop :0
    }, 0); //平滑滚动动画
	 
});



//apply grid 
$('.ri-grid ul li a').on('hover',function(){
	$('.grid-mask').css('top',0);
});


//展开筛选栏
$('.apply-search-more').on('click',function(){
	if($('.screen-holder').hasClass('active')){
		$('.screen-holder').removeClass('active');
		$('.apply-search-more').html('更多<i class="fa fa-angle-down"></i>');
		//$('.colleges-list-search-bar .search-btn').removeAttr('disabled');
		//$('.colleges-list-search-bar input').removeAttr('disabled');
	}else{
		$('.screen-holder').addClass('active');
		$('.apply-search-more').html('收回<i class="fa fa-angle-up"></i>');
		//$('.colleges-list-search-bar .search-btn').attr('disabled','true');
		//$('.colleges-list-search-bar input').attr('disabled','true');
	}
});

//展开排行页面的院校展开栏



//标签
$('.tag-container').click(function(){
	$('.tag-input').focus();
});

$('.tag-input').bind('focus click',function(){
					$('.tag-dropdown')
					   .show(300);
				});

$('.tag-dropdown').children('a').click(function(){
	if(!$('.tag-tip').hasClass('hide-tip')){//添加标签隐藏提示
		$('.tag-tip').addClass('hide-tip');
	}
	var value = '<span class="tag-item">'+'#'+$(this).text()+'</span>';
	//$(this).hide();
	$('.tag-input').before(value);
	$('.tag-input').focus();
});
$('.tag-bar').on('click','span',function(){
	$(this).remove();
	var len = $(".tag-item").siblings().length;  
	if(len==0){
		$('.tag-tip').removeClass('hide-tip');
	}
});

$('.tag-input').on('keyup',function(event){
	if(!$('.tag-tip').hasClass('hide-tip')){//按下键盘隐藏提示
		$('.tag-tip').addClass('hide-tip');
	}
	
	if(event.keyCode==13){//按下回车
		var value = '<span class="tag-item">'+'#'+$(this).val()+'</span>';
		$(this).val("");
		$('.tag-input').before(value);
	}
	if(event.keyCode==188){//按下逗号
		var value = '<span class="tag-item">'+'#'+$(this).val().slice(0,-1)+'</span>';
		$(this).val("");
		$('.tag-input').before(value);
	}
	
	if(event.keyCode==8){//按下退格
		if($(this).val()==""){
			$(this).prev().remove();
			var len = $(".tag-item").siblings().length;  
			if(len==0){
				$('.tag-tip').removeClass('hide-tip');
			}
		}
	}
});


$('.btn').button();

$("[rel='tooltip']").tooltip();

$('.form-group').each(function() {
    var self = $(this),
        input = self.find('input');

    input.focus(function() {
        self.addClass('form-group-focus');
    })

    input.blur(function() {
        if (input.val()) {
            self.addClass('form-group-filled');
        } else {
            self.removeClass('form-group-filled');
        }
        self.removeClass('form-group-focus');
    });
});

$('.typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 3,
    limit: 8
}, {
    source: function(q, cb) {
        return $.ajax({
            dataType: 'json',
            type: 'get',
            url: 'http://gd.geobytes.com/AutoCompleteCity?callback=?&q=' + q,
            chache: false,
            success: function(data) {
                result = [];
                $.each(data, function(index, val) {
                    result.push({
                        value: val
                    });
                });
                cb(result);
            }
        });
    }
});


$('input.date-pick, .input-daterange, .date-pick-inline').datepicker({
    todayHighlight: true
});



$('input.date-pick, .input-daterange input[name="start"]').datepicker('setDate', '-7d');
$('.input-daterange input[name="end"]').datepicker('setDate', 'today');

$('input.time-pick').timepicker({
    minuteStep: 15,
    showInpunts: false
})

$('input.date-pick-years').datepicker({
    startView: 2
});




$('.booking-item-price-calc .checkbox label').click(function() {
    var checkbox = $(this).find('input'),
        // checked = $(checkboxDiv).hasClass('checked'),
        checked = $(checkbox).prop('checked'),
        price = parseInt($(this).find('span.pull-right').html().replace('$', '')),
        eqPrice = $('#car-equipment-total'),
        tPrice = $('#car-total'),
        eqPriceInt = parseInt(eqPrice.attr('data-value')),
        tPriceInt = parseInt(tPrice.attr('data-value')),
        value,
        animateInt = function(val, el, plus) {
            value = function() {
                if (plus) {
                    return el.attr('data-value', val + price);
                } else {
                    return el.attr('data-value', val - price);
                }
            };
            return $({
                val: val
            }).animate({
                val: parseInt(value().attr('data-value'))
            }, {
                duration: 500,
                easing: 'swing',
                step: function() {
                    if (plus) {
                        el.text(Math.ceil(this.val));
                    } else {
                        el.text(Math.floor(this.val));
                    }
                }
            });
        };
    if (!checked) {
        animateInt(eqPriceInt, eqPrice, true);
        animateInt(tPriceInt, tPrice, true);
    } else {
        animateInt(eqPriceInt, eqPrice, false);
        animateInt(tPriceInt, tPrice, false);
    }
});


$('div.bg-parallax').each(function() {
    var $obj = $(this);

    $(window).scroll(function() {
        var animSpeed;
        if ($obj.hasClass('bg-blur')) {
            animSpeed = 10;
        } else {
            animSpeed = 15;
        }
        var yPos = -($(window).scrollTop() / animSpeed);
        var bgpos = '50% ' + yPos + 'px';
        $obj.css('background-position', bgpos);

    });
});



$(document).ready(
    function() {

    $('html').niceScroll({
        cursorcolor: "#000",
        cursorborder: "0px solid #fff",
        railpadding: {
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
        },
        cursorwidth: "10px",
        cursorborderradius: "0px",
        cursoropacitymin: 0.2,
        cursoropacitymax: 0.8,
        boxzoom: true,
        horizrailenabled: false,
        zindex: 9999
    });


        // Owl Carousel
        var owlCarousel = $('#owl-carousel'),
            owlItems = owlCarousel.attr('data-items'),
            owlCarouselSlider = $('#owl-carousel-slider'),
            owlNav = owlCarouselSlider.attr('data-nav');
        // owlSliderPagination = owlCarouselSlider.attr('data-pagination');

        owlCarousel.owlCarousel({
            items: owlItems,
            navigation: true,
            navigationText: ['', '']
        });

        owlCarouselSlider.owlCarousel({
            slideSpeed: 300,
            paginationSpeed: 400,
            // pagination: owlSliderPagination,
            singleItem: true,
            navigation: true,
            navigationText: ['', ''],
            transitionStyle: 'fade',
            autoPlay: 4500
        });

    /*// footer always on bottom
    var docHeight = $(window).height();
   var footerHeight = $('footer').height();
   var footerTop = $('footer').position().top() + footerHeight;
   
   if (footerTop < docHeight) {
    $('footer').css('margin-top', (docHeight - footerTop) + 'px');
   }*/

    
	}
	
	

);

 //点击按钮链接后平滑滚动到相应位置
    $('a[id*=nav]:not([href=#])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').stop().animate({
            scrollTop :target.offset().top-46
          }, 800); //平滑滚动动画

          //$('ul .current').removeClass('current'); //去除原按钮的current类
          //$(this).parent().addClass('current'); //给当前按钮添加current类
          
          return false;
        }
      }
    });


    function getCurrentPage() {
          var iterator = 0;
          var index = -1;
          var anchor = null;
          //遍历所有artical，根据它的顶部和窗口滚动条的顶部差值得出所在栏目
          for (iterator = 0; iterator < $('.apply-container > section').length; iterator++) {
            if ($('.apply-container > section').eq(iterator).offset().top - $(window).scrollTop() <= 50) {
              index = iterator;
            } else {
              break;
            }
          }
          //给锚点赋值
          anchor = $('.progress-nav li').eq(index).find('a');
          //添加删除current类
          if (index >= 0) {
            $('ul .current').removeClass('current');
            anchor.parent().addClass('current');
            }
             
    }
    
	function signUpRemind() {
         //always on bottom
		var docHeight = $(window).height();
		var footerHeight=$('#main-footer').height();
		if($('#main-footer').length>0){
			var footerTop=$('#main-footer').position().top;
		}
		
		
		if ( $(window).scrollTop() > docHeight/2 && $(window).scrollTop()<footerTop-docHeight){
			$('#signUp-remind').css('opacity', '1');
			
		}
		else{
			$('#signUp-remind').css('opacity', '0');
			
		}
        
    }
	
	
$('.nav-drop').dropit();


$("#price-slider").ionRangeSlider({
    min: 0,
    max: 575,
    type: 'double',
    prefix: "$",
    // maxPostfix: "+",
    prettify: false,
    hasGrid: true
});

$('.i-check, .i-radio').iCheck({
    checkboxClass: 'i-check',
    radioClass: 'i-radio'
});



$('.booking-item-review-expand').click(function(event) {
    console.log('baz');
    var parent = $(this).parent('.booking-item-review-content');
    if (parent.hasClass('expanded')) {
        parent.removeClass('expanded');
    } else {
        parent.addClass('expanded');
    }
});


$('.stats-list-select > li > .booking-item-rating-stars > li').each(function() {
    var list = $(this).parent(),
        listItems = list.children(),
        itemIndex = $(this).index();

    $(this).hover(function() {
        for (var i = 0; i < listItems.length; i++) {
            if (i <= itemIndex) {
                $(listItems[i]).addClass('hovered');
            } else {
                break;
            }
        };
        $(this).click(function() {
            for (var i = 0; i < listItems.length; i++) {
                if (i <= itemIndex) {
                    $(listItems[i]).addClass('selected');
                } else {
                    $(listItems[i]).removeClass('selected');
                }
            };
        });
    }, function() {
        listItems.removeClass('hovered');
    });
});



/*$('.booking-item-container').children('.booking-item').click(function(event) {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).parent().removeClass('active');
    } else {
        $(this).addClass('active');
        $(this).parent().addClass('active');
        $(this).delay(1500).queue(function() {
            $(this).addClass('viewed')
        });
    }
});*/
$('.add-to-follow').click(function(event){
	if(!$(this).hasClass('followed')){
		$(this).addClass('followed');
		$(this).removeClass('fa-heart-o');
		$(this).addClass('fa-heart');
	}else{
		$(this).removeClass('followed');
		$(this).removeClass('fa-heart');
		$(this).addClass('fa-heart-o');
	}
});

$('.apply-add-to-follow').click(function(event){
	if(!$(this).hasClass('followed')){
		$(this).addClass('followed');
		$(this).text('已关注');
	}else{
		$(this).removeClass('followed');
		$(this).text('关注');
	}
});

$('.txt-add-to-follow').click(function(event){
	if(!$(this).hasClass('followed')){
		$(this).addClass('followed');
		$(this).removeClass('btn-primary');
		$(this).addClass('btn-success');
		$(this).text('已关注');
	}else{
		$(this).removeClass('followed');
		$(this).removeClass('btn-success');
		$(this).addClass('btn-primary');
		$(this).text('关注');
	}
});

$('.txt-add-to-compare').click(function(event){
	if(!$(this).hasClass('followed')){
		$(this).addClass('followed');
		$(this).removeClass('btn-primary');
		$(this).addClass('btn-success');
		$(this).text('已加入对比');
	}else{
		$(this).removeClass('followed');
		$(this).removeClass('btn-success');
		$(this).addClass('btn-primary');
		$(this).text('加入对比');
	}
});

/*()$('.add-to-love').click(function(event){
	if(!$(this).hasClass('loved')){
		$(this).addClass('loved');
		$(this).children('i').removeClass('fa-heart-o');
		$(this).children('i').addClass('fa-heart');
		$(this).children('span').text('2');
	}else{
		$(this).removeClass('loved');
		$(this).children('i').removeClass('fa-heart');
		$(this).children('i').addClass('fa-heart-o');
		$(this).children('span').text('1');
	}
});*/

$('.nav-search').click(function(event){
	 if ($(this).parent().parent().parent().next().hasClass('expand')) {
        $(this).parent().parent().parent().next().removeClass('expand');
    } else {
        $(this).parent().parent().parent().next().addClass('expand');
    }
});

//查看回复，查看更多
$('.view-reply').click(function(event){
	 if ($(this).parent().parent().parent().parent().hasClass('active')) {
        $(this).parent().parent().parent().parent().removeClass('active');
        $(this).parent().parent().parent().parent().parent().removeClass('active');
		$(this).removeClass('fa-comments');
		$(this).addClass('fa-comments-o');
    } else {
        $(this).parent().parent().parent().parent().addClass('active');
        $(this).parent().parent().parent().parent().parent().addClass('active');
		$(this).removeClass('fa-comments-o');
		$(this).addClass('fa-comments');
        $(this).parent().parent().parent().parent().delay(1500).queue(function() {
            $(this).parent().parent().parent().parent().addClass('viewed')
        });
    }
});

$('.view-more').click(function(event){
	 if ($(this).parent().parent().parent().parent().hasClass('active')) {
        $(this).parent().parent().parent().parent().removeClass('active');
        $(this).parent().parent().parent().parent().parent().removeClass('active');
		$(this).text('查看详情');
    } else {
        $(this).parent().parent().parent().parent().addClass('active');
        $(this).parent().parent().parent().parent().parent().addClass('active');
		$(this).text('收起');
        $(this).parent().parent().parent().parent().delay(1500).queue(function() {
            $(this).parent().parent().parent().parent().addClass('viewed')
        });
    }
});

$('.ranking-view-more').click(function(event){
	 if ($(this).parent().hasClass('active')) {
        $(this).parent().removeClass('active');
        $(this).parent().removeClass('active');
		//$(this).html('展开 <i class="fa fa-caret-down"></i>');
		
    } else {
        $(this).parent().addClass('active');
        $(this).parent().addClass('active');
		//$(this).html('收回 <i class="fa fa-caret-up"></i>');
		
        $(this).parent().delay(1500).queue(function() {
            $(this).parent().addClass('viewed')
        });
    }
});

//展开标签
$('.expand-tag').click(function(event){
	 if ($(this).parent().hasClass('expanded')) {
        
        $(this).parent().removeClass('expanded');
		$(this).text('展开');
    } else {
        $(this).parent().addClass('expanded');
        
		$(this).text('收起');
    }
});

//选择国家
$('.country-group > a ').each(function(){
	var list = $(this).parent(),
        listItems = list.children(),
		count=0;
		
	$(this).click(function() {
		if($(".country-group > a[class*='selected']").length>=2){
			if($(this).hasClass('selected')){
				$(this).removeClass('selected');
			}
			return false;
		}else{
			 if (!$(this).hasClass('selected')) {
				$(this).addClass('selected');  
			}else{
				$(this).removeClass('selected');
			} 
		}
        });
	 
});
//user center
$('.btn-cancel-follow').on('click',function(){
	$(this).parent().parent().parent().parent().hide();
});



//apply-intention 选择国家
$('.country-select ins').on('click',function(){
	if($(".country-select div[class*='checked']").length>2){
		$(this).parent().removeClass('checked');
	}
	
	
});

$('.form-group-cc-number input').payment('formatCardNumber');
$('.form-group-cc-date input').payment('formatCardExpiry');
$('.form-group-cc-cvc input').payment('formatCardCVC');

//关闭注册提醒
$('.close-remind').click(function(){
	$('#signUp-remind').hide();
});


if ($('#map-canvas').length) {
    var map,
        service;

    jQuery(function($) {
        $(document).ready(function() {
            var latlng = new google.maps.LatLng(40.7564971, -73.9743277);
            var myOptions = {
                zoom: 16,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };

            map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);


            var marker = new google.maps.Marker({
                position: latlng,
                map: map
            });
            marker.setMap(map);


            $('a[href="#google-map-tab"]').on('shown.bs.tab', function(e) {
                google.maps.event.trigger(map, 'resize');
                map.setCenter(latlng);
            });
        });
    });
}


$('.card-select > li').click(function() {
    self = this;
    $(self).addClass('card-item-selected');
    $(self).siblings('li').removeClass('card-item-selected');
    $('.form-group-cc-number input').click(function() {
        $(self).removeClass('card-item-selected');
    });
});
// Lighbox gallery
$('#popup-gallery').each(function() {
    $(this).magnificPopup({
        delegate: 'a.popup-gallery-image',
        type: 'image',
        gallery: {
            enabled: true
        }
    });
});

// Lighbox image
$('.popup-image').magnificPopup({
    type: 'image'
});

// Lighbox text
$('.popup-text').magnificPopup({
    removalDelay: 500,
    closeBtnInside: true,
    callbacks: {
        beforeOpen: function() {
            this.st.mainClass = this.st.el.attr('data-effect');
        }
    },
    midClick: true
});

// Lightbox iframe
$('.popup-iframe').magnificPopup({
    dispableOn: 700,
    type: 'iframe',
    removalDelay: 160,
    mainClass: 'mfp-fade',
    preloader: false
});

 $('.popup-youku').magnificPopup({
        
     disableOn: 700,
     type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,
			closeBtnInside: true,
          fixedContentPos: false
 });
		
$('.popup-with-form').magnificPopup({
          type: 'inline',
          preloader: false,
          focus: '#name',

          // When elemened is focused, some mobile browsers in some cases zoom in
          // It looks not nice, so we disable it:
          callbacks: {
            beforeOpen: function() {
              if($(window).width() < 700) {
                this.st.focus = false;
              } else {
                this.st.focus = '#name';
              }
            }
          }
        });
$('.popup-with-move-anim').magnificPopup({
          type: 'inline',

          fixedContentPos: false,
          fixedBgPos: true,

          overflowY: 'auto',

          closeBtnInside: true,
          preloader: false,
          
          midClick: true,
          removalDelay: 300,
          mainClass: 'my-mfp-slide-bottom'
        });
$('.form-group-select-plus').each(function() {
    var self = $(this),
        btnGroup = self.find('.btn-group').first(),
        select = self.find('select');
    btnGroup.children('label').last().click(function() {
        btnGroup.addClass('hidden');
        select.removeClass('hidden');
    });
});
// Responsive videos
$(document).ready(function() {
    $("body").fitVids();
});

$(function($) {
    $("#twitter").tweet({
        username: "remtsoy", //!paste here your twitter username!
        count: 3
    });
});

$(function($) {
    $("#twitter-ticker").tweet({
        username: "remtsoy", //!paste here your twitter username!
        page: 1,
        count: 20
    });
});

$(document).ready(function() {
    var ul = $('#twitter-ticker').find(".tweet-list");
    var ticker = function() {
        setTimeout(function() {
            ul.find('li:first').animate({
                marginTop: '-4.7em'
            }, 850, function() {
                $(this).detach().appendTo(ul).removeAttr('style');
            });
            ticker();
        }, 5000);
    };
    ticker();
});

var tid = setInterval(tagline_vertical_slide, 2500);


//register footer 
$('.expand-footer').on('click',function(){
	$('.slim-footer').css('bottom','190px');
});



// vertical slide
function tagline_vertical_slide() {
    var curr = $("#tagline ul li.active");
    curr.removeClass("active").addClass("vs-out");
    setTimeout(function() {
        curr.removeClass("vs-out");
    }, 500);

    var nextTag = curr.next('li');
    if (!nextTag.length) {
        nextTag = $("#tagline ul li").first();
    }
    nextTag.addClass("active");
}

function abortTimer() { // to be called when you want to stop the timer
    clearInterval(tid);
}