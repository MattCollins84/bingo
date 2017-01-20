// original ticket string
const ticketString = "011722475204365360702637497481233455758302154058881928446789061241507324334876840738576186051132437816395663800818206590104559628214294664710935667287132130687703253151692742547985";

// card colours
const colours = ["green", "red", "blue", "orange", "purple", "yellow"];

// use .match() to split ticketString into array of 30 characters per element
// each element contains the numbers for a particular ticket
// map over the resulting array
// use .match() again to split chunk of 30 characters into array of 2 characters per element 
// each element is an individual number for a square
const numbers = ticketString.match(/[0-9]{30}/g)
								.map(t => t.match(/[0-9]{2}/g));

// Add a shuffle method to the Array prototype, taken from here:
// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/10142256#10142256
Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = this[i];
     this[i] = this[j];
     this[j] = temp;
  }
  return this;
}

// create our tickets
// - store them in an object
// - append them to the body

const tickets = {}
numbers.forEach((n, i) => {

	tickets[i] = new Ticket({
		numbers: n,
		colour: colours[i]
	})

	document.body.appendChild(tickets[i].ticket);

})

// generate an Array of 90 numbers (balls)
const balls = [];
for (var i = 1; i <= 90; i++) {
	balls.push(i);
}

// empty array of balls that have been drawn
const drawnBalls = [];

// draw balls one at a time
// ball will be drawn every 100ms
const drawInterval = setInterval(function() {

	// shuffle the balls ready for the draw
	// pop a ball from the end of the array
	let ball = balls.shuffle().pop();
	drawnBalls.push(ball);
	Object.keys(tickets).forEach(function(k) {
		
		// if we have a winner, stop drawing balls
		// put out a message showing we have a winner
		// refresh the page to start again!
		let winner = tickets[k].markNumber(ball);
		if (winner) {
			
			clearInterval(drawInterval);

			let winnerText = document.createElement("h1");
			winnerText.className = "winner"
			winnerText.innerText = "The " + tickets[k].colour + " ticket has won!";
			document.body.appendChild(winnerText);

			let drawOrder = document.createElement("p");
			drawOrder.innerHTML = drawnBalls.length + " balls were drawn in the following order:<br />" + drawnBalls.join(", ")
			document.body.appendChild(drawOrder);
			
		}

	})

}, 100)