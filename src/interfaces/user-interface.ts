export interface AuthFormInterface {
  name: string;
  email: string;
  password: string;
  telephone: string;
  city: string;
  region: string;
  role?: string
}

export interface UserInterface {
  user: Omit<AuthFormInterface, "password"> & {
    role: "Admin" | "CityOfficial" | "Citizen" | "";
    userId: string;
  };
  isSignedIn: boolean;
  auth: {
    accessToken: string;
    idToken: string;
    expiry: number
  },
  isLoading: boolean;
}

export interface IUserData {
  id: string
  name: string
  email: string
  telephone: string
  region: string
  city: string
  role: string
}


export interface RegionOrCityOption {
  label: string;
  value: string;
}

export interface RegionI {
  label: string;
  value: string;
  cities: RegionOrCityOption[];
}
