import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const authGuard: CanMatchFn = (route, segments) => {
  const router = inject( Router )

  const token = sessionStorage.getItem('token') ?? "";
  const logged = "" !== token;

  if(logged) {
    return true;
  }
  return router.createUrlTree(["login"]);
};
