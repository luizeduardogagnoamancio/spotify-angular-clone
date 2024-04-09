import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './components/player.component';
import { RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.routing';
import { PainelEsquerdoComponent } from 'src/app/components/painel-esquerdo/painel-esquerdo.component';



@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PlayerRoutes)
  ]
})
export class PlayerModule { }
