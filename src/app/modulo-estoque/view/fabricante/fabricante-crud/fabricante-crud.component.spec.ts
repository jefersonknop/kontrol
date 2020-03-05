import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricanteCrudComponent } from './fabricante-crud.component';

describe('FabricanteCrudComponent', () => {
  let component: FabricanteCrudComponent;
  let fixture: ComponentFixture<FabricanteCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricanteCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricanteCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
