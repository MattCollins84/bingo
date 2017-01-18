// Ticket Class
class Ticket {

	// set up our ticket
	constructor(opts) {
		
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

		for (let i = 1; i <= 27; i++) {
			
			// empty square object
			let square = {
				element: null,
				number: null,
				marked: false
			};

			// use modulus to detect which column we are in
			let mod = (i-1) % 9;

			// calculate the min/max values for each column
			// little hack for the last column
			let min = (mod * 10);
			let max = (mod * 10) + 9;
			if (max == 89) {
				max = 90
			}

			// capture the current number
			let number = parseInt(this.numbers[numberIndex]);

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

		}

	}

	// find any square on this ticket that has the provided number
	// if a match is found, mark this square
	// check to see if this ticket is a winner
	markNumber(number) {
		
		// find matching square
		let match = this.squares.filter(s => (s.number === number));

		// if we have a match, mark it
		if (match.length === 1) {
			match[0].marked = true;
			match[0].element.className = "square marked";
		}

		// check to see if this ticket is a winner
		let markedSquares = this.squares.filter(s => s.marked).length;

		if (markedSquares === 15) {
			this.winner = true;
		}

		// update the "to go" value
		this.togoCount.innerText = 15 - markedSquares;

		// return whether we have a winner or not
		return this.winner;

	}

}