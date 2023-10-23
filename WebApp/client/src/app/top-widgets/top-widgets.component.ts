import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  faLocation,
  faShop,
  faBoxes,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.css']
})
export class TopWidgetsComponent implements OnInit {
  faLocation = faLocation;
  faShop = faShop;
  faBoxes = faBoxes;
  faMoneyBill = faMoneyBill;
  books: any[] = [];
  students: any[] = [];
  teachers: any[] = [];
  totalBookCount: number = 0;
  totalStudentCount: number = 0;
  totalTeacherCount: number = 0;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchDataFromAPI();
    this.fetchDataFromAPIs();
    this.fetchDataFromAPIse();
  }

  navigateToOtherComponent() {
    this.router.navigate(['/delete/id']);
  }
  fetchDataFromAPIse() {

    const apiUrl = 'http://localhost:58896/api/books/teacher';

    this.http.get(apiUrl).subscribe((data: any) => {

      console.log('try', data);
      this.teachers = data;
      this.totalTeacherCount = this.teachers.length;
    }, error => {
      console.error('API request failed:', error);
    });
  }


  fetchDataFromAPIs() {
  
    const apiUrl = 'http://localhost:58896/api/students';

    this.http.get(apiUrl).subscribe((data: any) => {

      console.log('try', data);
      this.students = data;
      this.totalStudentCount = this.students.length; 
    }, error => {
      console.error('API request failed:', error);
    });
  }

  fetchDataFromAPI() {
    const apiUrl = 'http://localhost:58896/api/books';
  

    this.http.get(apiUrl).subscribe((data: any) => {
    
      console.log('try', data);
      this.books = data;
      this.totalBookCount = this.books.length;
    }, error => {
      console.error('API request failed:', error);
    });
  }
}
