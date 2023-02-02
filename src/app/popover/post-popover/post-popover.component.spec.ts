import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPopoverComponent } from './post-popover.component';

describe('PostPopoverComponent', () => {
  let component: PostPopoverComponent;
  let fixture: ComponentFixture<PostPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostPopoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
