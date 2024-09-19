import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRequestDialogComponent } from './manage-request-dialog.component';

describe('ManageRequestDialogComponent', () => {
  let component: ManageRequestDialogComponent;
  let fixture: ComponentFixture<ManageRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageRequestDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
