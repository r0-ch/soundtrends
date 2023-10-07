import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsServices } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent {

  posts$!: Observable<Array<any>>;

  constructor(private postsService: PostsServices) {}

  ngOnInit(): void {
    this.posts$ = this.postsService.getPosts();
  }
}
