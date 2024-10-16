import { Routes } from '@angular/router';
import { AppComponent } from './secondpage';
import { HomeComponent } from './app.component';
import { FormComponent } from './form.component';
import { TodoComponent } from './todo.component';
import { LoginComponent } from './login.component';

export const routes: Routes = [{
    path: '',
    title: 'Root',
    component: HomeComponent
}, {
    path: 'second',
    title: 'Second',
    component: AppComponent
}, {
    path: "form",
    title: "Form",
    component: FormComponent
}, {
    path: "todo",
    title: "Todo",
    component: TodoComponent
}, {
    path: "login",
    title: "Login",
    component: LoginComponent
}];
