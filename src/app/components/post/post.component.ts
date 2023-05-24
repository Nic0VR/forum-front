/* The PostComponent class is an Angular component that displays a post and its associated files, and
allows for replying to the post. */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileInfo } from 'src/app/models/file-info';
import { Post } from 'src/app/models/post';
import { FileService } from 'src/app/service/file.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { PostFormService } from 'src/app/service/post-form.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  constructor(
    private fileService: FileService,
    private postFormService: PostFormService,
    private localService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.prefSubscription = this.localService
      .getPreferences()
      .subscribe((p) => {
        this.shouldLoadFiles = p?.displayImages!;

        if (this.post.files?.length && this.shouldLoadFiles) {
          this.loadFilesPreview(this.post?.files!);
        } else {
          this.files = [];
        }
      });
      this.filesBuffer = Array(this.post.files?.length);
  }
  @Input() post!: Post;

  @Input() inBoard?: boolean;
  @Output() showReplyEmitter: EventEmitter<{
    number: number;
    mouseEvent: MouseEvent;
  }> = new EventEmitter<{ number: number; mouseEvent: MouseEvent }>();
  @Input()
  replyPreview?: Post;

  files: ArrayBuffer[] = [];
  filesBuffer: ArrayBuffer[] = [];
  prefSubscription!: Subscription;
  shouldLoadFiles!: boolean;

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

  /**
   * This function creates an image from a Blob object and inserts it into an array at a specified
   * index.
   * 
   * Args:
   *   image (Blob): The image parameter is a Blob object, which represents a file-like object of
   * immutable, raw data. It can be an image file in this case.
   *   index (number): The index parameter is a number that represents the position in an array where
   * the result of the FileReader will be inserted. In this case, it is used to insert the result of
   * the FileReader into the files array at a specific index.
   */
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

  /**
   * The function toggles the size of an image by replacing its ArrayBuffer with a larger or smaller
   * one.
   * 
   * Args:
   *   img (ArrayBuffer): The `img` parameter is an `ArrayBuffer` representing an image file.
   */
  toggleImageSize(img: ArrayBuffer) {
    let index = this.files.findIndex((f) => f === img);

    if (!this.filesBuffer[index]) {
      this.fileService
        .downloadFile(this.post.files![index].fileName)
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

  replyTo(postId: number) {
    this.postFormService.changePost(postId);
  }

  ngOnDestroy() {
    this.prefSubscription.unsubscribe();
  }

  changeReplyPreview(id: number, e: MouseEvent) {
    this.showReplyEmitter.emit({ number: id, mouseEvent: e });
  }
  hideReply() {}
}
