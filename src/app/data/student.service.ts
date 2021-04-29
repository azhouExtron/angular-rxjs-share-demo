import { Injectable } from "@angular/core";
import { from, interval, Observable, of, zip } from "rxjs";
import { delayWhen, first, map } from "rxjs/operators";
import { Student } from "./student.interface";

const students: Student[] = [
  { id: 1, name: "Bob", age: 20 },
  { id: 2, name: "John", age: 21 },
  { id: 3, name: "Safari", age: 19 },
  { id: 4, name: "Lisa", age: 20 },
  { id: 5, name: "Tom", age: 30 },
  { id: 6, name: "Tony", age: 18 },
  { id: 7, name: "Scott", age: 28 },
  { id: 8, name: "Tim", age: 22 }
];

@Injectable({
  providedIn: "root"
})
export class StudentService {
  constructor() {}

  getStudents = () => of(students);

  // If id is 1, delay 1 second
  getStudentById = (id: number): Observable<Student> =>
    from(students).pipe(
      first(s => s.id === id),
      delayWhen(val => (val.id === 1 ? zip(interval(1000), of(val)) : of(val)))
    );

  getStudentIdByName = (name: string): Observable<number[]> =>
    of(students).pipe(
      map(students => students.filter(s => s.name.startsWith(name))),
      map(students => students.map(s => s.id))

      // delayWhen(val => (val === 1 ? zip(interval(1000), of(val)) : of(val)))
    );

  students$: Observable<Student[]> = of(students);
}
