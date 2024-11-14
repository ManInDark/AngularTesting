import { Routes } from '@angular/router';
import { TodoComponent } from './todo/component';
import { LoginComponent } from './login/component';

export const routes: Routes = [{
    path: "todo",
    title: "Todo",
    component: TodoComponent
}, {
    path: "login",
    title: "Login",
    component: LoginComponent
},{
    path: "",
    redirectTo: "todo",
    pathMatch: "full"
}];
