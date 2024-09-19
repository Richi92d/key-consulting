import { Routes } from '@angular/router';
import { PageAccueilComponent } from './components/page-accueil/page-accueil.component';

export const routes: Routes = [
    { path: '', redirectTo: 'accueil', pathMatch: 'full' },
    { path: 'accueil', component: PageAccueilComponent },
];
