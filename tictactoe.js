
$(document).ready(function() {
	var ticTacToe = new TicTacToe();
	ticTacToe.generateTable();	
	ticTacToe.actions();	
	ticTacToe.updateScoreTable();
});

function TicTacToe()
{
	this.noOfSquares = 9;
	this.currentPlayer = 0;
	this.gamesPlayed = 0;
	this.player1wins = 0;
	this.player2wins = 0;

	this.combinations = {
		"1": [["2", "3"], ["4", "7"], ["5", "9"]],
		"2": [["1", "3"], ["5", "8"]],
		"3": [["1", "2"], ["6", "9"], ["5", "7"]],
		"4": [["1", "7"], ["5", "6"]],
		"5": [["1", "9"], ["2", "8"], ["3", "7"], ["4", "6"]],
		"6": [["4", "5"], ["3", "9"]],
		"7": [["1", "4"], ["3", "5"], ["8", "9"]],
		"8": [["2", "5"], ["7", "9"]],
		"9": [["1", "5"], ["3", "6"], ["7", "8"]]
	};	
}

TicTacToe.prototype.actions = function()
{
	var self = this;

	$('#tictactoe').delegate('div', 'click', function() {
		if (self.isFree($(this))) {
			var type = self.add($(this));
			$(this).append(type);	
			$(this).addClass('checked');
			self.check($(this));
		}
	});

	$('#playAgain').click(function() {
		self.resetGame();
	});

	$('#resetScores').click(function() {
		self.resetScores();
	});
}

TicTacToe.prototype.add = function(elem)
{
	var self  = this;
	var currentPlayer = (self.currentPlayer) ? '0' : 'X';
	var html = '<span>' + currentPlayer + '</span>';

	self.currentPlayer = !self.currentPlayer;
	$(elem).addClass(currentPlayer);

	return html;
}

TicTacToe.prototype.check = function(elem)
{
	var self = this;
	var position = $(elem).index() + 1;
	var combinations = self.combinations[position];

	$(combinations).each(function(index, value) {
		self.checkCombination(position, value);
	});
}

TicTacToe.prototype.checkCombination = function(position, combination)
{
	var self = this;
	var currentPlayer = !(self.currentPlayer) ? '0' : 'X';
	var totalMatches = 0;

	$(combination).each(function(index, value) {
		var elem = $('#tictactoe div:nth-child(' + value + ')');
		if ($(elem).hasClass(currentPlayer)) {
			totalMatches++;
		}

		if (totalMatches == 2) {
			self.gameEnded(position, combination);
			
			if (currentPlayer == 'X') {
				self.player1wins++;				
			} else {
				self.player2wins++;		
			}			

			self.disableBoard();
			self.updateScoreTable();
		}
	});
}

TicTacToe.prototype.disableBoard = function()
{
	var divs = $('#tictactoe div').not('.checked');
	$(divs).each(function() {
		$(this).addClass('checked');
	}); 
}

TicTacToe.prototype.gameEnded = function(position, combination)
{
	var self = this;

	$('#tictactoe div:nth-child(' + position + ')').addClass('endGame');
	$(combination).each(function(index, value) {
		$('#tictactoe div:nth-child(' + value + ')').addClass('endGame');
	});	
}

TicTacToe.prototype.generateTable = function() 
{
	var self = this;

	var square = '<div></div>';

	for (var i = 0; i < self.noOfSquares; i++) {
		$('#tictactoe').append(square);
	}
}

TicTacToe.prototype.isFree = function(elem)
{
	return !$(elem).hasClass('checked');
}

TicTacToe.prototype.resetGame = function()
{
	var self = this;

	self.currentPlayer = 0;
	$('#tictactoe').empty();
	self.generateTable();	
}

TicTacToe.prototype.resetScores = function()
{
	location.reload();	
}

TicTacToe.prototype.updateScoreTable = function(elem)
{
	var self = this;
	
	$('#player1wins').text(self.player1wins);
	$('#player2wins').text(self.player2wins);
	$('#player1loses').text(self.player2wins);
	$('#player2loses').text(self.player1wins);
}