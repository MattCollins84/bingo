// original ticket string
var ticketString = "011722475204365360702637497481233455758302154058881928446789061241507324334876840738576186051132437816395663800818206590104559628214294664710935667287132130687703253151692742547985";

// card colours
var colours = ["green", "red", "blue", "orange", "purple", "yellow"];

// use .match() to split ticketString into array of 30 characters per element
// map over the resulting array
// use .match() again to split chunk of 30 characters into array of 2 characters per element
var numbers = ticketString.match(/[0-9]{30}/g)
							.map(function(t) {
								return t.match(/[0-9]{2}/g)
							});

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

// Ticket object or "Class"
var Ticket = function(opts) {

	// capture the numbers for this ticket
	this.numbers = opts.numbers || [];
	this.winner = false;
	this.colour = opts.colour || "green"

	// ticket container
	this.ticket = document.createElement("div");
	this.ticket.className = "ticket " + this.colour;

	// to go box
	this.togo = document.createElement("div");
	this.togo.className = "to-go";

	// to go count
	this.togoCount = document.createElement("h1");
	this.togoCount.innerText = "15";

	// to go text
	this.togoText = document.createElement("h2");
	this.togoText.innerText = "TO GO";

	// append togo
	this.togo.appendChild(this.togoCount);
	this.togo.appendChild(this.togoText);
	this.ticket.appendChild(this.togo);

	// create 27 squares
	this.squares = [];
	var numberIndex = 0;

	for (var i = 1; i <= 27; i++) {
		
		// empty square object
		var square = {
			element: null,
			number: null,
			marked: false
		};

		// use modulus to detect which column we are in
		var mod = (i-1) % 9;

		// calculate the min/max values for each column
		// little hack for the last column
		var min = (mod * 10);
		var max = (mod * 10) + 9;
		if (max == 89) {
			max = 90
		}

		// capture the current number
		var number = parseInt(this.numbers[numberIndex]);

		// create the square
		square.element = document.createElement("div");
		square.element.className = "square";

		// does this number fit in this square?
		// if it does, increment the index
		// and add the number
		if (number >= min && number <= max) {
			square.element.innerText = number;
			square.number = number;
			numberIndex++;
		}
		
		// append the element to the ticket
		this.ticket.appendChild(square.element);
		
		// store the object for future reference
		this.squares.push(square);

		// find any square on this ticket that has the provided number
		// if a match is found, mark this square
		// check to see if this ticket is a winner
		this.markNumber = function(number) {
			
			// find matching square
			var match = this.squares.filter(function(s) {
				return s.number === number;
			});

			// if we have a match, mark it
			if (match.length === 1) {
				match[0].marked = true;
				match[0].element.className = "square marked";
			}

			// check to see if this ticket is a winner
			var markedSquares = this.squares.filter(function(s) {
				return s.marked;
			}).length;

			if (markedSquares === 15) {
				this.winner = true;
			}

			// update the "to go" value
			this.togoCount.innerText = 15 - markedSquares;

			// return whether we have a winner or not
			return this.winner;

		}.bind(this)

	}

}

// create our tickets
// - store them in an object
// - append them to the body
var tickets = {}
numbers.forEach(function(n, i) {

	tickets[i] = new Ticket({
		numbers: n,
		colour: colours[i]
	})

	document.body.appendChild(tickets[i].ticket);

})

// generate an Array of 90 numbers (balls)
// shuffle the balls ready for the first draw
var balls = [];
for (var i = 1; i <= 90; i++) {
	balls.push(i);
}

// empty array of balls that have been drawn
var drawnBalls = [];

// draw balls one at a time
// ball will be drawn every 100ms
var drawInterval = setInterval(function() {

	// shuffle the balls ready for the draw
	// pop a ball from the end of the array
	var ball = balls.shuffle().pop();
	drawnBalls.push(ball);
	Object.keys(tickets).forEach(function(k) {
		
		// if we have a winner, stop drawing balls
		// put out a message showing we have a winner
		// refresh the page to start again!
		var winner = tickets[k].markNumber(ball);
		if (winner) {
			
			clearInterval(drawInterval);

			var winnerText = document.createElement("h1");
			winnerText.className = "winner"
			winnerText.innerText = "The " + tickets[k].colour + " ticket has won!";
			document.body.appendChild(winnerText);

			var drawOrder = document.createElement("p");
			drawOrder.innerHTML = drawnBalls.length + " balls were drawn in the following order:<br />" + drawnBalls.join(", ")
			document.body.appendChild(drawOrder);
			
		}

	})

}, 100)