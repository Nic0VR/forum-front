import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostPopoverComponent } from '../components/post-popover/post-popover.component';
import { PopoverPostDirective } from '../directives/popover-post.directive';



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
