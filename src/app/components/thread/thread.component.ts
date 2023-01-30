import { Component, Input, OnInit } from '@angular/core';
import { FileInfo } from 'src/app/models/file-info';
import { Post } from 'src/app/models/post';
import { Thread } from 'src/app/models/thread';
import { FileService } from 'src/app/service/file.service';
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
    private postService: PostService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    if (this.thread.files?.length) {
      this.loadFiles(this.thread?.files!);
    }
    this.countPostsInThread(this.thread.id!);
  }

  @Input()
  thread!: Thread;
  posts: Post[] = [];
  hiddenPosts: Post[] = [];
  files: ArrayBuffer[] = [];
  currentPage: number = 1;
  max = 25;
  index: number = 0;
  isPostsVisible: boolean = true;
  countPosts?: number;

  loadMorePosts() {
    if(this.hiddenPosts.length ){
      this.posts=this.posts.concat(this.hiddenPosts.splice(0,Math.min(this.max,this.hiddenPosts.length)));
    }else{
      this.postService
      .findPageByThreadId(this.thread!.id!, this.currentPage, this.max)
      .subscribe({
        next: (v) => {
          this.posts = this.posts.concat(v);
        },
        error: (e) => {},
        complete: () => {
          this.currentPage++;
        },
      });
    }
    
  }

  loadFiles(files: FileInfo[]) {
    for (let fileInfo of files) {
      this.fileService.downloadFile(fileInfo.fileName).subscribe({
        next: (v) => {
          this.createImageFromBlob(v);
        },
        error: (e) => {},
        complete: () => {},
      });
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        if (reader.result) {
          this.files.splice(this.index, 1, reader.result! as ArrayBuffer);
          this.index++;
        }
      },
      false
    );
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  switchVisiblePosts() {
    this.isPostsVisible = !this.isPostsVisible;
  }

  countPostsInThread(threadId: number) {
    this.postService.countByThreadId(threadId).subscribe({
      next: (v) => {
        this.countPosts = v.count;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  hidePosts() {
    this.hiddenPosts = this.posts;
    this.posts = [];
    // calcul page en fonction du max et du nombre d'items dans hiddenposts
    this.currentPage = Math.round((this.hiddenPosts.length/this.max)) +1 ;

  }
}
