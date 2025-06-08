import { F } from "@angular/cdk/keycodes";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class SharedService {
    role!: string;
    isUserLoggedIn: boolean = false
    constructor() {

    }

    setRole(role: string) {
        localStorage.setItem('loggedInAsRole', role);
    }

    getRole() {
        const res = localStorage.getItem('loggedInAsRole');
        if (res) return (res);
        return null;
    }

    setIsUserLoggedIn(flag: boolean) {
        localStorage.setItem('isUserLoggedIn', JSON.stringify(flag));
    }

    getIsUserLoggedIn() {
        const res = localStorage.getItem('isUserLoggedIn');
        if (res) return JSON.parse(res);
        return null;
    }
}