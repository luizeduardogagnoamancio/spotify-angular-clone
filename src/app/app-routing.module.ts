import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { usuarioEstaLogadoResolver } from './resolvers/usuario-esta-logado.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'player',
    pathMatch: 'full'
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then(x => x.PlayerModule),
    resolve: {
      usuarioEstaLogado: usuarioEstaLogadoResolver,
    }
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(x => x.LoginModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
