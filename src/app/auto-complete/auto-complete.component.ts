import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Student } from '../data/student.interface';
import { StudentService } from '../data/student.service';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {
 @ViewChild("instance", { static: true }) instance!: NgbTypeahead;
  model: any;
  selectedStudent: Student | undefined;
  title ="Auto Complete";
  // Formats the typeahead entry
  formatter = (student: Student) => student.name;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  clear$ = new Subject<string>();

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }

   search:  OperatorFunction<string, readonly Student[]> = (text$: Observable<string>)  => {
    const debounceText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clickToOpen$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );

    const operation$ = merge(
      debounceText$,
      clickToOpen$,
      this.focus$,
      this.clear$
    );

    return combineLatest([operation$, this.studentService.students$]).pipe(
     map(([text, categories]) =>
        text === '' ? categories : categories.filter(c => new RegExp(`^${text}`, 'i').test(c.name)))
      
    );
  };

  onClear() {
    this.selectedStudent = undefined;
    this.clear$.next();
  }

  studentSelected(student: Student) {
    console.log(student);
  }

}