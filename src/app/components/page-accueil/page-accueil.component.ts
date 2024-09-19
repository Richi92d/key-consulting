import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Mode } from './enums/manage-risk.enum';
import { ManageRisk } from './interfaces/manage-risk.model';
import { ManageRequestDialogComponent } from './manage-request-dialog/manage-request-dialog.component';

@Component({
  selector: 'app-page-accueil',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule
  ],
  templateUrl: './page-accueil.component.html',
  styleUrl: './page-accueil.component.scss'
})
export class PageAccueilComponent {

  private dialog = inject(MatDialog);

  public manageList: ManageRisk[] = [
    { work: 'ttt', user: 'test', contract: 255665 }
  ];

  public createRisk() {
    const dialogRef = this.dialog.open(ManageRequestDialogComponent, {
      width: '540px',
      height: '476px',
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null) {
        this.manageList.push(result)
      }
    });
  }

  public updateRisk(item: ManageRisk) {
    const dialogRef = this.dialog.open(ManageRequestDialogComponent, {
      width: '540px',
      height: '476px',
      data: { item, mode: Mode.UPDATE },
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((result: ManageRisk) => {
      if (result !== null) {
        const index = this.manageList.indexOf(item);
        if (index > -1) {
          // Met à jour l'élément avec les nouvelles valeurs
          this.manageList[index] = result;
        }
      }
    });
  }

  public deleteRisk(item: ManageRisk) {
    const index = this.manageList.indexOf(item);
    if (index > -1) {
      this.manageList.splice(index, 1);
    }
  }

}