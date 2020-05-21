import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { PostsService } from '../post.service';
import { Post } from "../post.model";
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
  
  //enteredTitle = "";
  //enteredContent = "";
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private postId: string;
  
  constructor(public postsService: PostsService, public route: ActivatedRoute) {}


    ngOnInit(): void {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')) {
      this.mode = 'edit';
      this.postId = paramMap.get('postId');
      this.isLoading = true; 
  }
      else {
      this.mode = 'create';
      this.postId = null;

  //   onAddPost(){   
  //     if(form.invalid){
  //     return;
  //       }   
  //     this.postsService.addPost(form.value.title, form.value.content);
  //     form.resetForm();
  // }



      }
    })}}