import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightClubComponent } from './fight-club.component';

describe('FightClubComponent', () => {
  let component: FightClubComponent;
  let fixture: ComponentFixture<FightClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FightClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FightClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
