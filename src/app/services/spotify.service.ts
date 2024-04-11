import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify  from 'spotify-web-api-js';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { SpotifyPlaylistParaPlaylist, SpotifyUserParaUsuario } from 'src/app/common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

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
      console.log('passou')
      await this.obterSpotifyUsuario();
      return !!this.usuario;

    }catch(ex){
      return false;
    }
  }

  async obterSpotifyUsuario() {
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);
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
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]>{
    // console.log('USUARIO', this.usuario);
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, { offset, limit });
    return playlists.items.map(SpotifyPlaylistParaPlaylist);
  }
}
