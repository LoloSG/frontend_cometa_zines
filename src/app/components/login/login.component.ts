import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NewService } from 'src/app/services/new.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private newUser: NewService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl<string | null>(null),
      password: new FormControl<string | null>(null),
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.newUser.login(this.formLogin.value)
      .then(response => {
        if (response.error) {
          alert(response.error);
        } else {
          alert('Login correctísimo');
          localStorage.setItem('token', response.token);
          console.log(response.token)
          this.router.navigate(['/miperfil']);
        }
      }).catch(err => console.log(err));
  }

}
