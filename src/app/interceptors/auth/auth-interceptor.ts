import {HttpInterceptorFn} from '@angular/common/http';
import {UserStore} from '@/store/user-store';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userStore = inject(UserStore)
  const authToken = userStore.authData().accessToken();
  const newReq = req.clone({
    headers: req.headers
      .append("Authorization", authToken)
      .append("Content-Type", "application/json"),
  })

  return next(newReq);
};
