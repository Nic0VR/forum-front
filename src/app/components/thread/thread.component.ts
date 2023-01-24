import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Thread } from 'src/app/models/thread';
import { PostService } from 'src/app/service/post.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
})
export class ThreadComponent implements OnInit {
  constructor(
    private threadService: ThreadService,
    private postService: PostService
  ) {}

  ngOnInit(): void {

  }

  @Input()
  thread?: Thread;
  posts: Post[]=[];

  currentPage:number=1;
  max = 20;
  
  loadData() {
    this.postService.findPageByThreadId(this.thread!.id!,this.currentPage,this.max).subscribe({
      next:(v)=>{this.posts = this.posts.concat(v)},
      error:(e)=>{},
      complete:()=>{this.currentPage++}
    })
  }

}
