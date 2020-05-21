import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  getPost(id: string) {
    return { ...this.posts.find(p => p.id === id) };
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        'http://localhost:3000/api/posts'
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post) => {
              return {
                title: post.title,
                content: post.content,
                id: post.id,
              };
            })
          }

        }))

      .subscribe((transformedPosts) => {
        this.posts = transformedPosts.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }
  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
  deletePost(postId: string) {
    this.http
      .delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        console.log("deleted");
        //const updatedPosts = this.posts.filter((post) => post.id !== postId);
        //this.posts = updatedPosts;
        //this.postsUpdated.next([...this.posts]);
      });
  }
}