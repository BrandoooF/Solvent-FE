import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintFinalComponent } from './print-final.component';

describe('PrintFinalComponent', () => {
  let component: PrintFinalComponent;
  let fixture: ComponentFixture<PrintFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
