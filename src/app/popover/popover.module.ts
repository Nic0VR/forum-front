import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostPopoverComponent } from './post-popover/post-popover.component';
import { PopoverPostDirective } from './popover-post.directive';



@NgModule({
  declarations: [
    PostPopoverComponent,
    PopoverPostDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[PopoverPostDirective]
})
export class PopoverModule { }
