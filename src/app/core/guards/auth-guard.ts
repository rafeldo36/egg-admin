import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Api } from '../services/api';

export const authGuard: CanActivateFn = () => {

  const auth = inject(Api);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
