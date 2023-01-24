import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { Thread } from 'src/app/models/thread';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {


  constructor(private threadService: ThreadService){

  }
  
  @Input()
  boardId!:number;
  @Output()
  threadEmitter: EventEmitter<Thread> = new EventEmitter<Thread>();

  postFormGroup:FormGroup = new FormGroup({
    title:new FormControl('',Validators.required),
    text:new FormControl('',Validators.required)
  })

  ngOnInit(): void {
    
  }

  submitThread(){
    let title = this.postFormGroup.get('title')?.value;
    let text = this.postFormGroup.get('text')?.value;
    let thread : Thread= {title:title,text:text,boardId:this.boardId }
    this.threadService.save(thread).subscribe({
      next:(v)=>{this.threadEmitter.emit(v)},
      error:(e)=>{}
    })
  }

}
