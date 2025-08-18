import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import {UserCard} from '@/pages/dashboard-layout/users/user-card/user-card';
import {ghanaRegions, usersTableData, userSummaryCards, userTableHeaders} from '@/constants/index';
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
    TitleCasePipe
  ],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {
  protected readonly userSummaryCards = userSummaryCards;
  protected showAddUserModal = true;
  protected selectedGroup = {
    name: "All Users",
    code: "all"
  }

  protected searchValue = ""
  protected readonly userTableHeaders = userTableHeaders;
  protected readonly usersTableData = usersTableData
  protected readonly cn = cn;
  protected minLengthValidator = Validators.minLength(5);
  protected isSubmitting = signal(false);

  protected filters = [
    {name: 'All Users', code: 'all'},
    {name: 'Administrators', code: 'administrator'},
    {name: 'City Officials', code: 'city official'},
    {name: 'Citizens', code: 'citizen'},
  ];

  protected roles = [
    {label: 'Administrators', value: 'administrator'},
    {label: 'City Officials', value: 'city official'},
  ];

  protected regions: RegionOrCityOption[] = []
  protected cities: RegionOrCityOption[] = []
  protected userForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, this.minLengthValidator]),
    email: new FormControl("", [Validators.required, Validators.email]),
    telephone: new FormControl("", [Validators.required, ghPhoneValidator()]),
    region: new FormControl("", [Validators.required, this.minLengthValidator]),
    city: new FormControl("", [Validators.required, Validators.minLength(2)]),
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
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }

  }

  protected removeUser(userId: string) {

  }
}
