import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../post.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;
  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public postsService: PostsService) {}

  //@Input() posts: Post[] = [];
  private postSubscription : Subscription;
  /*posts = [
    {title: 'First Post', content: " This is the first post content"},
    {title: 'Second Post', content: " This is the Second post content"},
    {title: 'Third Post', content: " This is the Third post content"}
  ]*/

  ngOnInit() {
    this.isLoading = true;
    //this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
       // this.totalPosts = postData.postCount;
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    //this.isLoading = true;
    this.postsService.deletePost(postId);
    //.subscribe(() => {
    //  this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
   // this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
  
 // onChangedPage(pageData: PageEvent) {
   // this.isLoading = true;
   // this.currentPage = pageData.pageIndex + 1;
    //this.postsPerPage = pageData.pageSize;
    //this.postsService.getPosts(this.postsPerPage, this.currentPage);
  

