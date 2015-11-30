 'use strict';

angular.module('myApp.map', ['ngRoute'])

.config(['$routeProvider', '$httpProvider', function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'map/map.html',
    controller: 'MapCtrl'
  });
}])

.controller('MapCtrl', ['$scope', '$http', '$modal', 'geolocation', function($scope, $http, $modal, geolocation) {

	$scope.buildings = [];
	$scope.option = {};
	$scope.infowindow = null;
	$scope.startWindow = null;
	$scope.endWindow = null;
	$scope.status = {};
	$scope.data = {};
	
    $scope.$on('mapInitialized', function (event, map) {
        $scope.objMapa = map;
		console.log(map);
		$scope.updateMarker();

    });
    $scope.buildingNames = [];


    $scope.$watch('keyword', function(newValue, oldValue)
    {
    	var key = newValue.toLowerCase();

    	console.log("new: " + newValue + " old:" + oldValue);

    	$scope.buildings = [];

    	for(var i = 0 ; i < $scope.origin_buildings.length; i++)
    	{
    		var name = $scope.origin_buildings[i].tbl_name.toLowerCase();

    		if(name.indexOf(key) > -1)
    		{
    			$scope.buildings.push($scope.origin_buildings[i]);
    		}
    	}
		
		$scope.option.lat = $scope.buildings[0].tbl_lat;
		$scope.option.lng = $scope.buildings[0].tbl_lng;
		$scope.option.zoom = 16;

    	$scope.status.admin = false;
    	$scope.status.acadmic = false;
    	$scope.status.service = false;
    	$scope.status.athletic = false;
    	$scope.status.residence = false;
    	$scope.status.landmarks = false;
    	$scope.status.stop = false;
    	$scope.status.parking = false;
    	$scope.status.emergency = false;
		
    });
	
	$scope.updateMarker = function()
	{
		console.log($scope.objMapa);
		if(!$scope.objMapa)
		{
			return;
		}
		if(!$scope.status.acadmic && !$scope.status.admin && !$scope.status.athletic && !$scope.status.landmarks && !$scope.status.residence && !$scope.status.service)
		{
			for(var marker in $scope.objMapa.markers)
			{
				$scope.map.markers[marker].setMap($scope.objMapa);
			}
			
		}
		
		if($scope.status.acadmic)
		{			
			for(var marker in $scope.objMapa.markers)
			{
				var building = $scope.getBuilding(marker);
				if(building.icon_name == "acadmic")
				{
					$scope.map.markers[marker].setMap($scope.objMapa);
				}
				else
				{
					$scope.map.markers[marker].setMap(null);
				}
			}
		}
		
		if($scope.status.admin)
		{			
			for(var marker in $scope.objMapa.markers)
			{
				var building = $scope.getBuilding(marker);
				if(building.icon_name == "admin")
				{
					$scope.map.markers[marker].setMap($scope.objMapa);
				}
				else
				{
					$scope.map.markers[marker].setMap(null);
				}
			}
		}
		
		if($scope.status.athletic)
		{			
			for(var marker in $scope.objMapa.markers)
			{
				var building = $scope.getBuilding(marker);
				if(building.icon_name == "athletic")
				{
					$scope.map.markers[marker].setMap($scope.objMapa);
				}
				else
				{
					$scope.map.markers[marker].setMap(null);
				}
			}
		}
		
		if($scope.status.landmarks)
		{			
			for(var marker in $scope.objMapa.markers)
			{
				var building = $scope.getBuilding(marker);
				if(building.icon_name == "landmark")
				{
					$scope.map.markers[marker].setMap($scope.objMapa);
				}
				else
				{
					$scope.map.markers[marker].setMap(null);
				}
			}
		}
		
		if($scope.status.residence)
		{			
			for(var marker in $scope.objMapa.markers)
			{
				var building = $scope.getBuilding(marker);
				if(building.icon_name == "residence")
				{
					$scope.map.markers[marker].setMap($scope.objMapa);
				}
				else
				{
					$scope.map.markers[marker].setMap(null);
				}
			}
		}
		
		if($scope.status.service)
		{			
			for(var marker in $scope.objMapa.markers)
			{
				var building = $scope.getBuilding(marker);
				if(building.icon_name == "service")
				{
					$scope.map.markers[marker].setMap($scope.objMapa);
				}
				else
				{
					$scope.map.markers[marker].setMap(null);
				}
			}
		}
		if($scope.status.stop)
		{			
			for(var marker in $scope.objMapa.markers)
			{
				var building = $scope.getBuilding(marker);
				if(building.icon_name == "stop")
				{
					$scope.map.markers[marker].setMap($scope.objMapa);
				}

			}
		}
		else
		{
			for(var marker in $scope.objMapa.markers)
			{
				var building = $scope.getBuilding(marker);
				if(building.icon_name == "stop")
				{
					$scope.map.markers[marker].setMap(null);
				}

			}
		}
		
		if($scope.status.parking)
		{			
			for(var marker in $scope.objMapa.markers)
			{
				var building = $scope.getBuilding(marker);
				if(building.icon_name == "parking")
				{
					$scope.map.markers[marker].setMap($scope.objMapa);
				}

			}
		}
		else
		{
			for(var marker in $scope.objMapa.markers)
			{
				var building = $scope.getBuilding(marker);
				if(building.icon_name == "parking")
				{
					$scope.map.markers[marker].setMap(null);
				}

			}			
		}
		if($scope.status.emergency)
		{			
			for(var marker in $scope.objMapa.markers)
			{
				var building = $scope.getBuilding(marker);
				if(building.icon_name == "emergency")
				{
					$scope.map.markers[marker].setMap($scope.objMapa);
				}

			}
		}
		else
		{
			for(var marker in $scope.objMapa.markers)
			{
				var building = $scope.getBuilding(marker);
				if(building.icon_name == "emergency")
				{
					$scope.map.markers[marker].setMap(null);
				}

			}			
		}

	}
	
	$scope.getBuilding = function(tbl_index)
	{
		for(var i = 0 ; i < $scope.buildings.length; i++)
		{
			if($scope.buildings[i].tbl_index == tbl_index)
			{
				return $scope.buildings[i];
			}
		}
	}
	$scope.$watch('status.acadmic', function()
	{
		$scope.updateMarker();
	});
	$scope.$watch('status.admin', function()
	{
		$scope.updateMarker();
	});
	$scope.$watch('status.athletic', function()
	{
		$scope.updateMarker();
	});
	$scope.$watch('status.landmarks', function()
	{
		$scope.updateMarker();
	});
	$scope.$watch('status.residence', function()
	{
		$scope.updateMarker();
	});
	$scope.$watch('status.service', function()
	{
		$scope.updateMarker();
	});
	$scope.$watch('status.stop', function()
	{
		$scope.updateMarker();
	});
	$scope.$watch('status.parking', function()
	{
		$scope.updateMarker();
	});
	$scope.$watch('status.emergency', function()
	{
		$scope.updateMarker();
	});

    $scope.onReset = function()
    {
    	$scope.keyword = '';
		if($scope.infowindow)
		{
			$scope.infowindow.close();
		}
		
		if($scope.startWindow)
		{
			$scope.startWindow.close();
		}
		
		if($scope.endWindow)
		{
			$scope.endWindow.close();
		}
		
		//$scope.option.mapType = "ROADMAP";
		$scope.objMapa.setMapTypeId(google.maps.MapTypeId.ROADMAP);
		$scope.zoomToIncludeMarkers();
		
    }
	
    $scope.zoomToIncludeMarkers = function() {
      var bounds = new google.maps.LatLngBounds();
      for (var marker in $scope.objMapa.markers) {
        bounds.extend(this.map.markers[marker].getPosition());
      }
      $scope.objMapa.fitBounds(bounds);
	  $scope.option.zoom = 16;
    };
	
    $scope.showInfoWindow = function (event, building) {
    	if($scope.infowindow != null)
    	{
    		$scope.infowindow.close();
    	}

    	$scope.infowindow = new google.maps.InfoWindow();
    	var center = new google.maps.LatLng(building.tbl_lat,building.tbl_lng);
		
		if(building.icon_name != "parking" && building.icon_name != "stop" && building.icon_name != "emergency")
		{			
			var departmentName = building.tbl_department.charAt(0).toUpperCase() + building.tbl_department.slice(1);
			$scope.infowindow.setContent(
			'<h3 style="color: red;">' + building.tbl_name + '</h3>' + 
			'<h5>' + departmentName + '</h5>' + 
			'<h5>' + building.tbl_addr + '</h5>');
		}
		else
		{
			$scope.infowindow.setContent(
			'<h3 style="color: red;">' + building.tbl_name + '</h3>');
		}
		
		$scope.infowindow.setPosition(center);
		$scope.infowindow.open($scope.objMapa);
    };
	
    $scope.showStartWindow = function (event, building) {
    	if($scope.startWindow != null)
    	{
    		$scope.startWindow.close();
    	}

    	$scope.startWindow = new google.maps.InfoWindow();
    	var center = new google.maps.LatLng(building.tbl_lat,building.tbl_lng);
		
		if(building.icon_name != "parking" && building.icon_name != "stop" && building.icon_name != "emergency")
		{			
			$scope.startWindow.setContent(
			'<h3>' + building.tbl_name + '</h3>' + 
			'<h5>' + building.tbl_department + '</h5>' + 
			'<h5>' + building.tbl_addr + '</h5>' + 
			'<h5> Building Number : ' + building.tbl_number + '</h5>' + 
			'<h5> Location : ' + building.tbl_lat + ',' + building.tbl_lng + '</h5>');
		}
		else
		{
			$scope.startWindow.setContent(
			'<h3>' + building.tbl_name + '</h3>' + 
			'<h5> Location : ' + building.tbl_lat + ',' + building.tbl_lng + '</h5>');
		}
		
		$scope.startWindow.setPosition(center);
		$scope.startWindow.open($scope.objMapa);
    };
    $scope.showStartPlaceWindow = function (event, building) {
    	if($scope.startWindow != null)
    	{
    		$scope.startWindow.close();
    	}

    	$scope.startWindow = new google.maps.InfoWindow();
    	var center = new google.maps.LatLng(building.tbl_lat,building.tbl_lng);
		
		
			$scope.startWindow.setContent(
			'<h3>' + building.tbl_name + '</h3>');

		
		$scope.startWindow.setPosition(center);
		$scope.startWindow.open($scope.objMapa);
    };

    $scope.showEndWindow = function (event, building, duration, distance) {
    	if($scope.endWindow != null)
    	{
    		$scope.endWindow.close();
    	}

    	$scope.endWindow = new google.maps.InfoWindow();
    	var center = new google.maps.LatLng(building.tbl_lat,building.tbl_lng);
		
		if(building.icon_name != "parking" && building.icon_name != "stop" && building.icon_name != "emergency")
		{			
			$scope.endWindow.setContent(
			'<h3>' + building.tbl_name + '</h3>' + 
			'<h5>' + building.tbl_department + '</h5>' + 
			'<h5>' + building.tbl_addr + '</h5>' + 
			'<h5> Building Number : ' + building.tbl_number + '</h5>' + 
			'<h5> Location : ' + building.tbl_lat + ',' + building.tbl_lng + '</h5>' + 
			'<h5> Duration: ' + duration + '</h5>' + 
			'<h5> Distance: ' + distance + '</h5>');
		}
		else
		{
			$scope.endWindow.setContent(
			'<h3>' + building.tbl_name + '</h3>' + 
			'<h5> Location : ' + building.tbl_lat + ',' + building.tbl_lng + '</h5>'+ 
			'<h5> Duration:' + duration + '</h5>');
		}
		
		$scope.endWindow.setPosition(center);
		$scope.endWindow.open($scope.objMapa);
    };
	
    $scope.showEndPlaceWindow = function (event, building, duration, distance) {
    	if($scope.endWindow != null)
    	{
    		$scope.endWindow.close();
    	}

    	$scope.endWindow = new google.maps.InfoWindow();
    	var center = new google.maps.LatLng(building.tbl_lat,building.tbl_lng);
		

			$scope.endWindow.setContent(
			'<h3>' + building.tbl_name + '</h3>' + 
			'<h5> Duration: ' + duration + '</h5>' + 
			'<h5> Distance: ' + distance + '</h5>');

		
		$scope.endWindow.setPosition(center);
		$scope.endWindow.open($scope.objMapa);
    };

	$scope.init = function()
	{
		$scope.option.lat = 42.128543;
		$scope.option.lng = -80.088571;
		$scope.option.zoom = 16;
		$scope.data.direction_mode = "Walk";
		console.log("Getting buildings");
		$http({
		  method: 'GET',
		  url: 'http://gu-map.com/api/getBuildings.php'
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
			$scope.data.show = false;
		    $scope.buildings = response.data;
		    $scope.origin_buildings = response.data;

		    $scope.buildingNames = [];
		    for(var i = 0; i < $scope.buildings.length; i++)
		    {
		    	if($scope.buildings[i].tbl_department == 'Administration')
		    	{		    		
		    		$scope.buildings[i].icon_name = "admin";
					$scope.buildingNames.push($scope.buildings[i].tbl_name);
		    	}
		    	if($scope.buildings[i].tbl_department == 'Student services')
		    	{		    		
		    		$scope.buildings[i].icon_name = "service";
					$scope.buildingNames.push($scope.buildings[i].tbl_name);
		    	}
		    	if($scope.buildings[i].tbl_department == 'Acadmic')
		    	{		    		
		    		$scope.buildings[i].icon_name = "acadmic";
					$scope.buildingNames.push($scope.buildings[i].tbl_name);
		    	}
		    	if($scope.buildings[i].tbl_department == 'Athletic Facilities')
		    	{		    		
		    		$scope.buildings[i].icon_name = "athletic";
					$scope.buildingNames.push($scope.buildings[i].tbl_name);
		    	}
		    	if($scope.buildings[i].tbl_department == 'Residence')
		    	{		    		
		    		$scope.buildings[i].icon_name = "residence";
					$scope.buildingNames.push($scope.buildings[i].tbl_name);
		    	}
		    	if($scope.buildings[i].tbl_department == 'Landmarks')
		    	{		    		
		    		$scope.buildings[i].icon_name = "landmark";
					$scope.buildingNames.push($scope.buildings[i].tbl_name);
		    	}
				if($scope.buildings[i].tbl_name == "Emergency Call Box")
				{
					$scope.buildings[i].icon_name = "emergency";
				}
				if($scope.buildings[i].tbl_name == "Knight Rider Shuttle Stop")
				{
					$scope.buildings[i].icon_name = "stop";
				}
				if($scope.buildings[i].tbl_name == "Parking")
				{
					$scope.buildings[i].icon_name = "parking";
				}
		    	
				
				$scope.updateMarker();
		    }
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });

	
    	$scope.status.admin = false;
    	$scope.status.acadmic = false;
    	$scope.status.service = false;
    	$scope.status.athletic = false;
    	$scope.status.residence = false;
    	$scope.status.landmarks = false;
    	$scope.status.stop = false;
    	$scope.status.parking = false;
    	$scope.status.emergency = false;
		$scope.data.show = false;
		
		$scope.updateMarker();
		
	}

	$scope.onNavigate = function(building)
	{	
		$scope.option.zoom = 17;
		$scope.option.lat = building.tbl_lat;
		$scope.option.lng = building.tbl_lng;

		$scope.showInfoWindow(null, building);
	}

	$scope.onChangeTab = function()
	{
		$scope.status.admin = false;
    	$scope.status.acadmic = false;
    	$scope.status.service = false;
    	$scope.status.athletic = false;
    	$scope.status.residence = false;
    	$scope.status.landmarks = false;
	}
	$scope.getDirection = function()
	{

		$scope.startBuilding = null;
		$scope.destBuilding = null;

			
			for(var i = 0; i < $scope.origin_buildings.length; i++)
			{
				if($scope.origin_buildings[i].tbl_name == $scope.data.startBuildingName)
				{
					$scope.startBuilding = $scope.origin_buildings[i];
					break;
				}
			}

			if($scope.startBuilding == null)
			{
				alert("Please validate start building");
				return;
			}
			$scope.startLocation = $scope.startBuilding.tbl_lat + ',' + $scope.startBuilding.tbl_lng;
		


			for(var i = 0; i < $scope.origin_buildings.length; i++)
			{
				if($scope.origin_buildings[i].tbl_name == $scope.data.destBuildingName)
				{
					$scope.destBuilding = $scope.origin_buildings[i];
					break;
				}
			}

			if($scope.destBuilding == null)
			{
				alert("Please validate destination building");
				return;
			}			
			$scope.destLocation = $scope.destBuilding.tbl_lat + ',' + $scope.destBuilding.tbl_lng ;



		if($scope.data.direction_mode == null)
		{			
			alert("Please validate travel mode");
			return;
		}
		
		if($scope.data.direction_mode == "Car")
		{
			$scope.data.strokeColor = "#ff0000";
		}
		else
		{
			$scope.data.strokeColor = "#000000";
		}
		$http({
			method:'GET',
			url:'http://gu-map.com/api/getRoute.php?origin=' + $scope.startLocation
				 + '&dest=' + $scope.destLocation
				+ '&mode=' + $scope.data.direction_mode})
		.then(
			function successCallback(response)
			{	
				$scope.data.show = true;
			console.log(response);
				if($scope.data.polyPath)
				{
					$scope.data.polyPath.setMap(null);
				}
				
				var path = [];
				  
				$scope.option.zoom = 19;
				
				$scope.data.route = "";
				console.log(response);
				if($scope.startBuilding)
				{
					path.push({lat: parseFloat($scope.startBuilding.tbl_lat), lng:parseFloat($scope.startBuilding.tbl_lng)});
				//	$scope.showStartWindow(null, $scope.startBuilding);
				}
				$scope.data.duration = response.data.routes[0].legs[0].duration.text;
				$scope.data.distance = response.data.routes[0].legs[0].distance.text;
				var start = response.data.routes[0].legs[0].start_location;
				path.push({lat: start.lat, lng: start.lng});
				
				for(var i = 0; i < response.data.routes[0].legs[0].steps.length; i++)
				{
					var node = response.data.routes[0].legs[0].steps[i].end_location;
					path.push({lat: node.lat, lng: node.lng});
					if(i == 0 && !$scope.startBuilding)
					{			
						var building = {};
						building.tbl_lat = node.lat;
						building.tbl_lng = node.lng;
						building.tbl_name = $scope.startLocation;
					//	$scope.showStartPlaceWindow(null, building);
					}
					
					if(i == response.data.routes[0].legs[0].steps.length - 1 && !$scope.destBuilding)
					{						
						var building = {};
						building.tbl_lat = node.lat;
						building.tbl_lng = node.lng;
						building.tbl_name = $scope.destLocation;
					//	$scope.showEndPlaceWindow(null, building, duration, distance);
					}
				}

				var end = response.data.routes[0].legs[0].end_location;
				
				path.push({lat: end.lat, lng: end.lng});

				if($scope.destBuilding)
				{					
					path.push({lat: parseFloat($scope.destBuilding.tbl_lat), lng: parseFloat($scope.destBuilding.tbl_lng)});
				//	$scope.showEndWindow(null, $scope.destBuilding, duration, distance);
				}

				console.log(path);

				  
				var lineSymbol = {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW};
				
				$scope.data.polyPath = new google.maps.Polyline({
					path: path,
					geodesic: true,
					strokeColor: $scope.data.strokeColor,
					strokeOpacity: 1.0,
					strokeWeight: 5,
					icons:[
					{
						icon: lineSymbol,
						offset: '100%'
					}
					]
				  });
				  $scope.data.polyPath.setMap($scope.objMapa);

				  $scope.option.zoom = 18;
				  $scope.option.lat = start.lat;
				$scope.option.lng = start.lng;

			},
			function errorCallback(response)
			{
				console.log(response);
			}
		);


	}

	$scope.clearMap = function()
	{
		if($scope.infowindow)
		{
			$scope.infowindow.close();
		}
		
		if($scope.startWindow)
		{
			$scope.startWindow.close();
		}
		
		if($scope.endWindow)
		{
			$scope.endWindow.close();
		}
		
		if($scope.data.polyPath)
		{
			$scope.data.polyPath.setMap(null);
		}
		$scope.data = {};
		
		
	}
	//https://maps.googleapis.com/maps/api/directions/json?origin=42.130521,-80.090921&destination=42.128155,-80.089462&mode=driving
}])
.directive('ngMapType', function()
{
		return function(scope, element, attrs)
		{
			scope.$watch(attrs.ngMapType, function(type)
			{
				element.attr("map-type-id", type);
			}
			)
		}
}
);