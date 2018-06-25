import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NoteTakerComponent} from './notetaker/notetaker.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'notes', component: NoteTakerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: NoteTakerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}