import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIncidents } from './my-incidents';

describe('MyIncidents', () => {
  let component: MyIncidents;
  let fixture: ComponentFixture<MyIncidents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyIncidents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyIncidents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
