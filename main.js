// letter = document.getElementById("letter").addEventListener("submit", guesses = )

function userGuessLetter() {
    let userInput = document.getElementById("letterGuess").value
    console.log("letter:", userInput)
}

function userGuessWord() {
    let userInput = document.getElementById("wordGuess").value
    console.log("word:", userInput)
}

function userRestart() {
    console.log("restarting")
    document.getElementById("start").style.display = "inline"
}

function userGiveUp() {
    console.log("user gave up")
}

function userStart() {
    document.getElementById("start").style.display = "none"

    let x = document.getElementsByClassName("init")
    for(let i in x){
        console.log(i, x[i])
        x[i].style.display = "inline"
    }

    const word = lawnmower
}