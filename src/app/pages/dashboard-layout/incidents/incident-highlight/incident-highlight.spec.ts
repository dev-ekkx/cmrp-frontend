import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentHighlight } from './incident-highlight';

describe('IncidentHighlight', () => {
  let component: IncidentHighlight;
  let fixture: ComponentFixture<IncidentHighlight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentHighlight]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentHighlight);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
