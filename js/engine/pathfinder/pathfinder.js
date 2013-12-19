(function(){
    /*
     * pathfinder module //база путей к файлам
     * gets nothing
     * returns pathfinder object
     * */
    'use strict';
    var
		j_window=$(window),
        Pathfinder={
            tpl_routing:function(){
			return{
				layout:'pages/layout.tpl',
				header:'blocks/header.tpl',
				footer:'blocks/footer.tpl'
				};
			},	
		css_routing:function(){
			return{
				global:'css/w3c/global/global.css',
				staticStyles:'css/w3c/global/static.css'
				};
			},
		js_routing:function(){
			return {
				lang_ru:'js/lib/localisation/ru.js',
				lang_en:'js/lib/localisation/en.js',
				main_page:'js/widgets/main_page.js'
				};
			}
        };
    j_window.on('ModuleGet',function(a,b){
        if(b.entity=='pathfinder'){
            console.log('Pathfinder module is asked');
            j_window.trigger('ModuleSet',{entity:'pathfinder',to: b.to,data:Pathfinder});
        }
    });
})();