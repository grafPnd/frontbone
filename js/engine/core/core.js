//TODO: с какого- то хера шаблоны по два раза подгружаются. проверить
(function(){
    /*
     * core module
     * gets data from dictionary, kit, pathfinder and lang modules
     * returns localisation object
     * */
    'use strict';
    var
		j_window=$(window),
        Modules={
            kit:null,
            pathfinder:null,
            dictionary:null,
            lang:null
        },
        to=null,
        Core={
            //================project functionality========
            locale:function(name){//returns localised word
                return Modules.dictionary[Modules.lang][name];
			},
			load:{ 
				tpl:function(name,path,sync,content,callback,c){//loads template 
					//createElement не используется, ибо в 8 ие в скрипт нельзя дописать innerHTML
					//script разбивается для того, чтобы его можно было вставить в нутрь тега скрипт и не вызвать конфликтов
					if(!content){
						$.post(path,function(data){
							document.getElementById('j_tplHolder').innerHTML+='<scr'+'ipt id="j_tpl_'+name+'" ty'+'pe="text/x-jquery-tmpl"'+'>'+data+'</scr'+'ipt'+'>';
							if(sync && callback)
								callback(c);
						});
						if(!sync && callback)
							callback(c);
					}
					else{
						document.getElementById('j_tplHolder').innerHTML+='<scr'+'ipt id="j_tpl_'+name+'" ty'+'pe="text/x-jquery-tmpl"'+'>'+content+'</scr'+'ipt'+'>'; 	
						if(callback)
							callback(c);
					}
				},
				js:function(name,path,sync,content,callback,c){//loads script
					var 
						file;
					if(content){
						document.getElementsByTagName("head")[0].innerHTML+='<scr'+'ipt id="j_js_'+name+'" ty'+'pe="text/javascript"'+'>'+content+'</scr'+'ipt'+'>'
						if(callback)
							callback(c);
					}
					else{
						file = document.createElement('script');
						file.setAttribute("id", 'j_js_'+name);
						file.setAttribute("type", "text/javascript");
						file.setAttribute("src", path);
						document.getElementsByTagName("head")[0].appendChild(file);
						if(sync){
							file.onload=function(){
								if(callback)
									callback(c);
							}
						}
						else{
							if(callback)
								callback(c);
						}
					}
				},
				css:function(name,path,sync,content,callback,c) {//loads style
					var 
						file;
					if(content){
						document.getElementsByTagName("head")[0].innerHTML+='<sty'+'le id="j_css_'+name+'"'+'>'+content+'</sty'+'le'+'>'
						if(callback)
							callback(c);
						}
					else{
						file = document.createElement("link");
						file.setAttribute("id", 'j_css_'+name);
						file.setAttribute("rel", "stylesheet");
						file.setAttribute("type", "text/css")
						file.setAttribute("href", path);
						document.getElementsByTagName("head")[0].appendChild(file);
						if(sync){
							file.onload=function(){
								if(callback)
									callback(c);
							}
						}
						else{
							if(callback)
								callback(c);
						}
					}
				}
			},
			kit:{
				css:function(name, sync, callback){//loads required styles for block
					var 
						deffered={},
						complete=function(name){
							var i;
							if (deffered[name] !== undefined)
								delete deffered[name];
							for(i in deffered)
								if(deffered[i])
									return;
							if(callback)
								callback();
						},
						collection = Modules.kit.css_base(name),
						cl=collection.length,c=0,
						route=Modules.pathfinder.css_routing();
					for (c;c<cl;c++)
						if(!document.getElementById('j_css_'+collection[c]))
							deffered[collection[c]]=true;
					for (c=0;c<cl;c++){
						if(!document.getElementById('j_css_'+collection[c]))
							Core.load.css(collection[c],route[collection[c]],sync,'',function(c){complete(collection[c]);},c);
					}
					complete();
					if(callback && !sync)
						callback();
					},
				tpl:function(name, sync, callback){//recursively loads all required templates for block
					var 
						deffered={},
						complete=function(name){
							var i;
							if (deffered[name] !== undefined)
								delete deffered[name];
							for(i in deffered)
								if(deffered[i])
									return;
							if(callback)
								callback();
						},
						collection = Modules.kit.tpls_base(name),
						cl=collection.length,c=0,
						route=Modules.pathfinder.tpl_routing();
					for (c;c<cl;c++)
						if(!document.getElementById('j_tpl_'+collection[c]) && collection[c])
							deffered[collection[c]]=true;
					for (c=0;c<cl;c++){
						if(!document.getElementById('j_tpl_'+collection[c]) && collection[c]){
							if (typeof(collection[c]) == 'object')
								Core.tpl(collection[c],sync);
							Core.load.tpl(collection[c], './templates/'+route[collection[c]],sync,'',function(c){complete(collection[c]);},c);
						}
					}
					complete();
					if(callback && !sync){
						callback();
						}
					},	
				js:function(name, sync, callback){//рекурсивно подгружаем скрипт или набор и все связанные с ним скрипты и наборы по его имени
					var 
						deffered={},
						complete=function(name){
							var i;
							if (deffered[name] !== undefined)
								delete deffered[name];
							for(i in deffered)
								if(deffered[i])
									return;
							if(callback)
								callback();
						},
						collection = Modules.kit.js_base(name), 
						cl=collection.length,c=0,
						route=Modules.pathfinder.js_routing();
					for (c;c<cl;c++)
						if(!document.getElementById('j_js_'+collection[c]))
							deffered[collection[c]]=true;
					for (c=0;c<cl;c++){
						if(!document.getElementById('j_js_'+collection[c])){
							if (typeof(collection[c]) == 'object')//рекурсивно подгружаем связанные скрипты и коллекции
								Core.js(collection[c], sync);
							Core.load.js(collection[c], route[collection[c]], sync,'',function(c){complete(collection[c]);},c);
						}
					}
					complete();
					if(callback && !sync)
						callback();
				}
			},
			//================common functionality========
			compare:function(a,b){//full checking for equal between two DOM collections (arrays)
				if(!a || !b)
					return false;
				if(!a.length || !b.length)
					return false;
				var
					i= 0,
					l= a.length;
				if(l<1 || l!= b.length)
					return false;
				for(i;i<l;i++)
					if(a[i]!=b[i])
						return false;
				return true;
			},
			inside:function(a,b){//returns true if element is in DOM collection (in array)
				if(!b)
					return false;
				if(!b.length)
					return false;
				var
					i= 0,
					l= b.length;
				if(l<1)
					return false;
				for(i;i<l;i++)
					if(a==b[i])
						return true;
				return false;
			},
			//================ui functionality========
			loaderShow:function(){
				$('#j_loader').removeClass('s_hidden');
			},
			loaderHide:function(){
				$('#j_loader').addClass('s_hidden');
			},
			getLoaderImg:function(){
				return'<div class="r_loaderImg"></div>';
			},
			//================screen functionality========
			offsetPosition:function(el) {
				var offsetLeft = 0, offsetTop = 0;
				do {
					offsetLeft += el.offsetLeft;
					offsetTop  += el.offsetTop;
				} while (el = el.offsetParent);
				return {left:offsetLeft, top:offsetTop};
			},
			screenSize:function () {
				var
					w, h;
				w = (window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.offsetWidth));
				h = (window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight));
				return {width:w, height:h};
			},
			mousePosition:function(ie) {
				return ie ? function(doc, body) {
					return function(e) {
						return {x: e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0), y: e.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0)};
					};
				}(document.documentElement, document.body) : function(e) {
					return {x: e.pageX, y: e.pageY};
				}
			}
		},
        compile=function(){//asking for other modules data for current module
		console.log('core compiling');
            var
                full=true;
            for(var i in Modules)
                if(!Modules[i]){
                    console.log('Core: asking '+i);
                    full=false;
                    j_window.trigger('ModuleGet',{entity:i,to:'core'});
                }
            if(full)
                getReady();
        },
        getReady=function(){
            var
                full=true;
            for(var i in Modules)
                if(!Modules[i])
                    full=false;
            if(full)
                j_window.trigger('ModuleSet',{entity:'core',to:to,data:Core});//if core is completed- it returns
        };
		
		j_window
		.on('loadKit',function(e,a){//подгрузка набора скриптов/стилей/шаблонов
			Core.kit[a.type](a.kit);
		})
		.on('makePage',function(){//создание обновлённой страницы
			store.clear();//lock when need to get data from store
			var 
				alias = window.location.pathname.split('/'),
				t=0,tMax,
				c=0,cMax,
				j=0,jMax,
				masterKit,pageData = {};
				
			 if(store.enabled){
				 if(store.get('masterKit'))
					masterKit=store.get('masterKit');
				 else{
					 masterKit=JSON.parse($.ajax({url:'./index.php?compiled', async:false}).responseText);
					 store.set('masterKit',masterKit);
					}
				} 
			 else 
				masterKit=JSON.parse($.ajax({url:'./index.php?compiled', async:false}).responseText)

			tMax=masterKit.tpl.length;
			cMax=masterKit.css.length;
			jMax=masterKit.js.length;
				
			for(t;t<tMax;t++)
				Core.load.tpl(masterKit.tpl[t][0],masterKit.tpl[t][1],masterKit.tpl[t][2]);//name,path,sync,content,callback
			for(c;c<cMax;c++)
				Core.load.css(masterKit.css[c][0],masterKit.css[c][1]);//name,path,sync,content,callback
			for(j;j<jMax;j++)
				Core.load.js(masterKit.js[j][0],masterKit.js[j][1]);//name,path,sync,content,callback

			pageData.alias = 'main';
			
			// for (var al in pagesAliases()) //если запрашиваемый алиас есть в роутинге
				// if (pagesAliases()[al] == alias)
					// pageData.alias = alias;
					
			//догружаем виджеты просмотра страницы
			Core.kit.css(pageData.alias, true, function(){
			console.log('kit css ready');
				Core.kit.tpl(pageData.alias, true, function(){
				console.log('kit tpl ready');
					Core.kit.js(pageData.alias, true, function(){
					console.log('kit js ready');
						$('#j_content')
							.append($('#j_tpl_layout').tmpl(pageData))
							.removeClass('s_hidden');
						$('#j_loader').addClass('s_hidden');
					});
				})
			});
		})	
	.on('ModuleSet',function(a,b){
		if(b.to=='core'){
			console.log('Core: '+ b.entity+' received');
			Modules[b.entity]= b.data;
			getReady();
		}
	})
	.on('ModuleGet',function(a,b){//listening if somebody needs core functionality
		if(b.entity=='core'){
			console.log('Core module is asked by '+ b.to);
			to= b.to;
			compile();
		}
	});
})();