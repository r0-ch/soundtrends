import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsServices } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent {
  title!: string;
  summary!: string;
  content!: string;
  id!: string;
  file!: any;
  fileName!: string;

  constructor(private postsService: PostsServices, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.postsService.getPostById(this.id).subscribe(post => {
      this.title = post.title;
      this.summary = post.summary;
      this.content = post.content;
      
      console.log(this.title)
    }

    );

  }

  setFile(event: any) {
    this.file = event.target.files[0];
    this.fileName = this.file.name;
    console.log(this.file)
  }

  onSubmit(e: any) {
    e.preventDefault();

    const formData = new FormData();

    formData.set('title', this.title);
    formData.set('summary', this.summary);
    formData.set('content', this.content);
    formData.set('_id', this.id);
    if (this.file) {
      formData.set('cover', this.file);
    }

    this.postsService.editPost(this.route.snapshot.params['id'], formData).subscribe(
      () => this.router.navigateByUrl(`posts/${this.id}`)
    )
  }
}
