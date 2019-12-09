// import os
// import colors
// import sys

// var readlineSync = require('readline-sync');
 
// // Wait for user's response.
// var userName = readlineSync.question('May I have your name? ');
// console.log('Hi ' + userName + '!');

const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

var while1 = true
var while2 = true

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
    for(char in str){
        if(A.search(char.toUpperCase() == -1)){
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
        var h = `
╔═══╤╤═══╗
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

    ishung(){
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
        // debug
        console.log(`Word created with value ${w}`)
        // define alphabet
        this._alphabet = {}
        for(alpha in "ABCDEFGHIJKLMNOPQRSTUVWXYZ"){
            this._alphabet[alpha] = false
        }
        console.log(this._alphabet)

        // define letters
        let lst = []
        for(ltr in range(len(w))){
            ltr = new Letter(w[ltr])
            lst.push(ltr)
        }
        this._letters = lst
    }

    word_colored(){
        s = ""
        for(i in this._letters){
            s += (i.guessed? "\x1b[32m": "\x1b[31m") + str(i.char) + " \x1b[0m"
        }
        return s
    }

    string(){
        var s = ""
        for(i in this._letters){
            // this is debug
            // console.log(i, i.guessed, i.char)
            s += (i.guessed? (i.char) + " ": "_ ")
        }
        return s
    }

    full(){
        s = ""
        for (i in this._letters){
            s += (str(i.char))
        }
        return s
    }

    _letter_in_word(ltr){
        for (i in this._letters){
            if (i.char == ltr){
                return true
            }
        }
        return false
    }

    _check_letters(g, hungman){
        _correct_guess = false
        for(i in this._letters){
            if(i.char == g){
                i.letter_found()
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
        if(this._alphabet[g] == false){
            this._alphabet[g] = true
        }else{
            // gotta fix this
            // console.log("Letter has already been guessed!")
            return
        }
        this._check_letters(g, hungman)
    }

    guessed(){
        for(i in this._letters){
            if(i.guessed == false){
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

// clear screen
// console.clear()tes

while(while1){
    
    // get word
    var word = new Word(value.toUpperCase().trim())

    // build hangman
    var hangman = new Hangman()

    // // clear screen
    // console.clear()

    while(while2){

        // clear screen
        console.clear()

        // draw game
        console.log(word)
        console.log(hangman.build_gallows())
        console.log(word.guessed_letters())

        // take guess input
        guess = ""
        while(guess.length != 1){
            guess = str(input("Enter a letter, or {1} for more options: ")).toUpperCase().trim()
            if(isalnum(guess)){
                if(isalpha(guess)){
                    if(guess.length != 1){
                        console.log("Guesses must be one letter!")
                    }
                    else{
                        word.guess_letter(guess, hangman)
                    }
                }else
                    if(guess == "1"){
                        sys.stdout.write("\x1b[2K\x1b[F\x1b[2K")
                        wordGuess = str(input("Enter the word: ")).toUpperCase().trim()
                        if(word.guess_word(wordGuess)){
                            break
                        }else{
                            hangman.hang()
                            inp = input("Incorrect! Enter anything to continue.")
                        }
                    }
        }

        if(hangman.ishung()){
            inp = input(`You lose! The word was ${word.full()}. Press {Enter} to play again, or enter any character to quit.`)
            console.clear()
            while2 = (len(inp) == 0)? true: false
            while1 = (len(inp) == 0)? true: false
            delete word
            delete hangman
            delete inp
            break
        }elif(word.guessed())
            inp = input(`You win! The word was ${word.full()}. Press {Enter} to play again, or enter any character to quit.`)
            console.clear()
            while2 = (len(inp) == 0)? true: false
            while1 = (len(inp) == 0)? true: false
            delete word
            delete hangman
            delete inp
            break
        }
    }
}

module.exports = {
    Word,
    Letter,
    Hangman,
    isnum,
    isalpha,
    isalnum,
    
}