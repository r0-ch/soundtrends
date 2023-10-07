import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationServices {
    private user$ = new BehaviorSubject<any>(null);

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
        let currentUser = localStorage.getItem('user');
        if (localStorage.getItem('user') !== null) {
            this.setUser(currentUser)
        }
    }

    login(user: any): Observable<any> {
        return this.http.post<any>('http://localhost:4000/api/user/login', user, { observe: 'response' });
    }

    signup(user: any): Observable<any> {
        return this.http.post<any>('http://localhost:4000/api/user/signup', user, { observe: 'response' });
    }

    signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.user$.next(null);
        console.log('sign user out: ', this.user$, localStorage.getItem('user'), localStorage.getItem('token'));
        this.router.navigateByUrl('authentication/login');

    }


    setToken(token: string) {
        localStorage.setItem('token', token);
        console.log('set token', token)
    }

    getToken() {
        console.log('get token', localStorage.getItem('token'));
        return localStorage.getItem('token')
    }



    getUser() {
        console.log('get user in:', this.user$);
        return this.user$.asObservable();
    }

    setUser(user: string | null) {

        this.user$.next(user);

        if (user !== null) {
            localStorage.setItem('user', user);
        }

    }



}