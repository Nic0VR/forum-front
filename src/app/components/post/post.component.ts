import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileInfo } from 'src/app/models/file-info';
import { Post } from 'src/app/models/post';
import { FileService } from 'src/app/service/file.service';
import { PostFormService } from 'src/app/service/post-form.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  constructor(
    private fileService: FileService,
    private postFormService: PostFormService
  ) {}

  ngOnInit(): void {
    this.subscription = this.postFormService.lastPost$.subscribe({
      next:(v)=>{},
      error:(e)=>{},
      complete:()=>{}
    })
    if (this.post.files?.length) {
      this.loadFiles(this.post?.files!);
    }

   
  }
  @Input() post!: Post;
  @Input() inBoard?:boolean;
  files: ArrayBuffer[] = [];
  index: number = 0;
  subscription!:Subscription;
  
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

  replyTo(postId: number) {
    console.log("change post:"+postId);
    
    this.postFormService.changePost(postId);
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }
}
