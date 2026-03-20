import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComidaDetailsModalComponent } from './comida-details-modal.component';

describe('ComidaDetailsModalComponent', () => {
  let component: ComidaDetailsModalComponent;
  let fixture: ComponentFixture<ComidaDetailsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComidaDetailsModalComponent]
    });
    fixture = TestBed.createComponent(ComidaDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
