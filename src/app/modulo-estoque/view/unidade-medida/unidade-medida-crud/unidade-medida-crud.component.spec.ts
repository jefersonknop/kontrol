import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeMedidaCrudComponent } from './unidade-medida-crud.component';

describe('UnidadeMedidaCrudComponent', () => {
  let component: UnidadeMedidaCrudComponent;
  let fixture: ComponentFixture<UnidadeMedidaCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadeMedidaCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeMedidaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
