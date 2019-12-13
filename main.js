// const word = new Word("lawnmower")
// const hangman = new Hangman()

// #region user input
function userGuessLetter() {
    let userInput = document.getElementById("letterGuess").value
    console.log("letter:", userInput)
    console.log((userInput.length === 1) && isalpha(userInput))

    if((userInput.length === 1) && isalpha(userInput)){
        let x = document.getElementById(userInput.toUpperCase())
        x.style.visibility = "visible"
        window.word.guess_letter(userInput, window.hangman)
        document.getElementById("word").innerHTML = window.word.string()
        document.getElementById("gallows").innerHTML = window.hangman.build_gallows()
    }else{
        let x = document.getElementById("userNotify")
        x.innerHTML = "Invalid input!"

        x.classList.add("shaker")
        x.addEventListener("animationend", () => x.classList.remove("shaker"))
    }
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
    for (var i = 0; i < x.length; i += 1){
        // console.log(i, x[i])
        x[i].style.display = "block"
    }

    window.word = new Word("lawnmower")
    window.hangman = new Hangman()
    document.getElementById("gallows").innerHTML = window.hangman.build_gallows()

    // word = new Word("lawnmower")
    console.log(window.word)
    document.getElementById("word").innerHTML = window.word.string()
}
// #endregion user iput

// #region functions
function isalnum(str){
    let AN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    for(char in str){
        if(AN.search(char.toUpperCase() == -1)){
            return false
        }
    }
    return true
}

function isalpha(str){
    let A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for(let char in str){
        if(!A.includes(str[char].toUpperCase())){
            return false
        }
    }
    return true
}

function isnum(str){
    let N = "1234567890"
    for(char in str){
        if(A.search(char.toUpperCase() == -1)){
            return false
        }
    }
    return true
}
// #endregion functions

// #region classes
class Hangman {
    constructor() {
        this.deathCounter = 0
        this._hdict = {
            "head": "()",
            "body": "||",
            "armLeft": "/",
            "armRight": "\\",
            "legLeft": "╱",
            "legRight": "╲",
            "foot": "_"
        }
    }

    build_gallows(){
        var h = `╔═══${(this.deathCounter > 0) ? '╤╤': '══'}═══╗
║   ${(this.deathCounter > 0) ? this._hdict['head']: (' '.repeat((this._hdict['head']).length))}   ║
║  ${(this.deathCounter > 2) ? this._hdict['armLeft']: (' '.repeat((this._hdict['armLeft']).length))}${(this.deathCounter > 1) ? this._hdict['body']: (' '.repeat((this._hdict['body']).length))}${(this.deathCounter > 3)? this._hdict['armRight']: (' '.repeat((this._hdict['armRight']).length))}  ║
║  ${(this.deathCounter > 5)? this._hdict['foot']: (' '.repeat(this._hdict['foot'].length))}${(this.deathCounter > 4)? this._hdict['legLeft']: (' '.repeat(this._hdict['legLeft'].length))}${(this.deathCounter > 6)? this._hdict['legRight']: (' '.repeat(this._hdict['legRight'].length))}${(this.deathCounter > 7)? this._hdict['foot']: (' '.repeat(this._hdict['foot'].length))}  ║
║        ║
╚════════╝`
        return h
    }

    hang(){
        this.deathCounter += 1
    }

    is_hung(){
        return this.deathCounter > 8? true: false
    }

}

class Letter{
    constructor(l){
        this.guessed = false
        this.char = l.toUpperCase()
    }

    letter_found(){
        this.guessed = true
    }
}

class Word{
    constructor(w){

        // define alphabet
        this._alphabet = new Object()
        const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        for(let i in ALPHABET){
            this._alphabet[ALPHABET[i]] = false
        }
        // debug
        console.log("alphabet:", this._alphabet)

        // define letters
        let lst = []
        for(let ltr in w){
            // debug
            // console.log(ltr, w[ltr])
            ltr = new Letter(w[ltr])
            lst.push(ltr)
        }
        this._letters = lst

        // debug
        // console.log(`Word created with value ${w}`)

        console.log(this.full())
    }

    // probably not gonna use this
    // word_colored(){
    //     s = ""
    //     for(i in this._letters){
    //         s += (i.guessed? "\x1b[32m": "\x1b[31m") + str(i.char) + " \x1b[0m"
    //     }
    //     return s
    // }

    string(){
        let s = ""
        for(let i in this._letters){
            // this is debug
            // console.log(i, i.guessed, i.char)
            s += (this._letters[i].guessed? (this._letters[i].char) + " ": "_ ")
        }
        console.log(s)
        return s
    }

    full(){
        let s = ""
        for (let i in this._letters){
            s += (this._letters[i].char)
        }
        return s
    }

    _letter_in_word(ltr){
        for (let i in this._letters){
            if (this._letters[i].char === ltr){
                return true
            }
        }
        return false
    }

    _check_letters(g, hungman){
        let _correct_guess = false
        for(let i in this._letters){
            if(this._letters[i].char === g){
                this._letters[i].letter_found()
                _correct_guess = true
            }
        }
        if(!_correct_guess){
            hungman.hang()
        }
    }

    guessed_letters(){
        s = ""
        for(let [key, value] of Object.entries(this._alphabet)){
            if(value && !(this._letter_in_word(key))){
                s += key + " "
            }
        }
        return `Guessed letters: ${s}`
    }

    guess_letter(g, hungman){
        const guess = g.toUpperCase()
        console.log(this._alphabet[guess])
        if(this._alphabet[guess] === false){
            this._alphabet[guess] = true
        }else{
            // gotta fix this
            // console.log("Letter has already been guessed!")
            return
        }
        this._check_letters(guess, hungman)
    }

    guessed(){
        for(let i in this._letters){
            if(this._letters[i].guessed === false){
                return false
            }
        }
        return true
    }

    guess_word(wg){
        if(this._letters.length == wg.length){
            for(i in wg.length){
                if(this._letters[i].char == wg[i]){
                    continue
                }else{
                    return false
                }
            }
            for(i in this._letters){
                i.guessed = true
            }
            return true
        }else{
            return false
        }
    }
}
// #endregion classes