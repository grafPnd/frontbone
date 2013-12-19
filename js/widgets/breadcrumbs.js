(function (){
    /*
     * module of breadcrumbs block
     * gets core
     * returns nothing
     * exchanges data by triggers
     * */
    'use strict';
    var
		j_window=$(window),
        Modules={
            core:null
        },
        compile=function(){//asking for modules data for current module
		console.log('breadcrumbs compiling');
            var
                full=true,
                i;
            for(i in Modules)
                if(!Modules[i]){
                    console.log('Breadcrumbs: asking '+i);
                    full=false;
                    j_window.trigger('ModuleGet',{entity:i,to:'breadcrumbs'});
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
        },
        init=function(){//module initialisation
            console.log('Breadcrumbs module is started');
            //...
        };
    j_window
	.on('ModuleSet',function(a,b){
            if(b.to=='breadcrumbs'){
                console.log('InitTable: '+ b.entity+' received');
                Modules[b.entity]= b.data;
                getReady();
            }
        })
    .on('ModuleInit',function(a,b){
            if(b.to=='breadcrumbs')
                compile();
        })
    .on('DataResponse',function(a,b){
            if(b.type=='breadcrumbAdd'){
			//...
            }
        });
})();