import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from "../player";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name = '';
  registered: boolean = false;
  playerName: string = '';
  
  constructor(private router: Router) { }

  ngOnInit() {
    // Palautetaan aina ensin arvo falseksi ja sitten vastaa check
    this.resetPlayerReg();
    this.checkPlayer();
  }

  // Tarkistetaan onko localstoragessa jo pelaaja
  // Jos on niin form piilotetaan
  checkPlayer() {
    const item = JSON.parse(localStorage.getItem('player'));
    if (item === null) {
      this.registered = false;
    } else {
      this.playerName = item.name;
      this.registered = true;
    }
  }

  // Resetoidaan rekisteröityminen
  resetPlayerReg() {
    this.registered = false;
  }

  // Lähetetään data local storageen talteen
  onSubmit(formData) {
    let player = new Player(formData.name);
    localStorage.clear();
    localStorage.setItem('player', JSON.stringify(player));
    this.router.navigate(['/lobby']);
  }

  // Aloita napista viedään aulaan
  onStart() {
    this.router.navigate(['/lobby']);
  }

}
