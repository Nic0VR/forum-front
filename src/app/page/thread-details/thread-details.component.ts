import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Post } from 'src/app/models/post';
import { Thread } from 'src/app/models/thread';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-thread-details',
  templateUrl: './thread-details.component.html',
  styleUrls: ['./thread-details.component.css'],
})
export class ThreadDetailsComponent implements OnInit {
  thread?: Thread;
  addPostEventSubject:Subject<Post> = new Subject<Post>();

  constructor(
    private threadService: ThreadService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.route.params.subscribe(params =>{
      this.threadService.findById(params["id"]).subscribe({
        next:(v)=>{this.thread=v},
        error:(e)=>{}
      })
    })
  }

  handlePostAdded(post:Post){
    
    this.addPostEventSubject.next(post);
  }
}
