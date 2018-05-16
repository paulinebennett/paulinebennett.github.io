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
	} 
	else if (hand == "minute") {
		var degsPastNoon =  date.getMinutes() * secPerMin * degMinHand + 
							date.getSeconds() * degMinHand;
	} 
	else { //hand == "hour"
		var hours = date.getHours();
		if (hours >= 12) { hours -= 12 }; 
		var degsPastNoon =  hours * secPerHour * degHourHand +
		                    date.getMinutes() * secPerMin * degHourHand + 
							date.getSeconds() * degHourHand;
	}
	
	if (degsPastNoon <= 90) {
		var deg = 90 - degsPastNoon;
	} else { //degsPastNoon > 90
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
	 * -note the difference in coordinates
	 *   (0,0).________     (-200,200).    
	 *        |                            |
	 *        |                       _____|_____
	 *        |                            |
	 *        |                            |
	 */
	
	//convert to radians for cos and sin functions
	//var rad = deg * (Math.PI / 180);
	//console.log("radians: " + rad.toString())
	
	if (deg < 90) { 12-3
		console.log("first");
	    var rad = deg * (Math.PI / 180);
		var cos = Math.cos(rad);
		var sin = Math.sin(rad);
		
		var x = radius * cos + centre;
	    var y = centre - radius * sin;
	}
	else if (deg < 180) { // 9- 12
		console.log("second");
	    var rad = (180 - deg) * (Math.PI / 180);
		var cos = -Math.cos(rad);
		var sin = Math.sin(rad);
		
		var x = radius * cos + centre;
	    var y = centre - radius * sin;
	}
	else if (deg < 270) { // 6-9
		console.log("third");
	    var rad = (270 - deg) * (Math.PI / 180);
		var cos = -Math.cos(rad);
		var sin = -Math.sin(rad);
		
		var x = radius * sin + centre;
		var y = centre - radius * cos;
	}
	else { // 3-6
	    console.log("fourth");
	    var rad = (360 - deg) * (Math.PI / 180);
		var cos = Math.cos(rad);
		var sin = -Math.sin(rad);
		
		var x = radius * cos + centre;
	    var y = centre - radius * sin;
	}
	
	console.log("coords: x: " + x.toString() + " y:" + y.toString());
	
	document.getElementById(hand).setAttribute("x2", x.toString());
	document.getElementById(hand).setAttribute("y2", y.toString());
}