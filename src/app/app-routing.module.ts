import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChataiComponent } from './chatai/chatai.component'

const routes: Routes = [
  { path: 'chatai', component: ChataiComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }