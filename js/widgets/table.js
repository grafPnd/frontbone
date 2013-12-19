(function(){
    /*
     * module of table block
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
			console.log('tables compiling');
            var
                full=true;
            for(var i in Modules)
                if(!Modules[i]){
                    console.log('Table: asking '+i);
                    full=false;
                    j_window.trigger('ModuleGet',{entity:i,to:'table'});
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
        },
        init=function(){//module initialisation
            console.log('InitTable module is started');
			//...
        };
    j_window
		.on('ModuleSet',function(a,b){
            if(b.to=='table'){
                console.log('InitTable: '+ b.entity+' received');
                Modules[b.entity]= b.data;
                getReady();
            }
        })
		.on('ModuleInit',function(a,b){
            if(b.to=='table')
                compile();
        });
})();