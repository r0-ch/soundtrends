import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDetailsComponent } from './comment-details.component';

describe('PostCommentDetailsComponent', () => {
  let component: CommentDetailsComponent;
  let fixture: ComponentFixture<CommentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentDetailsComponent]
    });
    fixture = TestBed.createComponent(CommentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
