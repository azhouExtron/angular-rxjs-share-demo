import { Component, OnInit } from "@angular/core";
import { fromEvent, merge, Observable } from "rxjs";
import { mapTo, switchMap } from "rxjs/operators";
import { IdService } from "../data/id.service";
import { Student } from "../data/student.interface";
import { StudentService } from "../data/student.service";

@Component({
  selector: "app-nest-sub",
  templateUrl: "./nest-sub.component.html",
  styleUrls: ["./nest-sub.component.css"]
})
export class NestSubComponent implements OnInit {
  student: Student;
  student$: Observable<Student>;
  id: number;
  toShow = false;
  buttonText = "Show";
  constructor(
    private idService: IdService,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    const b1 = document.getElementById("1");
    const b2 = document.getElementById("2");
    const b3 = document.getElementById("3");
    const b4 = document.getElementById("4");
    const b5 = document.getElementById("5");

    const addOneclick$ = id =>
      fromEvent(document.getElementById(id), "click").pipe(mapTo(id));

    const buttonClicked$ = merge(
      addOneclick$(1),
      addOneclick$(2),
      addOneclick$(3),
      addOneclick$(4),
      addOneclick$(5)
    );

    buttonClicked$.subscribe((x: any) => {
      this.id = x;
      this.studentService.getStudentById(x).subscribe(s => {
        console.log("in get student: ", s);
        this.student = s;
      });
    });

    this.student$ = buttonClicked$.pipe(
      switchMap(x => this.studentService.getStudentById(x))
    );
  }

  onClick() {
    this.toShow = !this.toShow;
    this.buttonText === "Hide"
      ? (this.buttonText = "Show")
      : (this.buttonText = "Hide");
  }
}
