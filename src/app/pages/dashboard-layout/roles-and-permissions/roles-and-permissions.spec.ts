import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesAndPermissions } from './roles-and-permissions';

describe('RolesAndPermissions', () => {
  let component: RolesAndPermissions;
  let fixture: ComponentFixture<RolesAndPermissions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesAndPermissions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesAndPermissions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
