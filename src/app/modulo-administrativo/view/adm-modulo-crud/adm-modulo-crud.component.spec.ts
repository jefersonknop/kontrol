import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmModuloCrudComponent } from './adm-modulo-crud.component';

describe('AdmModuloCrudComponent', () => {
  let component: AdmModuloCrudComponent;
  let fixture: ComponentFixture<AdmModuloCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmModuloCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmModuloCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
