import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './components/player.component';
import { RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.routing';
import { PainelEsquerdoComponent } from 'src/app/components/painel-esquerdo/painel-esquerdo.component';
import { BotaoMenuComponent } from 'src/app/components/botao-menu/botao-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(PlayerRoutes)
  ]
})
export class PlayerModule { }
