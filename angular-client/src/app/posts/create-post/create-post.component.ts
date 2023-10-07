import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsServices } from 'src/app/core/services/posts.services';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  title!: string;
  summary!: string;
  content!: string;
  file!: any;
  fileName!: string;
  error!: string;

  constructor(private postsService: PostsServices, private router: Router) { }

  ngOnInit() {

  }

  setFile(event: any) {
    this.file = event.target.files[0];
    this.fileName = this.file.name;
  }

  onSubmit(e: any) {
    e.preventDefault();

    const formData = new FormData();

    formData.set('title', this.title);
    formData.set('summary', this.summary);
    formData.set('content', this.content);
    formData.set('cover', this.file);

    this.postsService.createPost(formData).subscribe({
      next: (responseBody) => {
        this.router.navigateByUrl(`posts/${responseBody._id}`);

        console.log(responseBody)
      },
      error: (responseBody) => {
        this.error = responseBody.error.error;
        console.log(this.error)
        
      }
    })
  }
}

