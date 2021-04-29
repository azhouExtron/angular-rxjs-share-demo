import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Course } from "./course.interface";

const courses: Course[] = [
  { id: 1, name: "Math", studentId: 1, classId: 1 },
  { id: 2, name: "Math", studentId: 2, classId: 1 },
  { id: 3, name: "Math", studentId: 3, classId: 1 },
  { id: 4, name: "Math", studentId: 4, classId: 1 },
  { id: 5, name: "Math", studentId: 5, classId: 1 },
  { id: 6, name: "English", studentId: 1, classId: 2 },
  { id: 7, name: "English", studentId: 2, classId: 2 }
];

@Injectable({
  providedIn: "root"
})
export class CourseService {
  constructor() {}

  getCoursesByStudentId = (id: number): Observable<Course[]> => {
    return of(courses).pipe(map(data => data.filter(c => c.studentId === id)));
  };
}
