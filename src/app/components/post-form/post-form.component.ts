import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post';
import { Thread } from 'src/app/models/thread';
import { PostFormService } from 'src/app/service/post-form.service';
import { PostService } from 'src/app/service/post.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  constructor(
    private postService: PostService,
    private postFormService:PostFormService,
    private route:ActivatedRoute,
  ) {  }

  @Input()
  threadId!: number;

  @Output()
  postEmitter: EventEmitter<Post> = new EventEmitter<Post>();

  files: File[] = [];
  subscription!:Subscription
  text:string="";

  postFormGroup: FormGroup = new FormGroup({

    text: new FormControl('', Validators.required),
  });


  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if(params['resp']){
        this.handlePostReply(  params['resp']);
      }
 
    })
    
    this.subscription = this.postFormService.lastPost$.subscribe({
      next:(v)=>{
        this.handlePostReply(v);
      },
      error:(e)=>{},
      complete:()=>{}
    })
  }

  submitPost() {


    let regex = RegExp(/(>>[0-9]+)/gm)
    let matches = this.text.match(regex);
    let replyTo:number[]=[];

    if(matches){
      for(let match of matches){

        let id = match.substring(2);
        replyTo.push(Number.parseInt(id));
        
      }
    }
    
    let text = this.text;
    let post: Post = {
      text: text,
      id: 0,
      replyTo: replyTo,
      repliedBy: [],
      threadId: this.threadId
    };

    let formdata: FormData = new FormData();
   
    formdata.append('post', new Blob( [JSON.stringify(post)], {type:"application/json"}));
    for(let file of this.files){
      formdata.append("files",file as Blob);
    }
    this.postService.saveWithImage(formdata).subscribe({
      next: (v) => {
        this.postEmitter.emit(v);
      },
      error: (e) => {},
    });
  }

  handlePostReply(postId:number){
    this.text = this.text.concat("\n>>"+postId);
  }

  handleFileInput(event: Event, index: number) {
    const element = event.target as HTMLInputElement;
    let file: FileList | null = element.files;
    if (file?.item(0)) {
      this.files.splice(index, 1, file.item(0)!);
    }
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }
}
