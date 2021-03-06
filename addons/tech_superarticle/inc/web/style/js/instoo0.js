$.browser = {};
$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase()) || /trident/.test(navigator.userAgent.toLowerCase()) ;
if( $.browser.msie ) {
	alert("请使用谷歌浏览器,或者使用360/搜狗/猎豹等浏览器webkit内核的极速模式");
}
rs_callbacks.loginSucess = function(request){
	if(request.success){
		publishController.close_dialog();
		$('#login_errorinfo').hide();
		if(sso.form){
			$(sso.form).trigger("submit");
			sso.form=null;
		}
		if(sso.callback){
			sso.callback.apply(sso.callback,sso.callback_args);
		}
		reloadStyleOperate();
		$('#login-menus').removeClass('hidden');
		$('#login-links').remove();
		$('#login-user-name').html(request.userinfo.username);
			
		if(request.userinfo && request.userinfo.session_flash){
			request.success += request.userinfo.session_flash;
		}
	}
	else{
	};
}
$('#btn-favor-color').click(function(){
		var colors = $('#custom-color-text').css('backgroundColor');//.val();
		var color_array = [];
		color_array[0] = colors;
		var hasfavor = false;		
		$('#favor-colors li').each(function(){
			if($.inArray($(this).css('backgroundColor'),color_array) == -1 ) {
				colors += ';'+$(this).css('backgroundColor');
			}
			else{
				hasfavor = true;
			}
			
		});
		if( hasfavor == false ) {			
				$('#favor-colors').prepend('<li class="color-swatch" style="background-color:'+ $('#custom-color-text').val() +' ;"><i title="删除" class="fa fa-remove"></i></li>');		
		}
		else{
			alert('此颜色已收藏');
		}
	});
	$(document).on('click','#favor-colors .fa-remove',function(e){
		
		e.preventDefault();e.stopPropagation();
		
		$(this).parent().remove();
		var colors = '';
		$('#favor-colors li').each(function(){
			colors += $(this).css('backgroundColor')+';';
		});
		//setFavorColor(colors);
		return false;
	});


function reloadStyleOperate(){
	$('#style-operate-area').append('<div style="position:absolute; background: rgba(255,255,255,0.7);width: 100%;line-height: 65px;text-align: center" title="若自动刷新失败，请按"F5"手动刷新"><img src="'+ BASEURL +'/img/ajax/wheel_throbber.gif"> 正在加载数据...</div>').load('/beautify_editor #style-operate-area',function(){
		$('.editor-template-list').mixItUp({
	    	layout:{display:'block'},
	    	callbacks:{}
	    });
		$('.popover-trigger').popover({trigger:"hover"});
		$('#btn-help').popover();
		$('#editor-type-pop').popover({
		  trigger: 'hover'
		});
	});
}
$(function(){
	setTimeout(function(){
		$('#qrcode-pannel').fadeOut();;
	},30000);	
	$('#style-categories .filter').click(function(){
		$('#insert-style-list').scrollTop(0); //切换分类时，回到顶部
	})
	$('#right-fix-tab > li > a').click(function(){
		
		var t = $(this).data('toggle');
		if($(t).hasClass('active')) {
			$(t).parent('.tab-content').hide();
			$(t).removeClass('active');
		}
		else{
			$('#color-choosen').removeClass('active');$('#features').removeClass('active');
			
			$(t).parent('.tab-content').show();
			$(t).addClass('active');
		}		
	})
	$(window).resize(function(){
		var win_height = $(window).height();
		$('#full-page').height(win_height-23);
		var area_height = win_height-100;
		if(area_height > 800){
			area_height = 800;
		}else{
			$('#full-page').addClass('small-height');
			area_height += 5;
		}
		if( $(window).width() < 1000 &&  win_height < 650 ) {
			if($('#color-choosen').hasClass('active')) {
				$('#right-fix-tab > li > a:first').trigger('click');
			}
		}
		else{
			if(!$('#color-choosen').hasClass('active')) {
				$('#color-choosen').parent('.tab-content').show();
				$('#right-fix-tab > li > a:first').trigger('click');
			}
		}
		$('#editor,.edui-editor-iframeholder').height(area_height-16);
		$('.item,.n1-1').height(area_height);
		$('.editor2').height(area_height);
	}).trigger('resize');
	$('.autonum').on('mousewheel', function(event) {
		if(event.deltaY < 0) { //向下滚动
			$(this).html( parseInt($(this).html()) - 1);
		}
		else{
			$(this).html( parseInt($(this).html()) + 1);
		}
	    return false;
	}).tooltip({'title':'上下滚动鼠标，可调整序号大小',container: 'body'});
	
	window.onbeforeunload = function(event){
		var html = getEditorHtml();
		if(html != ""){
			if( window.localStorage){
				localStorage._v3content = html;
			}
			if(isout=="true"){
			event.returnValue = "即将离开页面，是否确认编辑的内容已使用并废弃？";   
			}
		}
	}

	$('#html-more-popover').popover({trigger:"hover"}).on('shown.bs.popover', function () {
		var $this = $(this);
		$('#more-popover .popover-content').html($('#more-popover-content').html());
	})
	
	$('.editor-template-list').mixItUp({
    	layout:{display:'block'},
    	callbacks:{}
    });
	$('.popover-trigger').popover({trigger:"hover"});
	$('#btn-help').popover();
	$('#editor-type-pop').popover({
	  trigger: 'hover'
	});
	
	
});

/*=======*/

var less_parser = new less.Parser;
ZeroClipboard.config( { swfPath: "ueditor/third-party/zeroclipboard/ZeroClipboard.swf" } );
var client = new ZeroClipboard( $('.copy-editor-html') );
current_editor = UE.getEditor('editor');
current_editor.ready(function(){
	//current_editor.addListener('ready', resetHandler);
	setTimeout(function(){
			current_editor.execCommand( 'focus' );
			var editor_document = current_editor.selection.document;
			if( window.localStorage){ // 本地临时存储编辑器内容
				if(typeof window.localStorage._v3content != "undefined"){
					//alert(window.localStorage._v3content);
					if(isnew=="new"){
						setEditorHtml("");
					}else{
					    setEditorHtml(window.localStorage._v3content);
					}
					$(editor_document).find('.v3editor').each(function(){
						//$(this).removeAttr('style');
						$(this).css({'border':'0 none','padding':'0'});
					});
				}
				if(typeof window.localStorage._edit_msg_id != "undefined"){
					current_edit_msg_id = window.localStorage._edit_msg_id;
				}
				setInterval(function(){
					window.localStorage._v3content = getEditorHtml();
				},10000);			
			}
	},100);
    current_editor.addListener('contentChange', function () {
            $("#preview").html(current_editor.getContent());
			$("#previews").html(current_editor.getContent());
			$("#tbpreview").html(current_editor.getContent());
			$("#tbtb").html(current_editor.getContent());
			isout="true";
			//alert(current_editor.getContent());
        })
});

$(function(){
	$('.colorPicker').colorPicker({
	    customBG: '#222',
	    init: function(elm, colors) { 
	      elm.style.backgroundColor = elm.value;
	      elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
	    }
	});
	
	$(document).on('click','#flat-strip-shadow',function(){
		//var cobj=current_active_v3item;
		//var html=cobj.html();
		var html = getEditorHtml();
		var obj = $('<div>'+html+'</div>');
		obj.find('*').css('box-shadow','');
		var newHtml = obj.html();
		//alert();
		//cobj.setDealingHtml(newHtml);
		setEditorHtml(newHtml);
	});
	
	$(document).on('click','#flat-add-shadow',function(){
		var html = getEditorHtml();
		var obj = $('<div>'+html+'</div>');
		obj.find('*').each(function(){			
					if( $(this).css('background-color') == 'transparent' ||  $(this).css('background-color') == '' ){
					}
					else{
						$(this).css('box-shadow','rgba(205, 205, 205,0.9) 2px 3px 2px');
					}
		});
		obj.find('hr').each(function(){
			$(this).css('box-shadow','rgba(205, 205, 205,0.9) 1px 1px 2px');
		})
		var newHtml = obj.html();
		setEditorHtml(newHtml);
	});	
	
	
	$(document).on('click','#set-image-radius',function(){
		var html = getDealingHtml();	
		var obj = $('<div>'+html+'</div>');
		obj.find('img').css('border-radius','50%');
		setDealingHtml(obj.html())
		obj = null;
	});
	$(document).on('click','#set-image-border',function(){
		var html = getDealingHtml();	
		var obj = $('<div>'+html+'</div>');
		obj.find('img').css({"background-color":"#fff","border-radius":"4px","max-width":"100%","padding":"4px","border":"1px solid #ddd"});
		setDealingHtml(obj.html())
		obj = null;
	})
	
	$(document).on('click','#flat-add-radius',function(){
		var html = getDealingHtml();	
		var obj = $('<div>'+html+'</div>');
		obj.find('*').each(function(){
			if( $(this).css('background-color') != 'transparent' &&  $(this).css('background-color') != '' ){
				$(this).css('border-radius','4px');
			}			
		});
		setDealingHtml(obj.html())
		obj = null;
	});
	
	$(document).on('click','#flat-strip-radius',function(){
		var html = getDealingHtml();	
		var obj = $('<div>'+html+'</div>');
		obj.find('*').css('border-radius','');
		setDealingHtml(obj.html())
		obj = null;
	});
	
	$(document).on('click','#flat-add-border',function(){
		var html = getDealingHtml();	
		var obj = $('<div>'+html+'</div>');
		obj.find('*').each(function(){
			if( $(this).css('background-color') != 'transparent' &&  $(this).css('background-color') != '' ){
				$(this).css('border','1px solid #efefef');
			}			
		});
		//obj.find('.v3editor').css('border','1px solid #efefef');
		setDealingHtml(obj.html())
		obj = null;
	});
	$(document).on('click','#flat-strip-border',function(){
		var html = getDealingHtml();	
		var obj = $('<div>'+html+'</div>');
		
		obj.find('*').each(function(){
				$(this).css('border','');
				$(this).css('border-width','0');
		});
		
		setDealingHtml(obj.html())
		obj = null;
	})

	$(document).on('click','#insert-style-list .ui-portlet-list > li',function(){
		
		if($(this).hasClass('ignore')){
			return false;
		}
		
		var ret = false;
		var num = parseInt($(this).find('.autonum:first').text());
		
		if(typeof num != "undefined") {
			$(this).find('.autonum:first').find('.autonum:first').text(num+1);
		}
		
		var id = $(this).data('id');
		
		
		$(this).contents().filter(function() {
			return this.nodeType === 3 && $.trim($(this).text()) == "";
		}).remove();
		$(this).find('p').each(function(){
			if($.trim($(this).html())=="&nbsp;") {
				$(this).html('<br/>');
			}
		});
		$(this).find('*').each(function(){
			if($(this).attr('data-width')) {
				return;
			}
		
			if( this.style.width && this.style.width != "" ) {
				$(this).attr('data-width',this.style.width);
			}
		});
		var style_item = $(this).find('.v3editor:first');
		if(style_item.size()){
			// insertHtml( $(this).html() + "<p>&nbsp;</p>"); 包含收藏夹的删除按钮等 
			ret = insertHtml("<section data-id=\""+id+"\" class=\"v3editor\">" + style_item.html() + "</section><p><br/></p>"); 
		}
		else{ //最外围包装v3editor容器
			ret = insertHtml("<section data-id=\""+id+"\" class=\"v3editor\">" + $(this).html() + "</section><p><br/></p>"); 
		}
		
		if(ret){			
			if(typeof num != "undefined") {
				$(this).find('.autonum:first').text(num+1);
			}
			//style_click($(this).data('id')); //统计使用该样式的次数
		}
		
	});
		$(document).on('click','#v3-random-transform',function(){
		var editor_document = current_editor.selection.document;
		var deg = parseInt(Math.random()*8);
		var f = Math.random()*10 > 5 ? '+' : '-';
		$(editor_document).find('.v3editor').each(function(i){
			if((i+1)%3 == 0) {
				deg = parseInt(Math.random()*8);
				f = Math.random()*10 > 5 ? '+' : '-';
			}
			$(this).css('transform','rotate('+f+deg+'deg)').css('-webkit-transform','rotate('+f+deg+'deg)');
		});
	});
$(document).on('click','#v3-random-color',function(){
		var html = getDealingHtml();	
		var obj = $('<div>'+html+'</div>');
		var bgcolors = ['#5BB75B','#2E8BCC','#F09609','#E51400','#7B4F9D','#E671B8','#008641','#20608E','#FFC40D'];
		var rd = Math.floor(Math.random() * ( bgcolors.length));
		var used = [];
		var current_bgcolor = bgcolors[rd];
		var components = obj.find('.v3editor').each(function(i){
			if(i%random_color_step == 0){
				do
				{
					rd = Math.floor(Math.random() * ( bgcolors.length));
				}
				while(jQuery.inArray(rd,used) != -1);
				
				used[used.length] = rd;
				if( used.length == bgcolors.length ){
					used = [];
				}				
				
				current_bgcolor = bgcolors[rd];
			}
			$(this).html(parseHtml($(this).html(),current_bgcolor,current_select_color));
		});
		
		setDealingHtml(obj.html())
		obj = null;
	});
	$(document).on('click','#tpl-tab-content .template-cover,#tpl-tab-content .editor-style-content',function(){ //选中模板后设置编辑器的内容	
		var tid = $(this).data('id');
		var obj = $('#template-'+tid);
		
		obj.contents().filter(function() {
			return this.nodeType === 3 && $.trim($(this).text()) == "";
		}).remove();
		obj.find('p').each(function(){
			if($.trim($(this).html())=="&nbsp;") {
				$(this).html('<br/>');
			}
		});
		setEditorHtml(obj.html());
		var id = parseInt(obj.data('id'));
		if(id > 0){
			$('#template_id').val(id);
			$('#auto_cover_tpl').removeClass('hidden');
		}
		else{
			$('#template_id').val('');
			$('#auto_cover_tpl').addClass('hidden');
		}
		
		$('#template_name').val(obj.data('name'));
		$('#dialog-template-name').val(obj.data('name'));
	});
	
	$(document).on('click','.delete-msg',function(){
		var $this = $(this);
		var url = $(this).data('url');
		if(confirm('是否确认删除这条图文消息')) {
			ajaxAction(url,null,null,function(request){
				$this.parents('.article-msg:first').remove();
			});
		}
	})
	
	$(document).on('click','.article-msg a',function(e){
		e.stopPropagation();
	});
	
	$(document).on('click','.article-msg',function(){
		var id =  $(this).data('id');
		current_edit_msg_id = id;
		var url = BASEURL + '/wx_msgs/view/'+id+'.json?nolazy=1';
		ajaxAction(url,null,null,function(request){
			if(request.data){
				setEditorHtml(request.data.WxMsg.content);
			}
		});

	});
	

	$('.color-swatch').click(function(){
		$('.color-swatch').removeClass('active');
		$(this).addClass('active');
		var color = $(this).data('color'); //data-color为前景色，bgcolor为背景色，或者无背景文字的前景色
		var bgcolor = $(this).css('backgroundColor');
		$('#custom-color-text').val(bgcolor).css('backgroundColor',bgcolor);
		if(!color)  color = '#FFF';
		setBackgroundColor(bgcolor,color, true);
		if( ! current_active_v3item ) {
			$('.editor-template-list li > .v3editor').each(function(){
				parseObject($(this),bgcolor,color);
				$(this).attr('data-color',bgcolor);
			})
		}
	});
	
	$(document).on('click','#v3-random-color',function(){
		var html = getDealingHtml();	
		var obj = $('<div>'+html+'</div>');
		var bgcolors = ['#5BB75B','#2E8BCC','#F09609','#E51400','#7B4F9D','#E671B8','#008641','#20608E','#FFC40D'];
		
		var rd = Math.floor(Math.random() * ( bgcolors.length));
		var used = [];
		var current_bgcolor = bgcolors[rd];
		var components = obj.find('.v3editor').each(function(i){
			if(i%random_color_step == 0){
				do
				{
					rd = Math.floor(Math.random() * ( bgcolors.length));
				}
				while(jQuery.inArray(rd,used) != -1);
				
				used[used.length] = rd;
				if( used.length == bgcolors.length ){
					used = [];
				}				
				
				current_bgcolor = bgcolors[rd];
			}
			$(this).html(parseHtml($(this).html(),current_bgcolor,current_select_color));
		});
		
		setDealingHtml(obj.html())
		obj = null;
	});
	
	$(document).on('click','#tab-tpl-trigger',function(){
		if($('#editor-tpls-list').html()==""){
			$('#editor-tpls-list').html('正在加载').load('/editor_styles/myTemplates?suffix=-1 #tpl-tab-content',function(){
				$('#editor-tpls-list').find('.col-md-3').removeClass('col-md-3').addClass('col-md-6');
				$('#editor-tpls-navtab a:first').tab('show');				
			})
		}		
	});
	
	$('.clear-editor').click(function(){
		if(confirm('是否确认清空内容，清空后内容将无法恢复')){
			current_edit_msg_id = null;
			setEditorHtml("");
		}		
	});
	$('#html-see').click(function(){
		$('#saveModal').modal('show')
	});	
	$('#caiji11111').click(function(){
		$('#weixincaiji').modal('show')
	});			
	client.on( 'ready', function(event) {
		client.on( 'copy', function(event) {
			clean_v3helper();
	  		event.clipboardData.setData('text/html', getEditorHtml());
	  		event.clipboardData.setData('text/plain',getEditorHtml());
			$("#success").css("display","block");
            setTimeout(function(){$("#success").css("display","none")},500);
	  		//alert("已成功复制到剪切板");
			});
		});
	$('.copy-editor-htmls').click(function(){
		alert("注册用户才能复制编辑内容！");	
	});
});
function clean_v3helper(){
	var editor_document = current_editor.selection.document;
	$(editor_document).find('.v3editor').each(function(){
		$(this).removeAttr('style');
	});
}
	$('#my-tpl-trigger').click(function(){
		if($('#my-list').html()==""){
			$('#my-list').html('正在加载').load('wxstyle/mystyle.php #loader',function(){
				$('#style-my a:first').tab('show');	
			})
		}		
	})
	$('#pic-tpl-trigger').click(function(){
		if($('#pic-list').html()==""){
			$('#pic-list').html('正在加载').load('wxstyle/style.php?type=9 #loader',function(){
				$('#style-pic a:first').tab('show');	
			})
		}		
	})
	$('#backg-tpl-trigger').click(function(){
		if($('#backg-list').html()==""){
			$('#backg-list').html('正在加载').load('wxstyle/style.php?type=8 #loader',function(){
				$('#style-backg a:first').tab('show');	
			})
		}		
	})
	$('#scene-tpl-trigger').click(function(){
		if($('#scene-list').html()==""){
			$('#scene-list').html('正在加载').load('wxstyle/style.php?type=7 #loader',function(){
				$('#style-scene a:first').tab('show');	
			})
		}		
	})
	$('#yuanwen-tpl-trigger').click(function(){
		if($('#yuanwen-list').html()==""){
			$('#yuanwen-list').html('正在加载').load('wxstyle/style.php?type=6 #loader',function(){
				$('#style-yuanwen a:first').tab('show');	
			})
		}		
	})
	$('#img-tpl-trigger').click(function(){
		if($('#img-list').html()==""){
			$('#img-list').html('正在加载').load('wxstyle/style.php?type=5 #loader',function(){
				$('#style-img a:first').tab('show');	
			})
		}		
	})
	$('#hutui-tpl-trigger').click(function(){
		if($('#hutui-list').html()==""){
			$('#hutui-list').html('正在加载').load('wxstyle/style.php?type=4 #loader',function(){
				$('#style-hutui a:first').tab('show');	
			})
		}		
	})
	$('#body-tpl-trigger').click(function(){
		if($('#body-list').html()==""){
			$('#body-list').html('正在加载').load('wxstyle/style.php?type=3 #loader',function(){
				$('#style-body a:first').tab('show');	
			})
		}		
	})
	$('#title-tpl-trigger').click(function(){
		if($('#title-list').html()==""){
			$('#title-list').html('正在加载').load('wxstyle/style.php?type=2 #loader',function(){
				$('#style-title a:first').tab('show');	
			})
		}		
	})
		if($('#guanzhu-list').html()==""){
			$('#guanzhu-list').html('正在加载').load('wxstyle/style.php?type=1 #loader',function(){
				<!--$('#style-title-list').find('.col-md-4 mix').removeClass('col-md-4 mix').addClass('col-md-6');-->
				$('#style-guanzhu a:first').tab('show');	
			})
		}		
	$('#guanzhu-tpl-trigger').click(function(){
		if($('#guanzhu-list').html()==""){
			$('#guanzhu-list').html('正在加载').load('wxstyle/style.php?type=1 #loader',function(){
				<!--$('#style-title-list').find('.col-md-4 mix').removeClass('col-md-4 mix').addClass('col-md-6');-->
				$('#style-guanzhu a:first').tab('show');	
			})
		}		
	});

	$('#tab-tpl-trigger').click(function(){
		if($('#editor-tpls-list').html()==""){
			$('#editor-tpls-list').html('正在加载').load('wxstyle/moban.php #tpl-tab-content',function(){
				$('#editor-tpls-list').find('.col-md-3').removeClass('col-md-3').addClass('col-md-6');
				/*if( $('#favorite-tpl-list-1').find('.editor-style-content').size() ==0 ){
					$('#favorite-tpl-list-li').remove();
				}
				if( $('#personal-tpl-list-1').find('.editor-style-content').size() ==0 ){
					$('#personal-tpl-list-li').remove();
				}*/
				$('#editor-tpls-navtab a:first').tab('show');				
			})
		}		
	});
    $("#phone").on('click', function () {
         $("#myModal").modal(options)
    });
	$("#savebox").on('click', function () {
         $("#myModal").modal(options)
    });
	$("#tongbu").on('click', function () {
         $("#tongbumodal").modal(options)
    });
	$("#phones").on('click', function () {
        alert("高级VIP用户才能保存编辑，请进入微信管理--系统设置，自助开通付费用户，获得权限！");
    });
   	$('#reguser').on('click', function () {
		
	    $('#loginModal').modal('hide');
		$('#userregModal').modal('show')
       
   });
   	$('#closereg').on('click', function () {
		
	    $('#loginModal').modal('show');
		$('#userregModal').modal('hide')
       
   });
   	$('#mylogin').on('click', function () {
		 isout="false";
	     var username=document.getElementById("username").value;
		 var password=document.getElementById("password").value;
	     if(username=="")
	     {
		     alert("请输入用户名！")
		     return false;
	     }else if(password=="")
	     {
		     alert("请输入密码！")
		     return false;
	     }else{
		    isout="false";
			$('#form2').submit(); 
			 }
       
   });

$('#51weixincaiji').on('click', function () {
	     var caijiurl=document.getElementById("caijiurl").value;
	     if(caijiurl=="")
	     {
		     alert("请输入要采集的微信文章网址！")
		     return false;
	     }else{
		    isout="false";
			$('#form5').submit(); 
		}
       
   });
			//var reg = /^[^#%&*\/|:<>?\"]*$/; 
      	$('#myreguser').on('click', function () {
	     var regusername=document.getElementById("regusername").value;
		 var regpassword=document.getElementById("regpassword").value;
		 var reguseremail=document.getElementById("reguseremail").value;
         var patrn=/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;   
		 var re1 = new RegExp("^([u4E00-uFA29]|[uE7C7-uE7F3]|[a-zA-Z0-9])*$"); 
	     if(regusername=="")
	     {
		     alert("请输入用户名！");
		     return false
	     }else if(!re1.test(regusername)){
           alert("用户名不能为中文字符，请输入6-16位字母或数字的组合！");
          return false
         }else if((regusername.length<6)||(regusername.length>16)){
           alert("用户名字符数为6-16位字符哟！");
          return false
         }else if(patrn.test(regusername)){
		     alert("您输入的用户名含有@!$~等非法字符！");
		     return false;
		 }else if(regpassword==""){
		     alert("请输入密码！");
		     return false;
	     }else if((regpassword.length<6)||(regpassword.length>16))
         {
         alert("密码只能由6-16位字符组成");
          return false
         }
		 else if(reguseremail=="")
	     {
		     alert("请输入邮箱！");
		     return false
	     }else if(reguseremail.indexOf("@")<1 || reguseremail.indexOf(".")<2 || reguseremail.indexOf(".")<reguseremail.indexOf("@"))
	     {
		     alert("请输入正错的邮箱格式！");
		     return false
	     }		 
		 else if(!document.getElementById("yres").checked)
	     {
		     alert("勾选同意遵守中国法律及互联网法规！");
		     return false
	     }else{
		    isout="false";
			$('#form3').submit(); 
			 }
       
   });
	$('#savewx').on('click', function () {
		 isout="false";
	     var wxtitle=document.getElementById("wxtitle").value;
        document.getElementById('savecontent').value=document.getElementById("preview").innerHTML;
         var savecontent=document.getElementById('savecontent').value;
	     if(wxtitle=="")
	     {
		     alert("请输入微信标题！")
		     return false;
	     }
         if(savecontent==""){
		     alert("请输入微信内容！")
		     return false;
	     }else{
			$('#form1').submit(); 
			 }
       
   });
	$('#tongbuwx').on('click', function () {
		 isout="false";
	     var tbwxtitle=document.getElementById("tbwxtitle").value;
         document.getElementById('tbsavecontent').value=document.getElementById("tbpreview").innerHTML;
         var tbsavecontent=document.getElementById('tbsavecontent').value;
		 var tbwximgurl=document.getElementById("tbwximgurl").value;
		 var tbzhselect=document.getElementById("tbzhselect").value;
	     if(tbwxtitle=="")
	     {
		     alert("请输入微信标题！")
		     return false;
	     }
	     if(tbwximgurl=="")
	     {
		     alert("请选择导航图片！")
		     return false;
	     }
         if(tbsavecontent==""){
		     alert("请输入微信内容！")
		     return false;
	     }
		 if(tbzhselect==""){
		     alert("请选择需要同步的微信账号！")
		     return false;
		 }else{
			$("#tbsuccess").css("display","block");
			$('#form4').submit(); 
			 }
       
   });
