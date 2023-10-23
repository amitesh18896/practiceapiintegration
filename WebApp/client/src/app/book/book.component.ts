import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx'; 
import { saveAs } from 'file-saver';
import { AddBookComponent } from '../add-book/add-book.component';
interface Book {
  Id: number;
  Title: string;
  Description: string;
  PublishedOn: string;
  Author: string;
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {

  dataSource = new MatTableDataSource<Book>(); 
  pageSize = 5; 
  pageSizeOptions = [5, 10, 25, 100]; 

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;





  book: Book = {
    Id: 0,
    Title: '',
    Description: '',
    PublishedOn: '',
    Author: '',
  };

  books: any;
  isLoading: boolean = true;
  output: any;
  private _Route: any;


  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.http.get('/api/books').subscribe((data: any) => {
      this.books = data;
      this.dataSource.data = this.books;
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
      this.onPageChange({ pageIndex: 0, pageSize: 5 });
      // setTimeout(() => this.isLoading = false, 5000);
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.getBookDetail(id);
    }
  }
  


  downloadDataAsExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.books);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Books');


    const fileName = 'books_' + new Date().getTime() + '.xlsx';


    XLSX.writeFile(wb, fileName);
  }





  getBookDetail(id: number) {
    this.http.get<Book>('/api/books/' + id).subscribe(
      (data: Book) => {
        this.book = data;
      },
      (err: any) => {
        console.error('Error:', err);
      }
    );
  }
  onPageChange(event: any): void {
  
    const defaultPageSize = 5; 
    const startIndex = event.pageIndex * defaultPageSize;
    const endIndex = startIndex + defaultPageSize;
    this.dataSource.data = this.books.slice(startIndex, endIndex);
  }


  openDialog(book: Book) {
    const bookClone = { ...book };
    const dialogRef = this.dialog.open(EditBookComponent, {
      width: '550px',
      data: { book: bookClone }, 
    });

    dialogRef.afterClosed().subscribe((result: { Id: number; }) => {
      if (result) {
        Object.assign(book, result);
        this.updateBook(result.Id);
      }
    });
  }

  openDialogs() {

    const dialogRef = this.dialog.open(AddBookComponent, {
      width: '550px',
  
    });

  }


  updateBook(id: number) {
    this.http.put('/api/books/' + id, this.book).subscribe(
      () => {
        this.router.navigate(['/details', id]);
        this.router.navigate(['/books']);
      },
      (err: any) => {
        console.error('Error:', err);

      }
    );
  }

}
