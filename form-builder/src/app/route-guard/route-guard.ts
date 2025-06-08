import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { SharedService } from "../services/shared.service";
import { inject } from "@angular/core";

export const canActivateAdmin = (router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const sharedService = inject(SharedService);
    const route =  inject(Router)
    const isValidUser = sharedService.getIsUserLoggedIn() && (sharedService.getRole() === 'admin' || sharedService.getRole() === 'user');
    if (isValidUser) {
        return true;
    } else {
        return route.createUrlTree(['/'])
    }
}