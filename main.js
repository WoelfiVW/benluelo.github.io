// letter = document.getElementById("letter").addEventListener("submit", guesses = )

function userGuessLetter() {
    let userInput = document.getElementById("letter").value
    console.log("letter:", userInput)
}

function userGuessWord() {
    let userInput = document.getElementById("word").value
    console.log("word:", userInput)
}

function userRestart() {
    console.log("restarting")
}

function userGiveUp() {
    console.log("user gave up")
}