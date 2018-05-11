const centre = 200;

function startTime() {
	getCoordinates(centre - document.getElementById("second").getAttribute("y2"), "second");
	getCoordinates(centre - document.getElementById("minute").getAttribute("y2"), "minute");
	getCoordinates(centre - document.getElementById("hour").getAttribute("y2"), "hour");
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
	
	console.log("Date " + date.toString());
	console.log("Hours " + date.getHours().toString());
	console.log("Minutes " + date.getMinutes().toString());
	console.log("seconds " + date.getSeconds().toString());
	
	
	if (hand == "second") {
		var degsPastNoon = date.getSeconds() * degSecHand;
	} else if (hand == "minute") {
		var degsPastNoon =  date.getMinutes() * secPerMin * degMinHand + 
							date.getSeconds() * degMinHand;
	} else { //hand == "hour"
		var hours = date.getHours();
		if (hours > 12) { hours -= 12 }; 
		var degsPastNoon =  hours * secPerHour * degHourHand +
		                    date.getMinutes() * secPerMin * degHourHand + 
							date.getSeconds() * degHourHand;
	}
	
	if (degsPastNoon < 90) {
		var deg = 90 - degsPastNoon;
	} else { //degsPastNoon >= 90
	    var deg = 360 - degsPastNoon + 90;
	}
	
	console.log(hand + " degrees past noon: " + degsPastNoon.toString() + ", actual: " + deg.toString());
	
	/* Quadrant number, which trig functions are positive  
	 *                 90
	 *     II  (S)     |        I  (A)
	 *                 |
	 *                 |
     *         	       |    .(x,y)
     *		           |  /_
	 *                 | /  \
	 * 180_____________|/deg_\_____________0 (360)
	 *                 |
	 *                 |
	 *                 |
	 *     III (T)     |       IV  (C)
	 *                 |
	 *                270
	 *
	 * -need to find reference angle
	 * -need to know which quadrant has the "triangle"
	 *
	 * 
	 * r * cos(deg) = x from centre
	 * r * sin(deg) = y from centre
	 * 
	 * (centre is 200,200)
	 *
	 *
	 */
	
	//convert to radians for cos and sin functions
	var rad = deg * (Math.PI / 180);
	console.log("radians: " + rad.toString())
	
	if (deg <= 90) { //first
		var cos = Math.cos(rad);
		var sin = Math.sin(rad);
	} else if (deg <= 180) { //second
		var cos = -Math.cos(rad);
		var sin = Math.sin(rad);
	} else if (deg <= 270) { //third
		var cos = -Math.cos(rad);
		var sin = -Math.sin(rad);
	} else { //fourth
		var cos = Math.cos(rad);
		var sin = -Math.sin(rad);
	}
	var x = radius * cos + centre;
	var y = radius * sin + centre;			//coordinates need work (+ or - centre?)
	
	console.log("coords: x: " + x.toString() + " y:" + y.toString());
	
	document.getElementById(hand).setAttribute("x2", x.toString());
	document.getElementById(hand).setAttribute("y2", y.toString());
}