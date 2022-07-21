import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NewService } from 'src/app/services/new.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  errores: string[];

  constructor(
    private newUser: NewService,
    private router: Router
  ) {
    this.formRegister = new FormGroup({
      name: new FormControl<string | null>(null),
      surname: new FormControl<string | null>(null),
      username: new FormControl<string | null>(null),
      email: new FormControl<string | null>(null),
      password: new FormControl<number | null>(null),
    });

    this.errores = [];
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.newUser.registro(this.formRegister.value)
      .then(response => {
        if (response.affectedRows === 1) {
          alert('Registro completo');
          localStorage.setItem('token', response.token);
          this.router.navigate(['/login']);
        } else {
          // Recorrer el array y sacar la propiedad msg al nuevo array
          this.errores = response.map((error: any) => error.msg);
          alert('Registro erroneo');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}