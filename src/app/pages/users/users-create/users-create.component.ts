import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersCreateService } from './users-create.service';
import { Component, OnInit } from '@angular/core';
import { private_route } from 'src/shared/constants/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersListViewService } from '../users-list-view/users-list-view.service';

export enum States {
  SP = 'SP',
  RJ = 'RJ',
  MG = 'MG',
  ES = 'ES',
  MT = 'MT',
}

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss'],
})
export class UsersCreateComponent implements OnInit {
  usersCreateForm!: FormGroup;
  statesEnum = Object.values(States);
  cities: any[] = [];
  constructor(
    private usersCreateService: UsersCreateService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private usersListViewService: UsersListViewService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
    this.ufObserver();

    this.validUpdateRoute();
  }

  private validUpdateRoute() {
    this.activatedRoute.params.subscribe((params) => {
      const userId = params['id'];

      if (userId) {
        this.usersListViewService.getUserById(userId).subscribe((user) => {
          this.usersCreateForm.patchValue(user);
        });
      }
    });
  }

  private ufObserver() {
    this.usersCreateForm.get('uf')?.valueChanges.subscribe((uf) => {
      this.usersCreateService.getCitiesByUf(uf).subscribe((res) => {
        const cityControl = this.usersCreateForm.get('cidade');
        if (res && res.length > 0) {
          cityControl?.enable();
        } else {
          cityControl?.disable();
        }
        this.cities = res;
      });
    });
  }

  private createFormGroup() {
    this.usersCreateForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      profissao: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      uf: ['', Validators.required],
      cidade: [{ value: '', disabled: true }, Validators.required],
    });
  }

  onSubmit() {
    const formData = this.usersCreateForm.value;
    formData.cpf = this.formatCPF(formData.cpf);

    const userId = this.activatedRoute.snapshot.params['id'];

    if (userId) {
      this.updateUser(formData, userId);
    } else {
      this.createUserRequest(formData);
    }
  }

  private updateUser(formData: any, userId: any) {
    this.usersCreateService.updateUser(formData, userId).subscribe({
      next: () => {
        this.goBack();
        this.matSnackBar.open('Usuário atualizado com sucesso!', 'Fechar', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.log(err);
        if (err.error.errors && err.error.errors.length > 0) {
          this.matSnackBar.open(err.error.errors[0], 'Fechar', {
            duration: 3000,
          });
        } else {
          this.matSnackBar.open('Ocorreu um erro desconhecido.', 'Fechar', {
            duration: 3000,
          });
        }
      },
    });
  }

  private createUserRequest(formData: any) {
    this.usersCreateService.createUser(formData).subscribe({
      next: () => {
        this.goBack();
        this.matSnackBar.open('Usuário salvo com sucesso!', 'Fechar', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.log(err);
        if (err.error.errors && err.error.errors.length > 0) {
          this.matSnackBar.open(err.error.errors[0], 'Fechar', {
            duration: 3000,
          });
        } else {
          this.matSnackBar.open('Ocorreu um erro desconhecido.', 'Fechar', {
            duration: 3000,
          });
        }
      },
    });
  }

  goBack() {
    this.router.navigate([`${private_route.user_list}`]);
  }

  formatCPF(cpf: string): string {
    const numbers = cpf.replace(/\D/g, '');

    if (numbers.length !== 11) {
      return cpf;
    }

    const formatted = `${numbers.slice(0, 3)}.${numbers.slice(
      3,
      6
    )}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
    return formatted;
  }
}
