import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoPageComponent } from './mercado-page.component';

describe('MercadoPageComponent', () => {
  let component: MercadoPageComponent;
  let fixture: ComponentFixture<MercadoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MercadoPageComponent]
    });
    fixture = TestBed.createComponent(MercadoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
