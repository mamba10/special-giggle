// JavaScript Document

$(function(){	
	var num=0;
	var timer=null;
	$('.screen1').removeClass('out');

	//gps导航控制;
	$('.gps li').click(function(e) {
		var index=$(this).index();
        $(this).addClass('current').siblings().removeClass();
		$('.main').stop().animate({top: -100*index+'%'},800);
		
		 num=index;
		 $('.main>div').eq(num).removeClass('out').siblings().addClass('out');
    });
	
	//鼠标滚轮事件；
	$(document).mousewheel(function(e,d){
		clearTimeout(timer);
		timer=setTimeout(function(){
			num-=d;
			if(num>6){num=6};
			if(num<0){num=0};
			
			$('.gps li').eq(num).addClass('current').siblings().removeClass();
			$('.main').stop().animate({top: -100*num+'%'},800);
			$('.main>div').eq(num).removeClass('out').siblings().addClass('out');
		},300);
	});
		
})











