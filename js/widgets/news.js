(function(){
    /*
     * module of news block
     * gets core
     * returns nothing
     * */
    'use strict';
    var
		j_window=$(window),
        Modules={
            core:null
        },
        compile=function(){//asking for modules data for current module
            console.log('news compiling');
            var
                full=true;
            for(var i in Modules)
                if(!Modules[i]){
                    console.log('News: asking '+i);
                    full=false;
                    j_window.trigger('ModuleGet',{entity:i,to:'news'});
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
                init();//module is ready
            else
                console.log('news: not ready because- ',Modules)
        },
        init=function(){//module initialisation
            console.log('InitNews module is started');
            //... init  ui
        };
    j_window.on('ModuleSet',function(a,b){
		if(b.to=='news'){
			console.log('InitNews: '+ b.entity+' received');
			Modules[b.entity]= b.data;
			getReady();
		}
    })
    .on('ModuleInit',function(a,b){
		if(b.to=='news')
			compile();
    });
})();