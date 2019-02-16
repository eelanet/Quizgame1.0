import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registered: boolean = false;
  error = '';
  // injektoidaan router ja authService
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // aina kun login-komponentti ladataan, poistetaan token
    this.authService.logout();
    this.checkRegistration();
  }

  // lomakkeen lähetys
  // authService palauttaa observablen jossa on joko true tai false
  onSubmit(formData) {
    this.authService.login(formData.username, formData.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/category']);
        } else {
          this.error = 'Tunnus tai salasana väärä';
          alert(this.error);
        }
      });
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  // Katsotaan onko pelaaja rekisteröitynyt
  checkRegistration() {
    const item = JSON.parse(localStorage.getItem('player'));
    if (item === null) {
      this.registered = false;
    } else {
      this.registered = true;
    }
  }

}
