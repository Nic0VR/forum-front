import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/models/board';
import { BoardService } from 'src/app/service/board.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit{

  constructor(private boardService:BoardService){

  }
  ngOnInit(): void {
    this.loadPage();
  }
  page?:number;
  max? : number;
  search?:string;
  boards:Board[]=[];

  loadPage(){
    this.boardService.findPage().subscribe({
      next:(v=>{ this.boards=v})
    })
  }
}
