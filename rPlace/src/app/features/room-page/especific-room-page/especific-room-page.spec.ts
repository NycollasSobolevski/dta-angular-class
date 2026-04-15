import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecificRoomPage } from './especific-room-page';

describe('EspecificRoomPage', () => {
  let component: EspecificRoomPage;
  let fixture: ComponentFixture<EspecificRoomPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecificRoomPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EspecificRoomPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
