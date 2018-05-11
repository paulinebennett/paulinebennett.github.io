const centre = 200;

function startTime() {
	getCoordinates(centre - getElementById("second").getAttribute("y2"), "second");
	getCoordinates(centre - getElementById("minute").getAttribute("y2"), "minute");
	getCoordinates(centre - getElementById("hour").getAttribute("y2"), "hour");
}


function getCoordinates(radius, hand) {
	/* Degrees per second */
	const secPerMin = 60;
	const secPerHour = 3600;
	/* Degrees per second */
	const degSecHand = 360 / secPerMin;
	const degMinHand = 360 / secPerHour;
	const degHourHand = 360 / (secPerHour*12); 
	
	var date = new Date();
	
	if (hand == "second") {
		var degsPastNoon = date.getSeconds() * degSecHand;
	} else if (hand == "minute") {
		var degsPastNoon =  date.getMinutes() * secPerMin * degMinHand + 
							date.getSeconds() * degMinHand;
	} else { //hand == "hour"
		var degsPastNoon =  date.getHours() * secPerHour * degHourHand +
		                    date.getMinutes() * secPerMin * degHourHand + 
							date.getSeconds() * degHourHand;
	}
	
	if (degsPastNoon < 90) {
		var deg = 90 - degsPastNoon;
	} else { //degsPastNoon >= 90
	    var deg = 360 - (degsPastNoon - 90);
	}
	
	/*          .(x,y)
     *		|  /
	 *      | / <
	 * _____|/deg\__
	 *      |
	 *      |
	 *      |
	 *
	 * r * cos(deg) = x from centre
	 * r * sin(deg) = y from centre
	 * 
	 * (centre is 200,200)
	 */
	
	var x = radius * Math.cos(deg) + centre;
	var y = radius * Math.sin(deg) + centre;
	
	document.getElementById(hand).setAttribute("x2", x.toString());
	document.getElementById(hand).setAttribute("y2", y.toString());
}