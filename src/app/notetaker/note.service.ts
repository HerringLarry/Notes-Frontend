import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { CreatePostDto } from './create-posts.dto';
@Injectable()

export class NoteService {

  constructor(private http: HttpClient) {}

  getPage( page: number ): Observable<object> {
    return this.http.get( 'http://localhost:3002/posts/get/' + page );
  }

  save( currentNote: string, page: number ): Observable<object> {
    const send = new CreatePostDto();
    send.content = currentNote;
    send.page = page;
    return this.http.post( 'http://localhost:3002/posts/post', send);
  }
}
