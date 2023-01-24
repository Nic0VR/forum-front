import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    console.log('connexion');
    setTimeout(() => {
      this.loginService
        .login(this.form['email'].value, this.form['password'].value)
        .pipe(first())
        .subscribe({
          next: () => {
            let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
            this.router.navigateByUrl(returnUrl);
          },
          error: (e) => {},
        });
    });
  }
}
