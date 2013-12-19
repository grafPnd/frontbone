(function(){
    /*
     * dictionary module
     * gets nothing
     * returns localisation object
     * */
    'use strict';
    var
		j_window=$(window),
        Dictionary={
            rus:{
                read_more:'Читать дальше',
                show:'Показать'
            },
            eng:{
                read_more:'Read more',
                show:'Show'
            }
        }
    j_window.on('ModuleGet',function(a,b){
        if(b.entity=='dictionary'){
            console.log('Dictionary module is asked');
            j_window.trigger('ModuleSet',{entity:'dictionary',to: b.to,data:Dictionary});
        }
    });
})();
