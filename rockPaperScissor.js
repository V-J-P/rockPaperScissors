function computerPlay() {
    let randomInt = getRandomInt(3);
    if (randomInt == 0) {
        return "Rock";
    } else if (randomInt == 1) {
        return "Paper";
    } else {
        return "Scissors";
    }
}


function playRound(playerSelection, computerSelection) {
    let player1Selection = capitalize(playerSelection);
    let player2Selection = capitalize(computerSelection);
    if (player1Selection == player2Selection) {
        return "Draw! " + player1Selection;
    } else if ((player1Selection == "Rock") && (player2Selection == "Scissors")) {
        return player1Selection + " beats " + player2Selection;
    } else if ((player1Selection == "Paper") && (player2Selection == "Rock")) {
        return player1Selection + " beats " + player2Selection;
    } else if ((player1Selection == "Scissors") && (player2Selection == "Paper")) {
        return player1Selection + " beats " + player2Selection;
    } else {
        return player2Selection + " beats " + player1Selection + "! Player 2 Wins!";
    }
}

function refactorPlayRound(player1Selection, player2Selection) {
    if (player1Selection == player2Selection) {
        return "Draw! " + player1Selection;
    } else if ((player1Selection == "Rock") && (player2Selection == "Scissors")) {
        return returnResultTextAsString(player1Selection, player2Selection);
    } else if ((player1Selection == "Paper") && (player2Selection == "Rock")) {
        return returnResultTextAsString(player1Selection, player2Selection);
    } else if ((player1Selection == "Scissors") && (player2Selection == "Paper")) {
        return returnResultTextAsString(player1Selection, player2Selection);
    } else {
        return returnResultTextAsString(player2Selection, player1Selection)+ "! Player 2 Wins!";
    }
}

function game() {
    let score = 0;
    for (i = 0; i < 5; i++) {
        let player = sanitizePlayerInput(prompt('Rock, Paper, Scissors'));
        let computer = computerPlay();
        console.log(refactorPlayRound(player, computer));
        score = score + evaluateWinner(refactorPlayRound(player, computer));
    }
    if (score > 0) {
        console.log("Player wins!");
    } else if (score < 0) {
        console.log("Computer wins!");
    } else {
        console.log("It\'s a draw!");
    }
}

function evaluateWinner(printingString) {
    if (printingString.slice(0, 3) == "Dra") {return 0;}
    else if (printingString.slice(-5) == "Wins!") {return -1;}
    return 1;
}

function returnResultTextAsString(playerOneSelection, playerTwoSelection, beatText = " beats ") {
    return playerOneSelection + beatText + playerTwoSelection;
}

function sanitizePlayerInput(playerInput) {
    return capitalize(playerInput);
}


function testPlayRound (test1, test2) {
    console.log(playRound(test1, test2));
    console.log(refactorPlayRound(test1, test2));
    return playRound(test1, test2) == refactorPlayRound(test1, test2);

}
game();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function capitalize(toBeCapitalized) {
    return firstLetterUppercase(toBeCapitalized) + allButFirstLowerCase(toBeCapitalized);
}
function firstLetterUppercase(toBeUpped) {
    let sliced = toBeUpped.slice(0, 1);
    return sliced.toUpperCase();
}
function allButFirstLowerCase(toBeDowned) {
    let substringed = toBeDowned.substr(1, toBeDowned.length - 1);
    return substringed.toLowerCase();
}
