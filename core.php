<?php
function getFiles($path){
	$result= array();
	if($handle=opendir($path));
	else
		return 'bad dir';
	while(false!==($file = readdir($handle)))
		{
		if($file=='..' || $file=='.');
		elseif(is_file($path.$file))
			{
			$r= array();
			$r[0]=substr($file, 0, strrpos($file,'.'));//а что делать, если такое имя уже есть
			$r[1]=$path.$file;
			array_push($result,$r);
			}
		elseif(is_dir($path.$file))
			$result=array_merge($result,getFiles($path.$file.'/'));
		}
		closedir($handle);
	return $result;
	}
	
function readf($path){
	$text='';
	$file = fopen($path, "r");
	while (!feof($file)) 
		$text.=fgetc($file);
	fclose($file);
	return $text;
	}
?>