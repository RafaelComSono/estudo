import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FingerSpeedComponent } from './finger-speed.component';

describe('FingerSpeedComponent', () => {
  let component: FingerSpeedComponent;
  let fixture: ComponentFixture<FingerSpeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FingerSpeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FingerSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
