import {Component, effect, inject, output, signal} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {cn, ghPhoneValidator, matchPasswordValidator, strongPasswordValidator} from '@/lib/utils';
import {NgTemplateOutlet, TitleCasePipe} from '@angular/common';
import {Button} from 'primeng/button';
import {Password} from 'primeng/password';
import {InputMask} from 'primeng/inputmask';
import {AuthService} from "../../services/auth-service/auth-service";
import {ToastService} from "../../services/toast-service/toast-service";
import {InputOtp} from "primeng/inputotp";
import {UserStore} from '@/store/user-store';
import {ghanaRegions} from '@/constants/index';
import {RegionOrCityOption} from '@/interfaces/user-interface';
import {Select} from 'primeng/select';

@Component({
  selector: 'cmrp-auth',
  imports: [
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    TitleCasePipe,
    Password,
    InputMask,
    NgTemplateOutlet,
    Button,
    InputOtp,
    Select,
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {
  public updateModal = output<void>()

  protected authForm: FormGroup;
  protected authFormControls = signal<string[]>([]);
  protected isSubmitting = signal(false);
  protected userName = signal('');
  protected formType = signal<"login" | "signup" | "otp">("login")
  protected minLengthValidator = Validators.minLength(5);
  protected readonly cn = cn;
  protected regions: RegionOrCityOption[] = []
  protected cities: RegionOrCityOption[] = []
  protected userStore = inject(UserStore)
  protected authService = inject(AuthService);
  protected toastService = inject(ToastService);

  private readonly formCreators: Record<string, () => FormGroup> = {
    login: () => this.createLoginForm(),
    signup: () => this.createSignUpForm(),
    otp: () => this.createOtpForm(),
  };

  constructor() {
    this.authForm = this.createLoginForm()
    this.regions = ghanaRegions.map(r => ({label: r.label, value: r.value}));
    effect(() => {
      if (this.formType()) {
        this.authForm = this.formCreators[this.formType()]?.()
        this.authFormControls.set(Object.keys(this.authForm.controls))
      }


      // update cities when region changes
      this.authForm.get('region')?.valueChanges.subscribe(regionValue => {
        const region = ghanaRegions.find(r => r.value === regionValue.value);
        this.cities = region ? region.cities : [];
        this.authForm.get('city')?.reset();
      });
    });

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

  // Submit form data
  protected async onSubmit() {
    if (this.authForm.valid) {
      if (this.formType() !== 'otp') {
        this.userName.set(this.authForm.value.email);
      }
      if (this.formType() === 'signup') {
        await this.signUp()
      } else if (this.formType() === 'login') {
        await this.signIn()
      } else {
        await this.confirmOtp()
      }
    }

  }

  private async confirmOtp() {
    const formValue = this.authForm.value
    console.log(this.userName())
    const {isSignUpComplete} = await this.authService.confirmSignUp(this.userName(), formValue.otp)
    if (isSignUpComplete) {
      this.formType.set("login");
    }
  }

  private async signIn(): Promise<void> {
    this.isSubmitting.set(true);
    try {
      const {nextStep: {signInStep}} = await this.authService.signIn(this.authForm.value);
      await this.handleSignInStep(signInStep);
    } catch (error) {
      console.error(error);
      this.handleError(error as Error);
    }
  }

  private async handleSignInStep(signInStep: string): Promise<void> {
    this.isSubmitting.set(false);

    console.log(signInStep)

    if (signInStep === "DONE") {
      this.userStore.setIsSignedIn()
      this.updateModal.emit()
      await this.userStore.fetchUserInfo()
      return;
    }

    if (signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED") {
      // TODO: implement update password feature
      console.log(signInStep);
    }

    if (["CONFIRM_SIGN_UP", "CONFIRM_SIGN_IN"].includes(signInStep)) {
      this.formType.set("otp");
    }
  }

  private async signUp() {
    this.isSubmitting.set(true);
    try {
      const {nextStep: {signUpStep}} = await this.authService.signUp(this.authForm.value);
      this.isSubmitting.set(false);
      if (signUpStep === "CONFIRM_SIGN_UP") {
        this.formType.set("otp");
      }
      if (signUpStep === "DONE") {
        await this.signIn()
      }
    } catch (error) {
      this.handleError(error as Error, "Sign Up");

    }
  }

  private handleError(error: Error, type = "Login"): void {
    this.toastService.showToast("error", `${type} failed`, error.message);
    this.isSubmitting.set(false);
  }

  private createLoginForm() {
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    })
  }

  private createSignUpForm() {
    return new FormGroup({
        name: new FormControl("", [Validators.required, this.minLengthValidator]),
        email: new FormControl("", [Validators.required, Validators.email]),
        telephone: new FormControl("", [Validators.required, ghPhoneValidator()]),
        password: new FormControl("", [Validators.required, strongPasswordValidator()]),
        confirm_password: new FormControl("", [Validators.required, strongPasswordValidator()]),
        region: new FormControl("", [Validators.required, this.minLengthValidator]),
        city: new FormControl("", [Validators.required, Validators.minLength(2)]),
      },
      {
        validators: [matchPasswordValidator('password', 'confirm_password')]
      }
    )
  }

  private createOtpForm() {
    return new FormGroup({
      otp: new FormControl("", [Validators.required, Validators.minLength(6)]),
    })
  }
}
