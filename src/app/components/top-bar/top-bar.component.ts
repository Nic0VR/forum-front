import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from 'src/app/models/board';
import { BoardService } from 'src/app/service/board.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit{


  constructor(private boardService: BoardService,
            private loginService:LoginService
   ){

  }
  ngOnInit(): void {
    this.loadPage();
    this.username=this.loginService.currentUserValue.username;

  }


  username?:string

  boards:Board[]=[]; // data array
  boards$?:Observable<Board[]> 
  max=5; // max amount of boards displayed in top bar


  loadPage(){
    this.boardService.findPage(undefined,this.max,undefined).subscribe({
      next:(v=>{ this.boards=v}),
      error:(e=>{
        console.log(e);
        
      })
    })
  }

  logout(){
    this.loginService.logout();
  }
}
