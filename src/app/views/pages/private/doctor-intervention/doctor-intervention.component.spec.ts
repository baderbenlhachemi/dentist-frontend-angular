import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorInterventionComponent } from './doctor-intervention.component';

describe('DoctorInterventionComponent', () => {
  let component: DoctorInterventionComponent;
  let fixture: ComponentFixture<DoctorInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorInterventionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
