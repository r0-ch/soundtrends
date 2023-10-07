import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationServices } from "./authentication.services";

@Injectable({
    providedIn: 'root'
})
export class PostsServices {

    constructor(private http: HttpClient, private authenticationService: AuthenticationServices) {}

    getPosts(): Observable<Array<any>> {
        return this.http.get<Array<any>>('http://localhost:4000/api/posts', {observe: 'body'});
    }

    getPostById(id: string): Observable<any> {
        return this.http.get<any>(`http://localhost:4000/api/posts/${id}`);
    }

    createPost(body: any): Observable<any> {
        return this.http.post<any>(`http://localhost:4000/api/posts/`, body);
    }

    editPost(id: string, body: {}): Observable<any> {
        return this.http.patch<any>(`http://localhost:4000/api/posts/${id}`, body);
    }

    
    deletePost(id: string): Observable<any> {
        return this.http.delete<any>(`http://localhost:4000/api/posts/${id}`);
    }

    getPostComments(id: string): Observable<any> {
        return this.http.get<any>(`http://localhost:4000/api/posts/${id}/comments`);
    }

    addPostComment(id: string, body: {}): Observable<any> {
        return this.http.post<any>(`http://localhost:4000/api/posts/${id}/comments`, body)
    }

    removePostComment(id: string, commentId: string) {
        return this.http.delete<any>(`http://localhost:4000/api/posts/${id}/comments/${commentId}`, /*{headers: new HttpHeaders({['Authorization']: `Bearer ${this.authenticationService.getToken()}`})}*/)
    }

    likePost(id:string) {
        return this.http.post<any>(`http://localhost:4000/api/posts/${id}/like`, null)
    }
}