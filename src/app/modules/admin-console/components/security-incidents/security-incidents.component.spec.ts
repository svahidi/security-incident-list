import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityIncidentsComponent } from './security-incidents.component';

describe('SecurityIncidentsComponent', () => {
  let component: SecurityIncidentsComponent;
  let fixture: ComponentFixture<SecurityIncidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityIncidentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
