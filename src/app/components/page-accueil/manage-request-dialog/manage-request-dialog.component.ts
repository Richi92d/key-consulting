import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-manage-request-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './manage-request-dialog.component.html',
  styleUrl: './manage-request-dialog.component.scss'
})
export class ManageRequestDialogComponent implements OnInit, OnDestroy {

  private data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ManageRequestDialogComponent>);
  private destroy$: Subject<void> = new Subject<void>();

  public isUpdate: boolean = false;

  public form: FormGroup = new FormGroup({
    work: new FormControl<string>('', Validators.required),
    user: new FormControl<string>('', Validators.required),
    contract: new FormControl<number>(0, [Validators.required, Validators.maxLength(10), Validators.pattern(/^[0-9]\d*$/)
    ]),
  });

  public ngOnInit(): void {
    if (this.data?.mode) {
      this.isUpdate = true;
    }
    this.setDataToForm();
    this.setupContractField();
  }

  public save() {
    this.dialogRef.close(this.form.value);
  }

  public cancel() {
    this.dialogRef.close(null);
  }

  /**
   * Configure le champ "contract" pour ne permettre que des valeurs numériques.
   * Les caractères non numériques sont automatiquement supprimés.
   */
  public setupContractField() {
    this.form.get('contract')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      const filteredValue = value.replace(/[^0-9]/g, '');
      if (value !== filteredValue) {
        this.form.get('contract')?.setValue(filteredValue);
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Met à jour le formulaire avec les données si le mode est "update".
   */
  private setDataToForm() {
    if (this.isUpdate)
      this.form.patchValue({ ...this.data.item });
  }

}
