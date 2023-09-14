import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, takeUntil } from 'rxjs';
import { private_route, public_route } from 'src/shared/constants/routes';
import { LoginDto } from './models/login.dto';
import { BaseComponent } from 'src/shared/model/base-component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    super();
  }
  signInForm!: FormGroup;
  loading: boolean = false;

  ngOnInit() {
    this.createFormGroup();
  }

  private createFormGroup() {
    this.signInForm = this.formBuilder.group({
      email: ['admin@admin.com', [Validators.required, Validators.email]],
      password: ['123', [Validators.required, Validators.maxLength(8)]],
    });
  }

  public submit() {
    this.loading = true;
    const payload: LoginDto = this.signInForm.value;
    this.loginService
      .loginHook(payload)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: () => {
          this.router.navigate([`${private_route.user_list}`]);
        },
        error: (error) => {
          this.loading = false;
          this.snackBar.open('Ocorreu um erro durante o login!', 'Fechar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        },
      });
  }
}
