import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationRuleComponent } from './medication-rule.component';

describe('MedicationRuleComponent', () => {
  let component: MedicationRuleComponent;
  let fixture: ComponentFixture<MedicationRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
