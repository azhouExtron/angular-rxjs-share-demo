import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Class } from "./class.interface";

const classes: Class[] = [
  { id: 1, name: "Advanced" },
  { id: 2, name: "Basic" }
];
@Injectable({
  providedIn: "root"
})
export class ClassService {
  constructor() {}

  getClasses = (): Observable<Class[]> => {
    return of(classes);
  };
}
