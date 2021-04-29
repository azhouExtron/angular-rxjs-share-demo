import { Injectable } from "@angular/core";
import { interval, Observable, of, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class IdService {
  private index = 1;
  private idSubject: Subject<number> = new Subject();
  constructor() {
    setInterval(this.passValue, 1000);
  }

  getValue = (): Observable<number> => this.idSubject.pipe();

  public passValue = () => {
    if (this.index > 5) this.index = 1;
    this.idSubject.next(this.index);
    this.index++;
  };
}
