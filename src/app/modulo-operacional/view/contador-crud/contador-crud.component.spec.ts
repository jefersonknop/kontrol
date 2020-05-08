import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadorCrudComponent } from './contador-crud.component';

describe('ContadorCrudComponent', () => {
  let component: ContadorCrudComponent;
  let fixture: ComponentFixture<ContadorCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContadorCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContadorCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
