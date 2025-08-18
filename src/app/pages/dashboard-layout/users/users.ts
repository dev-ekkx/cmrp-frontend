import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {UserCard} from '@/pages/dashboard-layout/users/user-card/user-card';
import {
  ghanaRegions,
  userFilters,
  userRoles,
  usersTableData,
  userSummaryCards,
  userTableHeaders
} from '@/constants/index';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button, ButtonDirective} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Tooltip} from 'primeng/tooltip';
import {Dialog} from 'primeng/dialog';
import {cn, ghPhoneValidator} from '@/lib/utils';
import {FloatLabel} from 'primeng/floatlabel';
import {InputMask} from 'primeng/inputmask';
import {TitleCasePipe} from '@angular/common';
import {RegionOrCityOption} from '@/interfaces/user-interface';
import {AuthService} from '../../../services/auth-service/auth-service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
  selector: 'cmrp-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UserCard,
    IconField,
    InputIcon,
    InputText,
    Select,
    FormsModule,
    Button,
    TableModule,
    Tooltip,
    ButtonDirective,
    Dialog,
    FloatLabel,
    InputMask,
    ReactiveFormsModule,
    TitleCasePipe,
    ConfirmDialog
  ],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {
  protected readonly userSummaryCards = userSummaryCards;
  protected showAddUserModal = false;
  protected selectedGroup = {
    name: "All Users",
    code: "all"
  }

  protected authService = inject(AuthService)
  protected confirmationService = inject(ConfirmationService);
  protected messageService = inject(MessageService);
  protected regions: RegionOrCityOption[] = []
  protected cities: RegionOrCityOption[] = []
  protected readonly cn = cn;
  protected searchValue = ""
  protected readonly userTableHeaders = userTableHeaders;
  protected readonly userRoles = userRoles;
  protected readonly userFilters = userFilters;
  protected readonly usersTableData = usersTableData
  protected minLengthValidator = Validators.minLength(5);
  protected isSubmitting = signal(false);
  protected userForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, this.minLengthValidator]),
    email: new FormControl("", [Validators.required, Validators.email]),
    telephone: new FormControl("", [Validators.required, ghPhoneValidator()]),
    role: new FormControl("", [Validators.required]),
    region: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
  });
  protected userFormControls = signal<string[]>(Object.keys(this.userForm.controls));

  ngOnInit() {
    this.regions = ghanaRegions.map(r => ({label: r.label, value: r.value}));

    // update cities when region changes
    this.userForm.get('region')?.valueChanges.subscribe(regionValue => {
      const region = ghanaRegions.find(r => r.value === regionValue.value);
      this.cities = region ? region.cities : [];
      this.userForm.get('city')?.reset();
    });
  }

  protected removeUser(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to remove this user?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'User removed'});
      },
      reject: () => {
        console.log("rejected")
        // this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'});
      },
    });
  }

  protected getUsers() {
    let users = this.selectedGroup.code === 'all'
      ? this.usersTableData
      : this.usersTableData.filter(user => user.role === this.selectedGroup.code);

    if (this.searchValue.trim() !== "") {
      const search = this.searchValue.toLowerCase();
      users = users.filter(user => user.name.toLowerCase().includes(search));
    }

    return users;
  }

  protected getInputType(key: string): string {
    const types: { [key: string]: string } = {
      email: 'email',
      password: 'password',
      confirm_password: 'password',
      telephone: 'tel',
      name: 'text',
      region: 'text',
      city: 'text'
    };
    return types[key] || 'text';
  }

  protected onSubmit() {
    this.isSubmitting.set(true)
    if (this.userForm.valid) {
      this.authService.onboardUser(this.userForm.value)
      console.log(this.userForm.value);
    }

  }
}
