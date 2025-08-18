import {CanActivateChildFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserStore} from "@/store/user-store";

export const authGuard: CanActivateChildFn = async (childRoute, state) => {
    const router = inject(Router);
    const route = childRoute.routeConfig?.path ?? ""
    const userStore = inject(UserStore)

    if (route === "") return true
    if (userStore.isUserSignedIn()()) {
        await userStore.fetchUserInfo();
        const user = userStore.userData()

        if (route === "my-incidents" && user().role === "Citizen") return true
        if (["incidents", "users"].includes(route) && ["Admin", "CityOfficial"].includes(user().role)) {
            return true
        }
    }

    await router.navigate(['']);
    return false;
};
