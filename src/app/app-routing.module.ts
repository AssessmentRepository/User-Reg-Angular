import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path: "signin", component: SigninComponent },
  { path: "register", component: RegisterComponent },
  { path: "admin",component: AdminComponent },
  { path: "**", redirectTo: "signin" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
