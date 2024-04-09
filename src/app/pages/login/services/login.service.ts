import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment.development';
import Spotify  from 'spotify-web-api-js';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { SpotifyUserParaUsuario } from 'src/app/common/spotifyHelper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;

  usuario: IUsuario;

  constructor() {
    this.spotifyApi = new Spotify();
  }

  async inicializarUsuario() {
    if(!!this.usuario)
      return true;

    const token = localStorage.getItem('token');
    console.log(token)

    if(!token)
      return false;

    try {

      this.definirAccessToken(token);
      await this.obterSpotifyUsuario();
      return !!this.usuario;

    }catch(ex){
      return false;
    }
  }

  async obterSpotifyUsuario() {
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);
    console.log(userInfo);
  }

  obterUrlLogin(): string {
    const authEndPoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;

    return authEndPoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback(): string {
    if (!window.location.hash) { //o token vem no hash
      return ''
    }

    const params = window.location.href.substring(1).split('&');
    return params[0].split('=')[1];
  }

  definirAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);//para quando dar f5 não apagar tudo
    this.spotifyApi.skipToNext();
  }
}
