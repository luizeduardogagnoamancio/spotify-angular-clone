import { Component, OnInit } from '@angular/core';
import { faGuitar, faHome, faMusic, faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent implements OnInit {

  menuSelecionado:string = 'Home';

  playlists: IPlaylist[] = [];
  //Icones
  homeIcone:IconDefinition = faHome;
  pesquisarIcone:IconDefinition = faSearch;
  artistaIcone:IconDefinition = faGuitar;
  playlistIcone:IconDefinition = faMusic;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.buscarPlaylist();

  }

  botaoClick(botao: string): void {
    this.menuSelecionado = botao;
  }

  async buscarPlaylist() {
    this.playlists = await this.spotifyService.buscarPlaylistUsuario();
  }

}
