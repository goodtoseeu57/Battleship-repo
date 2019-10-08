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

    constructor() { }

    clickCounter = 0;
    clickLimit = 21;
    bestScore = 200;
    yourScore = 0;
    newBoardRows = [];
    newAgainBoardRows = [];
    // gridCell: GridCell[];







    boardRows = [
        [{ name: 'G1', hasBeenClicked: false, typeOfMove: 'Maybe-here' }, { name: 'G2', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'G3', hasBeenClicked: false, typeOfMove: 'Maybe-here' }, { name: 'G4', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'G5', hasBeenClicked: false, typeOfMove: 'Maybe-here' }, { name: 'G6', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'G7', hasBeenClicked: false, typeOfMove: 'Maybe-here' }],
        [{ name: 'F1', hasBeenClicked: false, typeOfMove: 'Maybe-here' }, { name: 'F2', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'F3', hasBeenClicked: false, typeOfMove: 'Maybe-here' }, { name: 'F4', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'F5', hasBeenClicked: false, typeOfMove: 'Maybe-here' }, { name: 'F6', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'F7', hasBeenClicked: false, typeOfMove: 'Maybe-here' }],
        [{ name: 'E1', hasBeenClicked: false, typeOfMove: 'Maybe-here' }, { name: 'E2', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'E4', hasBeenClicked: false, typeOfMove: 'Maybe-here' }, { name: 'E3', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'E5', hasBeenClicked: false, typeOfMove: 'Maybe-here' }, { name: 'E6', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'E7', hasBeenClicked: false, typeOfMove: 'Maybe-here' }],
        [{ name: 'D1', hasBeenClicked: false, typeOfMove: 'Maybe-here' }, { name: 'D2', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'D3', hasBeenclicked: false, typeOfMove: 'Maybe-here' }, { name: 'D4', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'D5', hasBeenClicked: false, typeOfMove: 'Maybe-here' }, { name: 'D6', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'D7', hasBeenClicked: false, typeOfMove: 'Maybe-here' }],
        [{ name: 'C1', hasBeenClicked: false, typeOfMove: 'Maybe-here' }, { name: 'C2', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'C3', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'C4', hasBeenClicked: false, typeOfMove: 'Maybe-here' }, { name: 'C5', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'C6', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'C7', hasBeenClicked: false, typeOfMove: 'Maybe-here' }],
        [{ name: 'B1', hasBeenClicked: false, typeOfMove: 'Maybe-here' }, { name: 'B2', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'B3', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'B4', hasBeenClicked: false, typeOfMove: 'Maybe-here' }, { name: 'B5', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'B6', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'B7', hasBeenClicked: false, typeOfMove: 'Maybe-here' }],
        [{ name: 'A1', hasBeenClicked: false, typeOfMove: 'Maybe-here' }, { name: 'A2', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'A3', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'A4', hasBeenClicked: false, typeOfMove: 'Maybe-here' }, { name: 'A5', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'A6', hasBeenClicked: false, typeOfMove: 'Maybe-here' },
        { name: 'A7', hasBeenClicked: false, typeOfMove: 'Maybe-here' }]
    ];



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

    letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    numbers = [1, 2, 3, 4, 5, 6, 7];



    ngOnInit() {
        this.setupGrid();


        console.log(typeof this.boardRows);
    }

    setupGrid() {

        this.letters.forEach((letter) => {
            let lettersArray = [];

            this.numbers.forEach((number) => {
                let gridcell = new GridCell();
                gridcell.name = letter + number;
                gridcell.typeOfMove = 'Maybe-here';
                gridcell.hasBeenClicked = false;
                this.newBoardRows.push(gridcell);
                lettersArray.push(gridcell);

            });
            console.log(lettersArray);
            this.newAgainBoardRows.push(lettersArray);





        });
        console.log(this.newBoardRows);
        console.log(typeof this.newBoardRows);
        console.log(this.boardRows);
        console.log(this.newAgainBoardRows);



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
                    if (this.clickCounter < 6) {
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
        }
    }





}


