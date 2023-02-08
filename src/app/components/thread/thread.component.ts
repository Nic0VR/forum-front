import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FileInfo } from 'src/app/models/file-info';
import { Post } from 'src/app/models/post';
import { Thread } from 'src/app/models/thread';
import { FileService } from 'src/app/service/file.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
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
    private route: ActivatedRoute,
    private localService:LocalStorageService
  ) {}
    //TODO: send small version of image instead of real file until user click
  ngOnInit(): void {


    this.prefSubscription = this.localService.getPreferences().subscribe(p =>{
      this.max=p?.maxPostFetch||20;

      this.shouldLoadFiles=p?.displayImages!;
      if (this.thread.files?.length && this.shouldLoadFiles) {
        if(this.files.length) this.files=[];
        this.loadFilesPreview(this.thread?.files!);
      }else{
        this.files=[];
      }
    })


    this.countPostsInThread(this.thread.id!);

    this.postEventSubscription = this.addPostEvent?.subscribe({
      next: (v) => {
        this.handleAddPost(v);
      },
      error: (e) => {},
    });
    this.filesBuffer = Array(this.thread.files?.length);

  }

  @Input()
  thread!: Thread;

  @Input()
  inBoard?: boolean;

  @Input()
  addPostEvent?: Observable<Post>;
  filesBuffer: ArrayBuffer[] = [];
  private postEventSubscription?: Subscription;
  private prefSubscription!:Subscription;
  posts: Post[] = [];
  hiddenPosts: Post[] = [];
  files: ArrayBuffer[] = [];
  currentPage: number = 1;
  max = 25;
  index: number = 0;
  isPostsVisible: boolean = true;
  countPosts?: number;
  replyPreview?: Post;
  shouldLoadFiles!:boolean;
  
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

  loadFilesPreview(files: FileInfo[]) {
    for (const { index, fileInfo } of files.map((fileInfo, index) => ({
      index,
      fileInfo,
    }))) {
      this.fileService
        .downloadFile(fileInfo.prefiewFileName || fileInfo.fileName)
        .subscribe({
          next: (v) => {
            this.createImageFromBlob(v, index);
          },
          error: (e) => {},
          complete: () => {},
        });
    }
  }

  createImageFromBlob(image: Blob, index: number) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        if (reader.result) {
          this.files.splice(index, 0, reader.result! as ArrayBuffer);
        }
      },
      false
    );
    if (image) {
      reader.readAsDataURL(image);
    }
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
    this.posts = [];
  }

  loadPostsOnStartup() {
    this.route.queryParams.subscribe((params) => {
      if (params['show']) {
        this.loadMorePosts();
      }
    });
  }

  handleShowReply(obj: { number: number; mouseEvent: MouseEvent }) {
    let PostToShow: Post | undefined = this.posts
      .filter((post) => post.id == obj.number)
      .pop();

    this.replyPreview = PostToShow;
  }

  ngOnDestroy() {
    this.postEventSubscription?.unsubscribe();
  }

  toggleImageSize(img: ArrayBuffer) {
    let index = this.files.findIndex((f) => f === img);

    if (!this.filesBuffer[index]) {
      this.fileService
        .downloadFile(this.thread.files![index].fileName)
        .subscribe({
          next: (image) => {
            let reader = new FileReader();
            reader.addEventListener(
              'load',
              () => {
                if (reader.result) {
                  if (this.files[index]) {
                    let buffer = this.files[index];
                    this.files.splice(index, 1, reader.result as ArrayBuffer);
                    this.filesBuffer.splice(index, 1, buffer);
                  }
                }
              },
              false
            );
            if (image) {
              reader.readAsDataURL(image);
            }
          },
          error: (e) => {},
          complete: () => {},
        });
    } else {
      let buffer = this.files[index]; // old image
      this.files.splice(index, 1, this.filesBuffer[index]);
      this.filesBuffer.splice(index, 1, buffer);
    }
  }
}
