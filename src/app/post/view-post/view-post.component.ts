import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/shared/post-model';
import { throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { TagPayload } from 'src/app/tag/tag-payload';
import { TagService } from 'src/app/shared/tag.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];
  tags: TagPayload[];

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
    private commentService: CommentService, private router: Router, private tagService: TagService) {
    this.postId = this.activateRoute.snapshot.params.id;

    this.commentForm = new FormGroup({
      message: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      message: '',
      postId: this.postId
    };
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
    this.getTagsForPost();
  }

  postComment() {
    this.commentPayload.message = this.commentForm.get('message').value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('message').setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    })
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }

  private getTagsForPost() {
    this.tagService.getAllTagsForPost(this.postId).subscribe(data => {
      this.tags = data;
    }, error => {
      throwError(error);
    });
  }

  goToPosts(id: number): void {
    this.router.navigateByUrl('/by-tag/' + id);
  }

}
