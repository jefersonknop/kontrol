import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoMarcaCrudComponent } from './produto-marca-crud.component';

describe('ProdutoMarcaCrudComponent', () => {
  let component: ProdutoMarcaCrudComponent;
  let fixture: ComponentFixture<ProdutoMarcaCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoMarcaCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoMarcaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
