import { Routes } from '@angular/router';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { ListComponent } from './components/players/list/list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ListComponent },
    ],
  },
];
