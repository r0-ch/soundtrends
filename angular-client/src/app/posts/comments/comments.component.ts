import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationServices } from 'src/app/core/services/authentication.services';
import { PostsServices } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  comments$!: Observable<Array<any>>;
  comment!: string;
  id = this.route.snapshot.params['id'];

  constructor(private postsService: PostsServices, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.comments$ = this.postsService.getPostComments(this.id);
  }

  onSubmit() {
    console.log(this.comment)
    this.postsService.addPostComment(this.id, { comment: this.comment }).subscribe(
      () => {
        this.router.navigateByUrl(`posts/${this.id}`);
        this.comments$ = this.postsService.getPostComments(this.id)
      });

  }
}
