import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagPayload } from '../tag/tag-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient) { }

  getAllTagsForPost(postId: number): Observable<TagPayload[]> {
    return this.httpClient.get<TagPayload[]>('http://localhost:8080/api/v1/tags/by-post/' + postId);
  }

  postTag(tagPayload: TagPayload): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/api/v1/tags/', tagPayload);
  }
}
