import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FileInfo } from 'src/app/models/file-info';
import { Post } from 'src/app/models/post';
import { Thread } from 'src/app/models/thread';
import { FileService } from 'src/app/service/file.service';
import { PostService } from 'src/app/service/post.service';
import { ThreadService } from 'src/app/service/thread.service';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
})
export class ThreadComponent implements OnInit {
  constructor(
    private threadService: ThreadService,
    private postService: PostService,
    private fileService: FileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.thread.files?.length) {
      this.loadFiles(this.thread?.files!);
    }
    this.countPostsInThread(this.thread.id!);

    this.postEventSubscription = this.addPostEvent?.subscribe({
      next: (v) => {
        this.handleAddPost(v);
      },
      error: (e) => {},
    });
  }

  @Input()
  thread!: Thread;

  @Input()
  inBoard?: boolean;

  @Input()
  addPostEvent?: Observable<Post>;

  private postEventSubscription?: Subscription;
  posts: Post[] = [];
  hiddenPosts: Post[] = [];
  files: ArrayBuffer[] = [];
  currentPage: number = 1;
  max = 25;
  index: number = 0;
  isPostsVisible: boolean = true;
  countPosts?: number;
  replyPreview?:Post;
  loadMorePosts() {
    if (this.hiddenPosts.length) {
      this.posts = this.posts.concat(
        this.hiddenPosts.splice(0, Math.min(this.max, this.hiddenPosts.length))
      );
    } else {
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
      error: (e) => {},
      complete: () => {
        this.loadPostsOnStartup();
      },
    });
  }

  hidePosts() {
    this.hiddenPosts = this.posts;
    this.posts = [];
    // calcul page en fonction du max et du nombre d'items dans hiddenposts
    this.currentPage = Math.round(this.hiddenPosts.length / this.max) + 1;
  }

  handleAddPost(post: Post) {
    this.countPosts!++;
    this.loadMorePosts();
  }

  loadPostsOnStartup() {
    this.route.queryParams.subscribe((params) => {
      if (params['show']) {
        this.loadMorePosts();
      }
    });
  }

  //TODO:fix
  handleShowReply(obj:{number:number,mouseEvent:MouseEvent} ){
    let PostToShow:Post|undefined = this.posts.filter(post => post.id==obj.number).pop();
   
   this.replyPreview= PostToShow;
  }

  ngOnDestroy() {
    this.postEventSubscription?.unsubscribe();
  }
}
