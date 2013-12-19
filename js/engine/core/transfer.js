(function(){
    /*
     * module, that performs data transfer with server
     * gets core, serverRequest event
     * returns response back to module
     * */
    'use strict';
    var
		j_window=$(window),
        Modules={
            core:null
        },
        compile=function(){//asking for modules data for current module
            var
                full=true;
            console.log('transfer compiling');
            for(var i in Modules)
                if(!Modules[i]){
                    console.log('Transfer: asking '+i);
                    full=false;
                    j_window.trigger('ModuleGet',{entity:i,to:'transfer'});
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
                console.log('transfer: not ready because- ',Modules)
        },
        init=function(){//module initialisation
            console.log('Transfer module is started');

        },
        askServer=function(d){
            $.post('getAjaxData',{type:d.type,data: d.data}, function(data){
                j_window.trigger('DataResponse',{
                    type: d.type,
                    data:data,
                    to: d.to
                });
            });
        };
    j_window
	.on('ModuleSet',function(a,b){
			if(b.to=='transfer'){
				console.log('Transfer: '+ b.entity+' received');
				Modules[b.entity]= b.data;
				getReady();
			}
		})
	.on('ModuleInit',function(a,b){
			if(b.to=='transfer')
				compile();
		})
	.on('DataRequest',function(a,b){
			askServer(b);
		});
})();