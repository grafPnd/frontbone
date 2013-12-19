(function () {
    /*
     * init module
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
			console.log('init compiling');
            var
                full=true,
                i;
            for(i in Modules)
                if(!Modules[i]){
                    console.log('Init: asking '+i);
                    full=false;
                    j_window.trigger('ModuleGet',{entity:i,to:'init'});
                }
            if(full)
                getReady();
        },
        getReady=function(){
            var
                full=true,
                i;
            for(i in Modules)
                if(!Modules[i])
                    full=false;
            if(full)
                init();//module is ready
            else
                console.log('init: not ready because- ',Modules)
        },
        init=function(){//module initialisation
            console.log('Init module is started');
			j_window
                .trigger('ModuleInit',{to:'breadcrumbs'})
                .trigger('ModuleInit',{to:'news'})
                .trigger('ModuleInit',{to:'table'})
				.trigger('makePage');
        };
    $(function(){
		compile();
	});
    j_window.on('ModuleSet',function(a,b){
		if(b.to=='init'){
			console.log('Init: '+ b.entity+' received');
			Modules[b.entity]= b.data;
			getReady();
		}
    });
})();