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
        return returnResultTextAsString(player2Selection, player1Selection) + "! Player 2 Wins!";
    }
}

function returnResultTextAsString(playerOneSelection, playerTwoSelection, beatText = " beats ") {
    return playerOneSelection + beatText + playerTwoSelection;
}

function sanitizePlayerInput(playerInput) {
    return capitalize(playerInput);
}


function testPlayRound(test1, test2) {
    console.log(playRound(test1, test2));
    console.log(refactorPlayRound(test1, test2));
    return playRound(test1, test2) == refactorPlayRound(test1, test2);

}

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

// UI Events

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', countUiRound);
    button.addEventListener('click', playUiRound);
});

//const rock = document.querySelector('#rock');
//rock.addEventListener('click', playUiRound);

let roundNr = 0;
function countUiRound(event) {
    roundNr++;
}

function playUiRound(event) {
    announceRoundWinner(playRound(event.target.id, computerPlay()));
}

let playerOneScore = 0;
let playerTwoScore = 0;
function announceRoundWinner(winner) {
    let winningPlayer = "";
    const resultContainer = document.querySelector('#resultContainer');
    if (score(winner) > 0) {
        playerOneScore++;
        winningPlayer = "Human";
    }
    if (score(winner) < 0) {
        playerTwoScore++;
        winningPlayer = "Computer";
    }
    const result = document.createElement('div');
    result.classList.add('result');
    result.textContent = winner + " #" + roundNr + " won by " + winningPlayer + " | Player One Score: " + playerOneScore + " Computer Score: " + playerTwoScore;

    if (playerOneScore >= 5) {alert("Human wins 5 Rounds!")}
    if (playerTwoScore >= 5) {alert("Computer wins 5 Rounds!")}

    resultContainer.appendChild(result);
}

function score(playedRound) {
    if (playedRound.slice(0, 4) == "Draw") {
        return 0;
    } else if (playedRound.substr(playedRound.length - 7, playedRound.length) == "2 Wins!") {
        return -1;
    } else {
        return 1;
    }
}
