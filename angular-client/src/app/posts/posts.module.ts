import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentDetailsComponent } from './comment-details/comment-details.component';
import { PostComponent } from './post/post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePostComponent } from './create-post/create-post.component';



@NgModule({
  declarations: [
    PostDetailsComponent,
    PostsListComponent,
    CommentsComponent,
    CommentDetailsComponent,
    PostComponent,
    EditPostComponent,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PostDetailsComponent,
    PostsListComponent,
    CommentsComponent,
    CommentDetailsComponent,
    PostComponent
    
  ]
})
export class PostsModule { }
