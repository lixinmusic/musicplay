$(function(){
        var musics=[
         {src:"./music/1.mp3",name:"坚持到底",arit:"阿杜",time:"04:09"},
         {src:"./music/萌萌哒天团 - 帝都.mp3",name:"萌萌哒天团",arit:"帝都",time:"03:03"},
         {src:"./music/爱就一个字 .mp3",name:"爱就一个字",arit:"张信哲",time:"04:36"},
         {src:"./music/4.mp3",name:"光阴的故事",arit:"佟大为",time:"03:32"},
         {src:"./music/二珂 - 走在冷风中.mp3",name:"走在冷风中",arit:"二珂",time:"03:30"},
        {src:"./music/海鸣威 - 一个人的北京.mp3",name:"一个人的北京",arit:"海鸣威",time:"03:26"},
         {src:"./music/薛之谦 - 丑八怪.mp3",name:"丑八怪",arit:"薛之谦",time:"04:13"}
        ];
        $(musics).each(function(index,value){
        	$("<li class='song' date-id="+index+"><span class='ygc'>"+value.name+"</span><span class='author'>"+value.arit+"</span><span class='time'>"+value.time+"</span><div class='opration'><span class='like'></span><span class='share'></span><span class='shoucang'></span><span class='delete'></span></div></li>").appendTo(".player .player-body")
        });
        var currentIndex;
        $(".player-body li").on("click",function(){
        	currentIndex=parseInt($(this).attr("date-id"));
            audio.src=musics[currentIndex].src;
            audio.play();
        })
		var audio=$("#audio").get(0);
		var $audio=$("#audio");
		// 播放暂停键：
		var $play=$(".player-bottom .three .te2");
		var $left=$(".player-bottom .three .te1");
		var $right=$(".player-bottom .three .te3");
		$play.on("click",function(){
			$(this).css({cursor:"pointer"});
			if(audio.paused){
				if(currentIndex==undefined){
                currentIndex=0;
                audio.src=musics[currentIndex].src;
			 }
				audio.play();
			}else{
				audio.pause();
			}
		})
		$audio.on("play",function(){
			$play.addClass("playing");
			$(".player-body li").removeClass("green").eq(currentIndex).addClass("green");
			var curre=musics[currentIndex];
			$(".psc").text(curre.name);
			$(".dc").text(curre.arit);
			$(".time").text(curre.time);
		})
		$audio.on("pause",function(){
			$play.removeClass("playing");
		})
        $left.on("click",function(){
				if(currentIndex==undefined){
                currentIndex=0;
                audio.src=musics[currentIndex].src;
			 }else{
			 	currentIndex-=1;
			 }
			 $(this).css({cursor:"pointer"});
        	
        	if(currentIndex<0){
        		currentIndex=$(".player-body li").length-1;
        	}
        	audio.src=musics[currentIndex].src;

				audio.play();
			})

        $right.on("click",function(){
				if(currentIndex==undefined){
                 currentIndex=0;
               /* audio.src=musics[currentIndex].src;*/
			 }else{
			 	 currentIndex+=1;
			 }
			    $(this).css({cursor:"pointer"});
        	    if(currentIndex>=$(".player-body li").length){
        	    	currentIndex=0;
        	}
        		audio.src=musics[currentIndex].src;
				audio.play();
			})
		// 音量控制：
		var $volume=$(".player-bottom .three .volume .volume-1");
		var $volumep=$(".player-bottom .three .volume .volume-p");
		var $volume2=$(".player-bottom .three .volume .volume-p .volume-2");
		var $volume3=$(".player-bottom .three .volume .volume-p .volume-3");
		$volume.on("click",function(){
			if(!$(this).attr("ov")){
				$(this).attr("ov",audio.volume);
				audio.volume=0;
			}else{
				audio.volume=$(this).attr("ov")
				$(this).removeAttr("ov");
			}
		})
		$volumep.on("click",function(e){
			    audio.volume=e.offsetX/$(this).width();
		})    
        $volume3.on("mousedown",function(e){
        	     e.stopPropagation(); 
           $(document).on("mousemove",function(e){
                var left=e.pageX-$volumep.offset().left;
                var v=left/$volumep.width();
                v=(v>1)?1:v;
                v=(v<0)?0:v;
                audio.volume=v;
           })
        })
        $volume3.on("click",function(e){
        	e.stopPropagation(); 
        })
        $(document).on("mouseup",function(){
        	$(document).off("mousemove");
        })
		$audio.on("volumechange",function(e){
			if(audio.volume===0){
				$volume.addClass("stop");
			}else{
				$volume.removeClass("stop");
			}
           var w=$volumep.width()*audio.volume;
           $volume2.width(w);
           $volume3.css({left:w-$volume3.width()/2})
		})
		// 底部进度条：
        var $jindutiao=$(".jiant2");
        var $jindutiao2=$(".jiant2 .jindutiao");
        var $yuan=$(".jiant2 .yuan");
        $jindutiao.on("click",function(e){
        	$(this).css({cursor:"pointer"});
        	e.stopPropagation();
            audio.currentTime=(e.offsetX/$jindutiao.width())*audio.duration;
        })
        $yuan.on("click",function(e){
            e.stopPropagation();
        })
        $audio.on("timeupdate",function(){
        	var l=(audio.currentTime/audio.duration)*$jindutiao.width();
        	$jindutiao2.width(l);
            $yuan.css({left:l-$yuan.width()/2});
        })
	})