import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from '@angular/router';
import {BattleshipComponent} from './battleship/battleship.component';

const routes: Routes = [
  {path: '' , redirectTo: '/battleship' , pathMatch: 'full' },
  {path: 'battleship' , component: BattleshipComponent}
  ];



@NgModule({
  declarations: [],
  imports: [
    CommonModule , RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule { }
