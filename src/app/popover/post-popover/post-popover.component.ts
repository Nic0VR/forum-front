import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-popover',
  templateUrl: './post-popover.component.html',
  styleUrls: ['./post-popover.component.css']
})
export class PostPopoverComponent implements OnInit{

  constructor(){

  }

  ngOnInit(): void {

  }

  post!:Post
  @Input() files: ArrayBuffer[] = [];

  left:number=0;
  top:number=0;
  index: number = 0;

}
