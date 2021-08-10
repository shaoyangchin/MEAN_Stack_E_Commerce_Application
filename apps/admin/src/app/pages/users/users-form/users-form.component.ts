import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService, User } from '@munch/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import * as countriesLib from 'i18n-iso-countries';

declare const require: any;

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [],
})
export class UsersFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentUserId: string;
  countries: any = [];

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initUserForm();
    this._getCountries();
    this._checkEditMode();
  }

  private _initUserForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.email]],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      isAdmin: false,
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
    });
  }

  private _getCountries() {
    const newLocal = 'i18n-iso-countries/langs/en.json';
    countriesLib.registerLocale(require(newLocal));
    this.countries = Object.entries(
      countriesLib.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserId,
      name: this.userForm.name.value,
      // icon: this.userForm.icon.value,
      // color: this.userForm.color.value
    };
    if (this.editMode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }

  onCancel() {
    this.location.back();
  }

  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} is created!`,
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created!',
        });
      }
    );
  }

  private _updateUser(user: User) {
    this.usersService.updateUser(user).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is updated!',
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated!',
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentUserId = params.id;
        this.usersService.getUser(params.id).subscribe((user) => {
          this.userForm.name.setValue(user.name);
          this.userForm.email.setValue(user.email);
          this.userForm.isAdmin.setValue(user.isAdmin);
          this.userForm.street.setValue(user.street);
          this.userForm.apartment.setValue(user.apartment);
          this.userForm.zip.setValue(user.zip);
          this.userForm.city.setValue(user.city);
          this.userForm.country.setValue(user.country);
          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        });
      }
    });
  }

  get userForm() {
    return this.form.controls;
  }
}
