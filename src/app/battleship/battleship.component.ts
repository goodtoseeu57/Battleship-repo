import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import {isLineBreak} from 'codelyzer/angular/sourceMappingVisitor';


@Component({
  selector: 'app-battleship',
  templateUrl: './battleship.component.html',
  styleUrls: ['./battleship.component.css']
})
export class BattleshipComponent implements OnInit {

  clickCounter = 0;
  clickLimit = 21;
  bestScore = 200;
  yourScore = 0;
  boardRows = [
    [{ name: 'G1', hasBeenClicked: false }, { name: 'G2', hasBeenClicked: false },
    { name: 'G3', hasBeenClicked: false }, { name: 'G4', hasBeenClicked: false },
    { name: 'G5', hasBeenClicked: false }, { name: 'G6', hasBeenClicked: false },
    { name: 'G7', hasBeenClicked: false }],
    [{ name: 'F1', hasBeenClicked: false }, { name: 'F2', hasBeenClicked: false },
    { name: 'F3', hasBeenClicked: false }, { name: 'F4', hasBeenClicked: false },
    { name: 'F5', hasBeenClicked: false }, { name: 'F6', hasBeenClicked: false },
    { name: 'F7', hasBeenClicked: false }],
    [{ name: 'E1', hasBeenClicked: false }, { name: 'E2', hasBeenClicked: false },
    { name: 'E4', hasBeenClicked: false }, { name: 'E3', hasBeenClicked: false },
    { name: 'E5', hasBeenClicked: false }, { name: 'E6', hasBeenClicked: false }, { name: 'E7', hasBeenClicked: false }],
    [{ name: 'D1', hasBeenClicked: false }, { name: 'D2', hasBeenClicked: false },
    { name: 'D3', hasBeenClicked: false }, { name: 'D4', hasBeenClicked: false },
    { name: 'D5', hasBeenClicked: false }, { name: 'D6', hasBeenClicked: false }, { name: 'D7', hasBeenClicked: false }],
    [{ name: 'C1', hasBeenClicked: false }, { name: 'C2', hasBeenClicked: false }, { name: 'C3', hasBeenClicked: false },
    { name: 'C4', hasBeenClicked: false }, { name: 'C5', hasBeenClicked: false }, { name: 'C6', hasBeenClicked: false },
    { name: 'C7', hasBeenClicked: false }],
    [{ name: 'B1', hasBeenClicked: false }, { name: 'B2', hasBeenClicked: false }, { name: 'B3', hasBeenClicked: false },
    { name: 'B4', hasBeenClicked: false }, { name: 'B5', hasBeenClicked: false }, { name: 'B6', hasBeenClicked: false },
    { name: 'B7', hasBeenClicked: false }],
    [{ name: 'A1', hasBeenClicked: false }, { name: 'A2', hasBeenClicked: false }, { name: 'A3', hasBeenClicked: false },
    { name: 'A4', hasBeenClicked: false }, { name: 'A5', hasBeenClicked: false }, { name: 'A6', hasBeenClicked: false },
    { name: 'A7', hasBeenClicked: false }]
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

  constructor() {}

  ngOnInit() {}

  hitCell(cell) {

    this.clickCounter++;

    if (this.clickCounter < this.clickLimit)  {

      // Check if the user has reached the click limit     if() {}
      let hasHit = false;

      this.ships.forEach((ship) => {
        ship.cells.forEach((shipCell) => {
          if (cell.name === shipCell.value) {
            console.log(` Well done you hit this ${cell.name}`);
            // console.log('hi');
            this.yourScore += 50;
            hasHit = true;
            shipCell.hasBeenHit = true;
            cell.hasBeenClicked = true;
          }
        });

        const everyCellHit = ship.cells.every((shipCell) => shipCell.hasBeenHit);
        if (everyCellHit) {
          ship.hasBeenSunk = true;
          console.log(`you win and you sunk the following ship ${ship.name}`);
          if (this.clickCounter < 6) {
          this.yourScore += 5000;
          }
          if (this.clickCounter > 6 && this.clickCounter < 7) {
            this.clickCounter += 3000;
          }
        }


      });
      if (!hasHit) {
        console.log('missed');
        cell.hasBeenClicked = true;
        this.yourScore -= 40;

      }
    } else {
      alert('your game has been end please refresh to start a new game');
    }

    if (this.yourScore > this.bestScore) {
      alert(`Well done Suvo boy you pass your best score , your new score now is ${this.yourScore} `);
    }
  }





}


