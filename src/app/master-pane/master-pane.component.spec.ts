import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPaneComponent } from './master-pane.component';

describe('MasterPaneComponent', () => {
  let component: MasterPaneComponent;
  let fixture: ComponentFixture<MasterPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
