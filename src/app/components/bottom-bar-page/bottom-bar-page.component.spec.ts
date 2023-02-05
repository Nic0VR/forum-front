import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomBarPageComponent } from './bottom-bar-page.component';

describe('BottomBarPageComponent', () => {
  let component: BottomBarPageComponent;
  let fixture: ComponentFixture<BottomBarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomBarPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomBarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
