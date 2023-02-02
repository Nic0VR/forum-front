import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Injector,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { PostPopoverComponent } from './post-popover/post-popover.component';
import { PostComponent } from '../components/post/post.component';
import { Post } from '../models/post';

@Directive({
  selector: '[post]',
})
export class PopoverPostDirective {
  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector
  ) {}

  @Input() post?: Post;
  private componentRef: ComponentRef<any> | null = null;

  private unsubscribe = new Subject();

  @HostListener('mouseenter',["$event"])
  onMouseEnter($event:Event): void {

    if (this.componentRef === null && $event.target instanceof Element && ($event.target as Element).tagName=="A") {
      this.componentRef =
        this.viewContainerRef.createComponent(PostPopoverComponent);


      
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
      
      document.body.appendChild(domElem);
      this.setTooltipComponentProperties();
    }
  }

  private setTooltipComponentProperties() {
    if (this.componentRef !== null) {
      this.componentRef.instance.post = this.post;      
      const { left, right, bottom } =
        this.elementRef.nativeElement.getBoundingClientRect();
      this.componentRef.instance.left = (right - left) / 2 + left;
      this.componentRef.instance.top = bottom;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
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
