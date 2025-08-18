import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {IncidentType} from '@/types/index';
import {UserInterface} from '@/interfaces/user-interface';
import {fetchAuthSession, getCurrentUser} from "aws-amplify/auth";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const strongPasswordValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasMinLength = value.length >= 8;

    const passwordValid =
      hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasMinLength;

    return passwordValid ? null : {
      strongPassword: {
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
        hasMinLength
      }
    };
  };
}

export const ghPhoneValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    const ghPhoneRegex = /^(024|054|055|059|053|025|020|050|026|056|027|057)\d{7}$/;

    if (!value) return null;

    return ghPhoneRegex.test(value)
      ? null
      : {invalidGhanaPhone: true};
  };
}

export const matchPasswordValidator = (passwordKey: string, confirmPasswordKey: string): ValidatorFn => {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey)?.value;
    const confirmPassword = group.get(confirmPasswordKey)?.value;

    if (password !== confirmPassword) {
      group.get(confirmPasswordKey)?.setErrors({passwordMismatch: true});
      return {passwordMismatch: true};
    } else {
      group.get(confirmPasswordKey)?.setErrors(null);
      return null;
    }
  };
}

export const getIncidentSeverity = (incident: IncidentType | string) => {
  const dataMap: Record<IncidentType, string> = {
    low: "secondary",
    urgent: "danger",
    high: "danger",
    medium: "warn",
    active: "danger",
    investigating: "info",
    resolved: "success",
  };

  return dataMap[incident as IncidentType];
}


export const checkTokenExpiry = (expiry: number) => {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime > expiry
}

export const getUserAndAuthData = async () => {
  const [authSession, currentUser] = await Promise.all([
    fetchAuthSession(),
    getCurrentUser()
  ]);


  const userInfo = authSession?.tokens?.idToken?.payload ?? {};

  const user: UserInterface["user"] = {
    userId: currentUser?.userId ?? "",
    name: userInfo["name"] ?? "",
    email: userInfo["email"] ?? "",
    telephone: userInfo["phone_number"] ?? "",
    region: userInfo["custom:region"] ?? "",
    city: userInfo["custom:city"] ?? "",
    role: Array.isArray(userInfo["cognito:groups"])
      ? userInfo["cognito:groups"]?.[0] ?? "Citizen"
      : "Citizen",
  } as UserInterface["user"]


  return {
    user,
    auth: {
      expiry: userInfo.exp ?? 0
    }
  };
};

