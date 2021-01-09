let view = {
    displayMessage: function (msg) {
        let messageArea = document.getElementById('messageArea');
        messageArea.innerHTML = msg;
    },
    displayHit: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'hit');
    },
    displayMiss: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'miss');
    }
}

let controller = {
    guesses: 0,

    processGuess: function (guess) {

    }
}


function parseGuess(guess) {
    let alphabet = ["А", 'Б', "В", "Г", "Д", "Е", "Ж", "З", "И", "К"]
    if (guess === null || guess.length !== 2) {
        alert('введите правильную комбинацию буквы и числа')
    } else {
        firstChar = guess.charAt(0);
        let row = alphabet.indexOf(firstChar);
        let column = guess.charAt(1);
        if (isNaN(row) || isNaN(column)) {
            alert('Введите корректные данные');
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model) {
            alert('введите корректные данные');
        }

    }
}

let model = {
    boardSize: 9,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships: [
        {locations: ['10', '20', '30'], hits: ['', '', '']},
        {locations: ['32', '33', '34'], hits: ['', '', '']},
        {locations: ['63', '64', '65'], hits: ['', '', '']},
    ],


    fire: function (guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = 'hit';
                view.displayHit(guess);
                view.displayHit('Попадание!');
                if (this.isSunk(ship)) {
                    view.displayMessage('Корабль потоплен!')
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage('Промах :(')
        return false;
    },

    isSunk: function (ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        return true;
    }
}
