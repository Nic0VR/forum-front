import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionDisplayComponent } from './option-display/option-display.component';
import { OptionDisplayDirective } from './option-display.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OptionDisplayComponent,
    OptionDisplayDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[OptionDisplayDirective]
})
export class OptionDisplayModule { }
