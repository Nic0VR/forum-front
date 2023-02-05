import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bottom-bar-page',
  templateUrl: './bottom-bar-page.component.html',
  styleUrls: ['./bottom-bar-page.component.css']
})
export class BottomBarPageComponent implements OnChanges{
 

  @Input() currentPage!:number;
  @Input() max!:number;
  @Input() countItem!:number;
  pageNumber=0;
  @Output() changePageEventEmitter:EventEmitter<number> = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    this.pageNumber = Math.ceil( this.countItem/this.max);

    
  }

  next(){
    this.changePageEventEmitter.emit(++this.currentPage);
  }

  prev(){
    this.changePageEventEmitter.emit(--this.currentPage);
  }

  goto(page:number){
    this.changePageEventEmitter.emit(page);
  }
}
