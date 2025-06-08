import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isloading$ = new BehaviorSubject(false);
  constructor() { }

  show() {
    this.isloading$.next(true);
  }

  hide() {
    this.isloading$.next(false);
  }
}
