import {UserInterface} from '@/interfaces/user-interface';
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {AuthService} from '../app/services/auth-service/auth-service';

const isSignedIn = JSON.parse(localStorage.getItem('isSignedIn') as string ?? "false")
console.log(isSignedIn);
const initialState: UserInterface = {
  user: {
    userId: "",
    name: "",
    email: "",
    telephone: "",
    city: "",
    region: "",
    role: "Citizen",
  },
  isSignedIn,
  isLoading: false,
  auth: {
    accessToken: "",
    idToken: "",
    expiry: 0
  }
}

export const UserStore = signalStore(
  {providedIn: "root"},
  withState(initialState),
  withComputed((store) => ({
    isUserSignedIn: computed(() => store.isSignedIn),
    loading: computed(() => store.isLoading),
    userData: computed(() => store.user),
    authData: computed(() => store.auth),
  })),
  withMethods((store, authService = inject(AuthService)) => ({
    setIsSignedIn() {
      patchState(store, {isSignedIn: true});
      localStorage.setItem('isSignedIn', 'true');
    },

    async fetchUserInfo() {
      patchState(store, {isLoading: true});
      const {auth, user} = await authService.fetchAuthAndCurrentUser();
      patchState(store, {isLoading: false, user, auth, isSignedIn: true});
    },

    signOut() {
      authService.signOut().then(() => {
        localStorage.setItem('isSignedIn', 'false');
        const user = {
          userId: "",
          name: "",
          email: "",
          telephone: "",
          city: "",
          region: "",
          role: "Citizen",
        } as UserInterface["user"]
        patchState(store, {isLoading: false, isSignedIn: false, user});
      });
    }
  })),
  withHooks({
    onInit(store, authService = inject(AuthService)) {
      if (store.isSignedIn()) {
        authService.fetchAuthAndCurrentUser().then(({user}) => {
          patchState(store, {user, isLoading: false})
        });
      }
    }
  })
)

