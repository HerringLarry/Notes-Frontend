import { Component, OnInit } from '@angular/core';
import { NoteService } from '../notetaker/note.service';

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

  constructor( private _noteServer: NoteService ) { }

  ngOnInit() {
    this.getPage( this.currentPageCount );
   }

  getNext() {
    this.save();
    this.currentPageCount++;
    this.currentNote = '';
    this.getPage( this.currentPageCount );
  }

  getPrevious() {
    this.save();
    this.currentPageCount--;
    this.currentNote = '';
    this.getPage( this.currentPageCount );
  }

  getPage( page: number ) {
    this._noteServer.getPage( this.currentPageCount ).subscribe((res) => {
      this.currentNote = res.content;
    });
  }

  saveCurrent( text: string ) {
    this.currentNote = text;
  }

  save() {
    this._noteServer.save( this.currentNote, this.currentPageCount );
  }

}
