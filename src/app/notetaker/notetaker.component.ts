import { Component, OnInit } from '@angular/core';
import { NoteService } from '../notetaker/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notetaker',
  templateUrl: './notetaker.component.html',
  styleUrls: ['./notetaker.component.css'],
  providers: [NoteService]
})
export class NoteTakerComponent implements OnInit {

  currentNote: string;
  currentPageCount = 1;
  MAXPAGECOUNT = 5;
  error = '';

  constructor( private _noteServer: NoteService, private router: Router ) { }

  ngOnInit() {
    this.getPage( this.currentPageCount );
   }

  logout() {
    window.sessionStorage.removeItem('token');
    this.router.navigate(['./login']);

  }

  getNext() {
    console.log(window.sessionStorage.getItem('token'));
    this.currentPageCount++;
    this.currentNote = '';
    this.getPage( this.currentPageCount );
  }

  getPrevious() {
    this.currentPageCount--;
    this.currentNote = '';
    this.getPage( this.currentPageCount );
  }

  getPage( page: number ) {
    this.error = '';
    this._noteServer.getPage( this.currentPageCount ).subscribe( res => this.currentNote = res.content,
                                                                error => this.errorHandler(error) );
  }

  save() {
    this.error = '';
    this._noteServer.save( this.currentNote, this.currentPageCount ).subscribe( res => console.log(res),
                                                                               error => this.errorHandler(error) );
  }

  errorHandler( error ){
    switch ( error.statusText ) {
      case 'Unknown Error': {
        this.error = 'Server Down';
        break;
      }
      case 'Not Found':
      case 'Not Modified': {
        this.error = 'Database Down';
        break;
      }
      case 'Unauthorized': {
        this.error = 'Unauthorized, Please Login';
        break;
      }
      default: {
        this.error = 'Unknown Error';
        break;
      }
    }
  }

}
