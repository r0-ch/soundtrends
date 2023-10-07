import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsServices } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss']
})
export class CommentDetailsComponent {
  @Input() comment!: any;

  constructor(private postsService: PostsServices, private activatedRoute: ActivatedRoute) {}

  onDelete() {
    this.postsService.removePostComment(this.activatedRoute.snapshot.params['id'], this.comment['_id']).subscribe(
      (response) => console.log(response) 
    )
  }
}
