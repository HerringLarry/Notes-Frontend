import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { CreatePostDto } from './create-posts.dto';
import * as mongoose from 'mongoose';


@Injectable()

export class NoteService {

  constructor(private http: HttpClient) {}

  getPage( page: number ): Subject<string> {
    const pageSubject: Subject<string> = new Subject();
    this.http.get( 'http://localhost:3000/posts/get/' + page ).subscribe( res => { // cleanup
      if ( res ) {
        console.log(res);
        pageSubject.next( String( res ) );
      }
      pageSubject.complete();
    }
    );
    return pageSubject;

  }

  save( currentNote: string, page: number ): void {
    const send = new CreatePostDto();
    send.content = currentNote;
    send.page = page;
    console.log(send);

    this.http.post( 'http://localhost:3000/posts/post', send).subscribe(res => {console.log(res);});
  }
}
