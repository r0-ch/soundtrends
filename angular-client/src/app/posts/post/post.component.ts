import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationServices } from 'src/app/core/services/authentication.services';
import { PostsServices } from 'src/app/core/services/posts.services';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  post!: any;
  user$!: Observable<any>;
  id!: string;
  likes!: any;

  constructor(private authenticationService: AuthenticationServices,
    private postsService: PostsServices,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.postsService.getPostById(this.id).subscribe(
      response => {
        this.post = response;
        this.likes = response.likes.length
      }
    );
      console.log(this.post)
    this.authenticationService.getUser().subscribe(
      user => this.user$ = user
    );
  }

  onDelete() {
    this.postsService.deletePost(this.id).subscribe(() => {
      this.router.navigateByUrl('/')
    })
  }

  onLike() {
    this.postsService.likePost(this.id).subscribe({
      next: (response) => {
        this.likes = response.likes ? response.likes.length : 0
      }
    })
  }
}
