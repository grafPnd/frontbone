(function(){
    /*
     * kit module
     * gets nothing
     * returns kit object
     * */
    'use strict';
    var
		j_window=$(window),
        Kit={
            tpls_base:function(name){//база имён tpl шаблоны можно ассайнить друг к другу, для этого просто указать новым объектом метод существующего объекта
				var 
					main=[//главная
						'layout',
						'header',
						'footer'
					];
				return eval(name);
			},
			css_base:function(name){//база имён css
				var 
					main=[//главная
						'global',
						'staticStyles'
					];
				return eval(name);
			},
			js_base:function(name){//база имён js скрипты можно ассайнить друг к другу, для этого просто указать новым объектом метод существующего объекта
				var 
					main=[//главная
						'main_page'
					];
				return eval(name);
			}
        };
    j_window.on('ModuleGet',function(a,b){
        if(b.entity=='kit'){
            console.log('Kit module is asked');
            j_window.trigger('ModuleSet',{entity:'kit',to: b.to,data:Kit});
        }
    });
})();