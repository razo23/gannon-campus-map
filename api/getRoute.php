<?php

	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	$startLocation = urlencode($_GET['origin']);
	$endLocation = urlencode($_GET['dest']);
	$mode = $_GET['mode'];
	if($mode == "Car")
	{
		$mode = "driving";
	}
	if($mode == "Walk")
	{
		$mode = "walking";
	}
	$json = file_get_contents("https://maps.googleapis.com/maps/api/directions/json?origin=".$startLocation."&destination=".$endLocation."&mode=".$mode);
	
	echo ($json);
	
?>		