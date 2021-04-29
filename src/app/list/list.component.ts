import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { concatAll, map, switchMap } from 'rxjs/operators';
import { Class } from '../data/class.interface';
import { ClassService } from '../data/class.service';
import { Course } from '../data/course.interface';
import { CourseService } from '../data/course.service';
import { StudentService } from '../data/student.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  title = "Student Courses";
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  // @ViewChild("toTarget", { static: true }) toTarget: ElementRef;
  //enterdStudent$: Observable<string>;
  courses$: Observable<Course[]>;
  coursesWithClass$: Observable<Course[]>;
  coursesGroupedByClass$: Observable<Course[]>;
  studentName: string;

  private userSubject = new Subject<string>();
  enteredUser$ = this.userSubject.asObservable();
  total = [];

  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private classService: ClassService
  ) { }

  ngOnInit() {
    // this.enterdStudent$ = fromEvent<KeyboardEvent>(
    //   this.searchInput.nativeElement,
    //   "keyup"
    // ).pipe(map(s => s.target["value"]));
       this.courses$ = this.enteredUser$.pipe(
      switchMap(name => this.getStudentId(name)),
      switchMap(id => this.getCouses(id))
    );

     this.coursesWithClass$ = combineLatest(
      [this.courses$,
      this.getClasses()]
    ).pipe(
      map(([courses, classes])=> this.mapClasses(courses, classes)
    ));

    // let coursesGroupedByClass$ = this.coursesWithClass$.pipe(
    //   concatAll(),
    //   groupBy(course =>course.classId, course => course),
    //   mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
    //   toArray()
    // );
  }

  onClick() {
    console.log('student name: ', this.studentName);
    this.userSubject.next(this.studentName);
  }

  private mapClasses(courses: Course[], classes: Class[]){
      return courses.map( course =>({
        ...course,
        className: classes.find(c => course.classId === c.id)?.name
      }) as Course);
  }


  private getStudentId(userName: string): Observable<number> {
    return this.studentService.getStudentIdByName(userName).pipe(
      //catchError(this.handleError),
      map(id => (id.length === 0 ? 0 : id[0]))
    );
  }

  private getCouses(id: number) {
    return this.courseService.getCoursesByStudentId(id);
  }

  private getClasses(): Observable<Class[]> {
    return this.classService.getClasses();
  }
}