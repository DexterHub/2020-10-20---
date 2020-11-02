$(function(){
    var loading = setInterval(function() {
        if ($(".loading .line").width() < 243) {
            $(".loading .line").css("width", $(".loading .line").width() + 3 + 'px');
            $("#text").html(parseInt($(".loading .line").width() / 2.42) + '%');
            $(".loading .sailboat").css("left", $(".loading .line").width() + 40 + 'px');
        } else {
            $(".loading").fadeOut();
            $(".home").fadeIn();
            setTimeout(function() {
                
                clearInterval(loading);
            }, 100);
        }
    }, 100);
    $(".home .button").on("click",function(){
        $(".home").fadeOut();
        $(".page1").fadeIn();
    })
    $('#photos').on("change", function (e) {
        var file = this.files[0];
        var src = window.URL.createObjectURL(file);
        $("#box").attr("src", src);
        var image = $("#box");
        var images = $(".picture");
        var startX0 = null;
        var startY0 = null;
        var endX0 = 0;
        var endY0 = 0;
        image.get(0).ontouchstart = function(e){
            e = e.changedTouches[0];
            startX0 = e.pageX;
            startY0 = e.pageY; 
            window.ontouchmove = function(e){
                e = e.changedTouches[0];
                image.css(`transform`,`translate(${e.pageX - startX0 + endX0 + "px"} , ${e.pageY - startY0 + endY0 +"px"})`);
            }
        }
        image.get(0).ontouchend = function(e){
            e = e.changedTouches[0];
            endX0 +=  e.pageX - startX0;
            endY0 +=  e.pageY - startY0; 
        }
    });
    $(".page1 .button").on("click",function(){
        if($("#box").attr("src") == ""){
            alert("请上传图片");
        }else {
            $(".page1").fadeOut();
            $(".page2").fadeIn();
            $(".page2 .content .picture").attr("src", $("#box").attr("src"));
            $("#box").css("pointer-events","none");
            $(".picture").css("pointer-events","none");
            var phone = ["img/page2-detection.png","img/page2-detection2.png"];
            var phone1 = ["img/page2-detection.png","img/page2-detection2.png"];
            var phone2 = ["img/page2-detection3.png","img/page2-detection4.png"];
            function selectFrom(minValue,maxValue){
                var num = maxValue - minValue + 1;
                return Math.floor(Math.random()*num + minValue);
            }
            $(".page2 .eyeTest").attr("src",phone[selectFrom(0,phone.length-1)]);
            $(".page2 .noseDetect").attr("src",phone1[selectFrom(0,phone1.length-1)]);
            $(".page2 .faceTest").attr("src",phone2[selectFrom(0,phone2.length-1)]);
            if($(".page2 .eyeTest").attr("src") == "img/page2-detection.png"){
                $(".page2 .eye").attr("src","img/page2-eye1.png");
                $(".page2 .eye").addClass("severity");
            }else {
                var phone3 = ["img/page2-eye2.png","img/page2-eye3.png"];
                function selectFrom(minValue,maxValue){
                    var num = maxValue - minValue + 1;
                    return Math.floor(Math.random()*num + minValue);
                }
                $(".page2 .eye").attr("src",phone3[selectFrom(0,phone.length-1)]);
            };
            if($(".page2 .noseDetect").attr("src") == "img/page2-detection.png"){
                $(".page2 .nose").attr("src","img/page2-nose3.png");
                $(".page2 .nose").addClass(" severity");
            }else {
                var phone4 = ["img/page2-nose1.png","img/page2-nose2.png"];
                function selectFrom(minValue,maxValue){
                    var num = maxValue - minValue + 1;
                    return Math.floor(Math.random()*num + minValue);
                }
                $(".page2 .nose").attr("src",phone4[selectFrom(0,phone.length-1)]);
            };
            if($(".page2 .faceTest").attr("src") == "img/page2-detection4.png"){
                $(".page2 .face").attr("src","img/page2-cheek3.png");
                $(".page2 .face").addClass(" severity")
            }else {
                var phone5 = ["img/page2-cheek1.png","img/page2-cheek2.png"];
                function selectFrom(minValue,maxValue){
                    var num = maxValue - minValue + 1;
                    return Math.floor(Math.random()*num + minValue);
                }
                $(".page2 .face").attr("src",phone5[selectFrom(0,phone.length-1)]);
            };
        }
    });
    $(".page2 .button").on("click",function(){
        if($(".result .eye").hasClass("severity")){
            $(".page3").fadeIn();
            $(".page3 .interim").fadeIn();
            var timer = setInterval(function(){
                $(".page2").fadeOut();
                $(".page3 .interim").fadeOut();
                $(".page3 .testingResult").fadeIn();
                clearInterval(timer);
            },4000);
            $(".page3 .testingResult .content .picture").attr("src", $("#box").attr("src"));
            $("#box").attr("src","");
        }else if($(".result .nose").hasClass("severity")){
            $(".page4").fadeIn();
            $(".page4 .interim").fadeIn();
            var timer = setInterval(function(){
                $(".page2").fadeOut();
                $(".page4 .interim").fadeOut();
                $(".page4 .testingResult").fadeIn();
                clearInterval(timer);
            },4000);
            $(".page4 .testingResult .content .picture").attr("src", $("#box").attr("src"));
            $("#box").attr("src","");
        }else if($(".result .face").hasClass("severity")){
            $(".page5").fadeIn();
            $(".page5 .interim").fadeIn();
            var timer = setInterval(function(){
                $(".page2").fadeOut();
                $(".page5 .interim").fadeOut();
                $(".page5 .testingResult").fadeIn();               
                clearInterval(timer);
            },4000);
            $(".page5 .testingResult .content .picture").attr("src", $("#box").attr("src"));
            $("#box").attr("src","");
        }
    })
    $(".page3 .testingResult .anew").on("click",function(){
        $(".page3 .testingResult").fadeOut();
        $(".page3 .share .content .picture").attr("src", $("#box").attr("src"));
        $(".page3 .share").fadeIn();
        html2canvas(document.querySelector("#capture")).then(canvas => {
            document.body.appendChild(canvas);
            var c = document.querySelector('canvas');
            console.log(c);
            var url = c.toDataURL();
            var a = $("<img>").attr("src", url).appendTo("body");
            $(a).addClass("canvas-img");
        });
    });
    $(".page3 .testingResult .save").on("click",function(){
        $(".page3 .testingResult").fadeOut();
        $(".page3").fadeOut();
        $(".page1").fadeIn();
        $("#box").css("pointer-events","auto");
        $(".picture").css("pointer-events","auto");
    });
    $(".page3 .share .get").on("click",function(){
        $(".page3").fadeOut();
        var canvas = document.querySelector('canvas');
        $(canvas).fadeOut();
        
        var flower= [".page6",".page7"];
        function selectFrom(minValue,maxValue){
            var num = maxValue - minValue + 1;
            return Math.floor(Math.random()*num + minValue);
        }
        $(flower[selectFrom(0,flower.length-1)]).fadeIn();
    });
    $(".page4 .testingResult .anew").on("click",function(){
        $(".page4 .testingResult").fadeOut();
        $(".page4 .share .content .picture").attr("src", $("#box").attr("src"));
        $(".page4 .share").fadeIn();
        html2canvas(document.querySelector("#capture2")).then(canvas => {
            document.body.appendChild(canvas);
            var c = document.querySelector('canvas');
            console.log(c);
            var url = c.toDataURL();
            var a = $("<img>").attr("src", url).appendTo("body");
            $(a).addClass("canvas-img");
        });
    });
    $(".page4 .testingResult .save").on("click",function(){
        $(".page4 .testingResu").fadeOut();
        $(".page4").fadeOut();
        $(".page1").fadeIn();
        $("#box").css("pointer-events","auto");
        $(".picture").css("pointer-events","auto");
    });
    $(".page4 .share .get").on("click",function(){
        $(".page4").fadeOut();
        var canvas = document.querySelector('canvas');
        $(canvas).fadeOut();
        $(".canvas-img").fadeOut();
        var flower= [".page6",".page7"];
        function selectFrom(minValue,maxValue){
            var num = maxValue - minValue + 1;
            return Math.floor(Math.random()*num + minValue);
        }
        $(flower[selectFrom(0,flower.length-1)]).fadeIn();
    });
    $(".page5 .testingResult .anew").on("click",function(){
        $(".page5 .testingResult").fadeOut();
        $(".page5 .share .content .picture").attr("src", $("#box").attr("src"));
        $(".page5 .share").fadeIn();
        html2canvas(document.querySelector("#capture3")).then(canvas => {
            document.body.appendChild(canvas);
            var c = document.querySelector('canvas');
            console.log(c);
            var url = c.toDataURL();
            var a = $("<img>").attr("src", url).appendTo("body");
            $(a).addClass("canvas-img");
        });
    });
    $(".page5 .testingResult .save").on("click",function(){
        $(".page5 .testingResult").fadeOut();
        $(".page5").fadeOut();
        $(".page1").fadeIn();
        $("#box").css("pointer-events","auto");
        $(".picture").css("pointer-events","auto");
    });
    $(".page5 .share .get").on("click",function(){
        $(".page5").fadeOut();
        var canvas = document.querySelector('canvas');
        $(canvas).fadeOut();
        $(".canvas-img").fadeOut();
        var flower= [".page6",".page7"];
        function selectFrom(minValue,maxValue){
            var num = maxValue - minValue + 1;
            return Math.floor(Math.random()*num + minValue);
        }
        $(flower[selectFrom(0,flower.length-1)]).fadeIn();
    });
    $(".page7 .box .button").on("click",function(){
        $(".page7 .box").fadeOut();
        $(".page7 .box2").fadeIn();
    })
    $(".page7 .box2 .button").on("click",function(){
        console.log($("#user").val());
        if($("#user").val() == ""){
            alert("请输入姓名");
        }else if($("#user").val == "^[\u4E00-\u9FA5]{1,6}$") {
            alert("请正确格式姓名");
        }else if($("#telephone").val() == ""){
            alert("请输入电话");
        }else if ($("#telephone").val == "^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$"){
            alert("请正确格式手机号");
        }else if($("#address").val() == "") {
            alert("请输入地址");
        }else if($("#address").val() == "^([^\x00-\xff]|[A-Za-z0-9_])+$"){
            alert("请正确格式地址");
        }else {
            $(".page7 .box2").fadeOut();
            $(".page7 .box3").fadeIn();
        }
    });
})