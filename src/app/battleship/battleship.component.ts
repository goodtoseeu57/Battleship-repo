    import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
    import { GridCell } from '../gridcell';


    @Component({
        selector: 'app-battleship',
        templateUrl: './battleship.component.html',
        styleUrls: ['./battleship.component.css']
    })
    export class BattleshipComponent implements OnInit {
        gridCell: Array<GridCell> = [];
        name: string;
        public hasBeenClicked: false;


        public typeOfMove: string;

        constructor() {
        }

        clickCounter = 0;
        clickLimit = 21;
        bestScore = 200;
        yourScore = 0;
        boardRows = [];

        ships = [
            {
                name: 'UK Navy Gunner',
                hasBeenSunk: false,
                cells: [
                    { value: 'G1', hasBeenHit: false },
                    { value: 'G2', hasBeenHit: false },
                    { value: 'G3', hasBeenHit: false },
                    { value: 'G4', hasBeenHit: false }
                ]
            },
            {
                name: 'Greek Navy Gunner',
                hasBeenSunk: false,
                cells: [
                    { value: 'C1', hasBeenHit: false },
                    { value: 'C2', hasBeenHit: false },
                    { value: 'C3', hasBeenHit: false },
                    { value: 'C4', hasBeenHit: false }
                ]
            },
            {
                name: 'UK Navy Gunner',
                hasBeenSunk: false,
                cells: [
                    { value: 'D1', hasBeenHit: false },
                    { value: 'D2', hasBeenHit: false },
                    { value: 'D3', hasBeenHit: false },
                    { value: 'D4', hasBeenHit: false }
                ]
            }
        ];

        letters = ['G', 'F', 'E', 'D', 'C', 'B', 'A'];
        numbers = [1, 2, 3, 4, 5, 6, 7];



        ngOnInit() {
            this.setupGrid();
            console.log(this.letters.reverse());
        }

        setupGrid() {

            this.letters.forEach((letter) => {
                let lettersArray = [];
                this.numbers.forEach((number) => {
                    let gridcell = new GridCell();
                    gridcell.name = letter + number;
                    gridcell.typeOfMove = 'Try-me';
                    gridcell.hasBeenClicked = false;
                    lettersArray.push(gridcell);

                });
                this.boardRows.push(lettersArray);
            });
            console.log(this.boardRows);
        }

        hitCell(cell) {

            this.clickCounter++;
            if (this.clickCounter < this.clickLimit) {
                let hasHit = false;

                this.ships.forEach((ship) => {
                    ship.cells.forEach((shipCell) => {
                        if (cell.name === shipCell.value) {
                            console.log(` Well done you hit this ${cell.name}`);
                            this.yourScore += 50;
                            hasHit = true;
                            shipCell.hasBeenHit = true;
                            cell.typeOfMove = 'hit';
                            cell.hasBeenClicked = true;
                        }
                    });

                    const everyCellHit = ship.cells.every((shipCell) => shipCell.hasBeenHit);
                    if (everyCellHit) {
                        ship.hasBeenSunk = true;
                        console.log(`you win and you sunk the following ship ${ship.name}`);
                        if (this.clickCounter < 8) {
                            this.yourScore += 1000;
                        }
                        if (this.clickCounter > 8 && this.clickCounter < 9) {
                            this.yourScore += 800;
                        }
                    }


                });
                if (!hasHit) {
                    console.log('missed');
                    cell.hasBeenClicked = true;
                    this.yourScore -= 40;
                    cell.typeOfMove = 'miss';

                }
            } else {
                alert('your game has been end please refresh to start a new game');
            }

            if (this.yourScore > this.bestScore) {
                alert(`Well done Suvo boy you pass your best score , your new score now is ${this.yourScore} `);
                this.bestScore = this.yourScore;
                localStorage.bestScore = this.yourScore;
                console.log(localStorage);
            }
        }


    }


