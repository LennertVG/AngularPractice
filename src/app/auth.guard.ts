// auth.guard.ts
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from  '@angular/router';

export  const  authGuard:  CanActivateFn  =  (route:  ActivatedRouteSnapshot, state:  RouterStateSnapshot)  => {
	const  token  = localStorage.getItem('token');
	if (token) {
			return  true;
		} else {
			window.location.href  =  '/login';
		return  false;
		}
};