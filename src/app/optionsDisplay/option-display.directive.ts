import {
  ApplicationRef,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { OptionDisplayComponent } from './option-display/option-display.component';

@Directive({
  selector: '[appOptionDisplay]',
})
export class OptionDisplayDirective {
  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private viewContainerRef: ViewContainerRef
  ) {}

  @Input()
  appOptionDisplay!: string;

  private componentRef: ComponentRef<any> | null = null;

  @HostListener('click', ['$event'])
  onClick($event: Event) {
    console.log("CLICKED OPTIONS");
    
    if (
      this.componentRef === null &&
      $event.target instanceof Element &&
      ($event.target as Element).tagName == 'A'
    ) {
      this.componentRef =
        this.viewContainerRef.createComponent(OptionDisplayComponent);

      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

      document.body.appendChild(domElem);
      this.setDisplayOptionsComponentProperties();
    }
  }

  @HostListener('window:closeOptionDisplayEvent',['$event'])
  onClose($event:Event){
    console.log("RECEIVED");
    
    this.destroy();
  }

  private setDisplayOptionsComponentProperties() {
    if (this.componentRef !== null) {
      // this.componentRef.instance.post = this.post;

      const { left, right, bottom } =
        this.elementRef.nativeElement.getBoundingClientRect();
      this.componentRef.instance.left = (right - left) / 2 + left;
      this.componentRef.instance.top = bottom;
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.componentRef !== null) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
