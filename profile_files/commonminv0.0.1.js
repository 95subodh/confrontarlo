function setCoor(e){$(".bak").css({height:"100%",width:"100%"}).fadeIn("slow");$("."+e).css({left:"330px",top:"129px"});$("."+e).fadeIn("slow")}function setArenaPos(){$(".arena-wrap").offset({top:295,left:offst.left-$("#main").width()-20}).width($("#main").width()+20).show()}function unishw(e,t,n,r){$(".unintfi").removeClass("safe unsafe").children(".emotions").removeClass("good bad").addClass(e).end().find(".rsntxt").html(t).end().insertAfter($("#"+n).find("."+r));e==="good"?$(".unintfi").addClass("safe").fadeIn():$(".unintfi").addClass("unsafe").fadeIn();setTimeout(function(){$(".unintfi").fadeOut(1e3)},15500)}function close(){$(".lg").fadeOut("fast");$(".bak").fadeOut("slow");$(".signup").hide()}function noticebar(e,t){$(".noticmn").html(e).removeClass("hp sd").addClass(t);$(".uninotificwr").parent().show().end().show()}function shw(e,t,n,r){$(".dat").html(t);if(n=="signupform"){$("#"+n).find(".warn").fadeIn("slow").removeClass(" gr").addClass(r).css("top","210px")}$("#"+n).find(".warn").fadeIn("slow").removeClass(" gr").addClass(r);setTimeout(function(){$(".warn").fadeOut(1e3)},15500)}function shw1(e,t,n,r){$(".dat").html(t);if(n=="signupform"){var i=$("#signup_password").offset();$("#"+n).find(".warn").fadeIn("slow").removeClass(" gr").addClass(r).css("top",i.top-128)}else{var i=$("#login_password").offset();$("#"+n).find(".warn").fadeIn("slow").removeClass(" gr").addClass(r).css("top",i.top-128)}}function addSign(e,t){$("#"+t).parent().find(".wrnn").length?$("#"+t).siblings(".wrnn").show():$(".wrnn").clone(true).html(""+e).insertAfter($("#"+t)).show()}function setMsg(e){var t="<ul>",n=$("#"+e).val(),r=$("#"+e).parents(".dtwrp").attr("id");if($("#"+e).attr("name")==="email"){if(n.indexOf("@")>=0){if(n.indexOf("@")==0||n.substring(n.length-1)=="@")t=t+"<li>Check the position of @ in Email Field.</li>";if(n.indexOf("@.")!=-1)t=t+"<li>You Forgot to write Domain in Email Field.</li>"}else{t=t+"<li>Your Forgot to type @ in Email Field.</li>"}if(n.indexOf(".")>=0){var i=n.indexOf("@");var s=n.lastIndexOf(".");if(s>i+2||s+2>=n.length){t=t+"<li>Check the position of Dot(.) in Email Field.</li>"}}else{t=t+"<li>Your Forgot to type Dot(.) in Email Field.</li>"}shw("good",t+"</ul>",r,"rd")}else{t=t+"<li>"+$("#"+e).siblings(".titl").text()+" Field Should have atleast 4 Characters</li>";shw1("good",t+"</ul>",r,"rd")}$("#loginform").find("#tringle_tip_warn").show();$("#signupform").find("#tringle_tip_warn").show()}function colorThem(){$(".outer,.outer1").each(function(){var e=$(this).find(".fy-rate").text(),t=parseFloat(e),n=colset(t);if(n=="#cdcdcd"){$(this).attr("title","not scored yet")}$(this).css({"background-color":n});if(t===0){$(this).find(".fy-rate").html("").addClass("dull not").attr("title","Feature Score Coming Soon");$(this).children(".left-cov,.right-cov").css({"background-color":"#CDC6C6"});$(this).css({"background-color":"#fff"})}if(t<=50){var r=100-2*t;$(this).find(".right-cov").animate({height:r+"%"})}else{var r=100-(t-50)*2;$(this).find(".right-cov").animate({height:"0%"}).promise().done(function(){$(this).siblings(".left-cov").animate({height:r+"%"})})}})}function colset(e){if(e<=20){return"#ff6666"}else if(e>20&&e<45){return"#ff9933"}else if(e>=45&&e<65){return"#fac832"}else if(e>=65&&e<80){return"#8ce939"}else if(e>=80){return"#4bd695"}else return"#cdcdcd"}function sethHeight(){var e=-1;$(".prods-list").find(".features").each(function(){var t=$(this).height();e=t>e?t:e});$(".prods-list").find(".features").each(function(){$(this).height(e)})}function getMaxHeight(){$(".prod-link").each(function(){var e=$(this).height();max=e>max?e:max});setHeight()}function setHeight(){$(".prod-link").each(function(){$(this).parent().height(max)})}function resizeDv(){vpw=$(window).width();vpw<1038?$(".bluhd,.newcat").width(1038):$(".bluhd,.newcat").css({width:"99.99%"})}function minCheck(){}function countCheck(){var e=$(".vis").size()-1,t=$(".compare-btn");return e}function disText(){var e=countCheck();e>=4?$("#brand-search11").attr("disabled","disabled"):$("#brand-search11").removeAttr("disabled")}function getCookie(e){var t,n,r,i=document.cookie.split(";");for(t=0;t<i.length;t++){n=i[t].substr(0,i[t].indexOf("="));r=i[t].substr(i[t].indexOf("=")+1);n=n.replace(/^\s+|\s+$/g,"");if(n==e){return unescape(r)}}}function setCookie(e,t){var n=new Date;n.setDate(n.getDate()+10);var r=escape(t)+"; expires="+n.toUTCString();document.cookie=e+"="+r+"; path=/";"name=value; path=/Main/"}function checkCookie(e){var t=getCookie(e);t!==null&&t!==""&&t!=undefined?null:t=setCookie(e,null)}function validateEmail(e){var t=new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i),n=t.test(e);if(!n)return false;else return true}function createCookie(e,t,n){if(n){var r=new Date;r.setTime(r.getTime()+n*24*60*60*1e3);var i="; expires="+r.toGMTString()}else var i="";document.cookie=escape(e)+"="+escape(t)+i+"; path=/"}function readCookie(e){var t=escape(e)+"=";var n=document.cookie.split(";");for(var r=0;r<n.length;r++){var i=n[r];while(i.charAt(0)==" ")i=i.substring(1,i.length);if(i.indexOf(t)==0)return unescape(i.substring(t.length,i.length))}return null}function eraseCookie(e){createCookie(e,"",-1)}window.idss="";window.ck="";window.max=0;window.xh=null;$(document).ready(function(){function c(e){cookie1=checkCookie("shortlisted"+e);cookie1=getCookie("shortlisted"+e);if(cookie1!="null"){var t=jQuery.parseJSON(cookie1),n=t.products.length,r=0,i=0,s=new Array;for(var o in t.products){var u=t.products[o].id,a=t.products[o].image,f=t.products[o].name;urll=t.products[o].url;$(".shortlised-prod1").clone(true).find(".short-thumb").attr("src",a).end().find(".title-price-wrap a").text(f).attr("name",u).attr("href",urll).end().addClass("shortlised-prod").removeClass("shortlised-prod1").attr("name",e).insertBefore($(".wrap1"));s[i]=u;$(".prod-details").find("[name='"+u+"']").addClass("on-shortlist").children('span:contains("Compare")').text("Comparing").addClass("smbtn").parent().addClass("crtt");$(".atcompare-short").find("[name='"+u+"']").addClass("on-shortlist").children('span:contains("Compare")').text("Comparing").addClass("smbtn").parent().addClass("crtt");i++}$("a.short-link").removeClass("on-shortlist");countCheck()}}var e=readCookie("emailref");var t=readCookie("emailrefpending");var n=readCookie("UID");if(e!=null&&e!=0){if(!(t==1||n!=null)){setTimeout(function(){setCoor("signup");setTimeout(function(){createCookie("emailrefpending",1,.5)},1e3)},2e4)}}var r="",i=0,s,o="",u=$("#brand-search11").val(),a=$(".shortlisted-head").children("p").text(),f="",l=$("#search-text").val();s={serviceUrl:bas+"autocomplete",minChars:1,deferRequestBy:200,noCache:false,gsss:1};$("#brand-search11").click(function(){o="";$(".shortlisted-wrap").find(".short-link").each(function(){o+=$(this).attr("name")+"_"});o=o.substring(0,o.length-1);if(o==""){f=bas+"autocomplete?cat="+ccc}else{f=bas+"autocomplete?cat="+ccc+"&notid="+o}f=f+"&shortlist";optionss={serviceUrl:f,minChars:2,deferRequestBy:200,noCache:false,gsss:2};$("#brand-search11").autocomplete(optionss)});if(page!="home"){sh="emp"}$("#search-text").autocomplete(s);$(".thumb-rating:contains('-')").addClass("csp notspc").html("").css({color:"#888"});$(".fy-rate").attr("title","");$(".shortlisted-wrap").slideUp(300);$(".list-unit .price-main").on("click",function(){var e=$(this).parent().siblings(".wrp-link").children("a").attr("href");window.location.href=e});$("#search-button").click(function(){var e=$("#search-text").val();if(e==""){alert("Enter keywords to search.");return false}var t=e.replace(/\W/g,"+");t=t.split(" ").join("+");var n=new String(bas+"search?query="+t);window.location.href=n;return false});$(window).scroll(function(){var e=$(this).scrollTop();e>100?$("#back-top").fadeIn():$("#back-top").fadeOut();if($(".newcat").length>0){e>$(".newcat").offset().top+30?$(".uninotificwr").css({position:"fixed",top:"0px"}):$(".uninotificwr").css({position:"relative"})}});$(".clnoti").on("click",function(){$(".uninotificwr").slideUp().parent().hide()});$("#back-top").click(function(){$("body,html").animate({scrollTop:0},500);return false});$("#loginform").submit(function(e){e.preventDefault();emailVal=$("#login_identity").val(),passVal=$("#login_password").val(),rememberVal=$("#login_remember_me").val();submit_data={email:emailVal,password:passVal,remember:$("#login_remember_me").is(":checked")?1:0};$(this).find(".lgin").hide().end().find(".lod").show();$.support.cors=true;$.ajax({url:bas+"authenticate/validate",type:"post",data:submit_data,success:function(e){res=jQuery.parseJSON(e);if(res.status=="success"){window.location.reload()}else{shw("bad",res.msg,"loginform","rd");$("#loginform").find("#tringle_tip_warn").hide();$("#loginform").find(".warn").css("top","180px");$("#error-span").show();$("#error-span").html(res.msg);$(".lod").hide();$(".lgin").show()}}})});$("#signupform").submit(function(e){e.preventDefault();var t=$("#signup_name").val(),n=$("#signup_email").val(),r=$("#signup_password").val(),i=r,s={name:t,email:n,password:r,confpassword:i};$(this).find(".adf").hide().end().find(".lod").show();$.support.cors=true;$.ajax({url:"/authenticate/create_member",type:"post",data:s,success:function(e){res=jQuery.parseJSON(e);if(res.status==="success"){window.location.reload()}else{$("#signupform").find(".lod").hide().end().find(".adf").show();$("#signupform").find("#tringle_tip_warn").hide();$("#signupform").find(".warn").css("top","180px");shw("bad",res.msg,"signupform","rd")}},error:function(){shw("bad","Something went wrong between us, check your internet connection and try again.","signupform","rd");$("#signupform").find(".lod").hide().end().find(".adf").show()}})});$("#forget_form").submit(function(e){e.preventDefault();shw("good","We have sent you a mail to reset password. Please check your Junk/Spam box also.","forget_form","rd");emailVal=$("#forget_email").val(),submit_data={email:emailVal};$(this).find(".adf").hide().end().find(".lod").show();$.support.cors=true;$.ajax({url:bas+"authenticate/forgot_password",type:"post",data:submit_data,success:function(e){res=jQuery.parseJSON(e);if(res.status==="success"){window.location.reload()}else{shw("bad",res.msg+".","forget_form","rd");$("#error-span").show();$("#error-span").html(res.msg);$("#forget_form").find(".lod").hide().end().find(".adf").show()}},error:function(){shw("bad","Something went wrong between us, check your internet connection and try again.","forget_form","rd");$("#forget_form").find(".lod").hide().end().find(".adf").show()}})});if(navigator.appName==="Microsoft Internet Explorer"){$(".height").remove();$(".orange").css({border:"1px solid transparent"});$(".image-container").each(function(){var e=$(this).height();var t=$(this).find(".prod-image").height();var n=(e-t)/2;$(this).find(".prod-image").css({"margin-top":n+"px"})})}$("body").on("mouseenter",".outer *",function(){var e=$(this).offset();$(".whydet").text("Feature Score is determined on the basis of various technical specifications of this product. This score is calculated out of 100. It is the quickest way to decide which product is better.").css({left:e.left-90+"px",top:e.top-75+"px"}).fadeIn("slow")}).on("mouseout",function(){$(".whydet").stop();$(".whydet").hide()});$("body").on("mouseenter",".fyinew *",function(){var e=$(this).offset();$(".whydet").text("FindYogi Index is a rating, out of 5, given to every product based on its price and features. FindYogi Index helps determine whether the current price is justified for a given product.").css({left:e.left-90+"px",top:e.top-75+"px"}).fadeIn("slow")}).on("mouseout",function(){$(".whydet").stop();$(".whydet").hide()});$(".inpt").on("keyup",function(e){if($(this).val().length>0){var t=false;if($(this).attr("name")==="email"){t=validateEmail($(this).val())}else if($(this).attr("name")==="name"){if($(this).val().length<4||/^[a-zA-Z0-9-._ ]*$/.test($(this).val())===false){window.vali;window.par=$(this).parents("form").attr("id");vali=$(this).val().length<4?"Name should have more than 3 characters":"Special Characters are not allowed in name field.";t=false}else{t=true}}else{$(this).val().length>3?t=true:t=false}if(t){$('input[type="submit"]').removeAttr("disabled");$(this).addClass("riht");$(this).siblings(".wrnn").hide();$(".warn").hide()}}});$(".inpt").blur(function(){if($(this).val().length>0){var e=false;if($(this).attr("name")==="email"){e=validateEmail($(this).val())}else if($(this).attr("name")==="name"){if($(this).val().length<4||/^[a-zA-Z0-9-._ ]*$/.test($(this).val())===false){window.vali;window.par=$(this).parents("form").attr("id");vali=$(this).val().length<4?"Name should have more than 3 characters":"Special Characters are not allowed in name field.";e=false}else{e=true}}else{$(this).val().length>3?e=true:e=false}if(e){$('input[type="submit"]').removeAttr("disabled");$(this).addClass("riht");$(this).siblings(".wrnn").hide();$(".warn").hide()}else{$('input[type="submit"]').attr("disabled","disabled");if($(this).val().length!=i){if($(this).is(".riht")){$(this).removeClass("riht")}if($(this).is(".inpt")){$(this).addClass("first")}addSign($(this).siblings(".titl").text(),$(this).attr("id"));if($(this).attr("name")==="name"){shw("bad",vali,par,"rd");var t=$("#signup_name").offset();$("#signupform").find(".warn").css("top",t.top-128)}else{setMsg($(this).attr("id"))}}i=$(this).val().length}}else{$(this).is(".riht")?$(this).removeClass("riht"):null;$(this).attr("class","inpt")}});$(".btnn").on("click",function(){setCoor("signup")});$(".btn").on("click",function(){setCoor("login")});$(".signups").on("click",function(){$(".login").fadeOut("fast");setCoor("signup")});$("body").on("click",".like",function(){disText()});$("body").on("click",".cross",function(){disText()});$("body").on("click",".anobtn",function(){setCoor("signup")});$("#und").on("click",function(){$(".lg").fadeOut("fast");setCoor("forget")});$(".signups1").on("click",function(){$(".signup").fadeOut("fast");setCoor("login")});$(".ccrs,.bak").on("click",function(){close()});$(".shortlisted-head").click(function(){$(".shortlisted-wrap").is(":visible")?$(".shortlisted-wrap").slideUp(300):$(".shortlisted-wrap").slideDown(300);countCheck()});$(".to-change-cat").on("click",function(e){e.stopImmediatePropagation();var t=$(this).text(),n=t.substring(0,t.indexOf("("));$(".shortlisted-wrap").children(".shortlised-prod").remove().end().siblings(".shortlisted-head").children(".shortlist_title").text(n+" to Compare");ccc=n;c(n);$(".settings").click();ck=n;page=="home"?sh=stnm[ck]:sh=stnm[ck]});$(".settings").toggle(function(e){e.stopImmediatePropagation();var t=["Mobiles","Laptops","Cameras","Tablets"],n,r=t.length;for(n=0;n<r;n++){var i=getCookie("shortlisted"+t[n]),s,o;s=$.parseJSON(decodeURIComponent(i))||0;o=s&&s.products.length||0;$(".to-change-cat:contains("+t[n]+")").text(t[n]+"("+o+")")}$(".categories").toggle();$(".shortlisted-wrap").slideDown(300);$(".settings").animate({height:210},30)},function(e){e.stopImmediatePropagation();$(".categories").toggle();$(".settings").animate({height:20},30)});$("#compare").click(function(){var e,t,n,r;if(page=="home"){e=new Array;e[0]="Mobiles";e[1]="Tablets";e[2]="Laptops";e[3]="Cameras";t=$(".shortlisted-wrap .shortlised-prod").attr("name");console.log(t);n=getCookie("shortlisted"+t);r=t+"/comparison?product_ids="}else{ck=ck==""?ctrf:ck;n=getCookie("shortlisted"+ck);r=ck.toLowerCase()+"/comparison?product_ids="}var i=new String(bas);if(n!="null"){var s=jQuery.parseJSON(n),o=s.products.length,u=0,a=ucnc;for(var f in s.products){hashid=+s.products[f].id+ +a;hashid=(+hashid).toString(16).toLowerCase();r+=hashid+"_"}r=r.substring(0,r.length-1);i=i+r;location.href=i}});$("body").on("click",".cart",function(){var e=$(this).parents(".buttons-wrap").siblings(".wrp-link").children("a").attr("href");window.location.href=e});resizeDv();window.onresize=function(e){resizeDv()};getMaxHeight();var h=readCookie("lgin");if(h!=1){setTimeout(function(){xh==="set"?null:noticebar("Thousands of people use FindYogi everyday to make great buying decisions,<span class='anobtn'> Join in</span> now.","hp")},3e3)}});window.___gcfg={lang:"en-US"};(function(){var e=document.createElement("script");e.type="text/javascript";e.async=true;e.src="https://apis.google.com/js/plusone.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})();!function(e,t,n){var r,i=e.getElementsByTagName(t)[0];if(!e.getElementById(n)){r=e.createElement(t);r.id=n;r.src="https://platform.twitter.com/widgets.js";i.parentNode.insertBefore(r,i)}}(document,"script","twitter-wjs")