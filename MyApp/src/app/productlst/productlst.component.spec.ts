import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductlstComponent } from './productlst.component';

describe('ProductlstComponent', () => {
  let component: ProductlstComponent;
  let fixture: ComponentFixture<ProductlstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductlstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductlstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
