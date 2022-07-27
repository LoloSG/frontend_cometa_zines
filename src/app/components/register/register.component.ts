import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  status: string;

  constructor(
    private newUser: NewService,
    private router: Router
  ) {
    this.formRegister = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      surname: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        // Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{1,100}$/),
        Validators.minLength(5),
        Validators.maxLength(15)
      ])
    });

    this.errores = [];
    this.status = ""
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.newUser.registro(this.formRegister.value)
      .then(response => {
        if (response.affectedRows === 1) {
          this.status = 'success';
          // localStorage.setItem('token', response.token);
          this.router.navigate(['/login']);
        } else {
          // Recorrer el array y sacar la propiedad msg al nuevo array
          this.errores = response.map((error: any) => error.msg);
          this.status = 'error';
        }
      })
      .catch(err => {
        console.log(err);
      });
  };



}







  // passwordValidator(form: FormGroup) {
  //   const passwordValue = form.get('password').value;
  //   const passwordRepeatValue = form.get('password_repeat').value;

  //   if (passwordValue === passwordRepeatValue) {
  //     return null;
  //   } else {
  //     return { passwordvalidator: true }
  //   }
  // }


  // async userValidator(user) {
  //   this.existingUser = await this.newUserService.getByUser(user);

  //   if (this.existingUser) {
  //     this.userValid = 0;
  //   } else {
  //     this.userValid = 1;
  //   }
  // }