<?php

	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

	$serverName = "localhost";
	$userName = "gumapcom_paladin";
	$pwd = "SuddenStrike";

	$conn = new mysqli($serverName, $userName, $pwd);

	if($conn -> connect_error)
	{
		die("Connection Failed: " . $conn->connect_error);
	}
	$conn->select_db("gumapcom_db_campus");
	$sql = "SELECT * FROM tbl_building ORDER BY tbl_name";

	$result = $conn->query($sql);

	$response = array();
	if($result->num_rows > 0)
	{
		while($row = mysqli_fetch_array($result))
		{
			array_push($response, $row);
		}
	}
	
	echo json_encode($response);
	
?>