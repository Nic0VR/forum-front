import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/models/board';
import { Thread } from 'src/app/models/thread';
import { BoardService } from 'src/app/service/board.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css']
})
export class BoardDetailsComponent implements OnInit {


addThread(thread: Thread) {
this.threads.push(thread);
}

  constructor(private boardService: BoardService,
    private threadService:ThreadService,
    private route : ActivatedRoute){

  }
  ngOnInit(): void {
    this.loadData();
  }

  
  board?:Board;
  threads:Thread[]=[];
  page:number=1;
  max:number=5;
  search:string="";

  loadData(){
    this.route.params.subscribe(params =>{
      this.boardService.findById(params['id']).subscribe({
        next:(v)=>{this.board=v},
        error:(e)=>{console.log(e);},
        complete:()=>{
          this.loadThreads();
        }
      })
    } )
  }

  loadThreads(){
    this.threadService.findPageByBoardId(this.board!.id).subscribe({
      next:(v)=>{this.threads=v},
      error:(e)=>{console.log(e);}
    })
  }
}
