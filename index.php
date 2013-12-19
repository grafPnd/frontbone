<?php
require_once('core.php');
$lang='ru';//gets from base
if(isset($_REQUEST['compiled'])){//for returning JSON with css/js/tpl
	$tpl=(getFiles('./templates/'));
	$css=(getFiles('./css/w3c/'));
	$js_widgets=(getFiles('./js/widgets/'));

	for($i=0;$i<count($tpl);$i++)
		$tpl[$i][2]=readf($tpl[$i][1]);
		
	$compiled=array();	
	$compiled['tpl']=$tpl;
	$compiled['js']=$js_widgets;
	$compiled['css']=$css;
	echo json_encode($compiled);
}
else{
	$js_core_arr=(getFiles('./js/engine/'));
	for($j=0;$j<count($js_core_arr);$j++)
		$js_core.='<script id="j_js_'.$js_core_arr[$j][0].'" type="text/javascript">'.readf($js_core_arr[$j][1]).'</script>';
	echo'
	<!DOCTYPE html>
	<html>
		<head>
			<meta http-equiv="content-type" content="text/html;charset=UTF-8"/>
			<noscript>
				<meta http-equiv="Refresh" content="0; url=./nojs/"/>
			</noscript>
			'.$js_core.'<!--jquery must have been loaded first of all-->
			<script id="j_js_lang" type="text/javascript">
			/*
			 * current language module
			 * gets nothing
			 * returns current language value
			 */
            (function () {
                \'use strict\';
                $(window).on(\'ModuleGet\',function(a,b){
                    if(b.entity==\'lang\'){
                        console.log(\'Lang module is asked\');
                        $(window).trigger(\'ModuleSet\',{entity:\'lang\',to: b.to,data:\''.$lang.'\'});
                    }
                });
            })();
			</script>
			<script id="j_js_init" type="text/javascript" src="./js/init.js"></script>
			<!--[if IE]>
				<script type="text/javascript" src="./js/badbrowsers/html5.js"></script>
			<![endif]-->
			<!--[if IE 7]>
				<link rel="stylesheet" type="text/css" href="./css/ie/ie-7.css" media="all">
			<![endif]-->
			<!--[if IE 8]>
				<link rel="stylesheet" type="text/css" href="./css/ie/ie-8.css" media="all">
			<![endif]-->
			<!--[if IE 9]>
				<link rel="stylesheet" type="text/css" href="./css/ie/ie-9.css" media="all">
			<![endif]-->
			<title>тоесть тоесть вы что, пишете свой бекбон?</title>
		</head>
		<body>
			<div id="j_content"></div>
			<div id="j_tplHolder" class="s_hidden"></div>
		</body>
	</html>
	';
}
?>