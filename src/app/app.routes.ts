import { Routes } from '@angular/router';
import { BaitaptoanComponent } from './baitaptoan/baitaptoan.component';
import { ToansosanhComponent } from './toansosanh/toansosanh.component';

export const routes: Routes = [
    {path: '', component: BaitaptoanComponent, title: 'nhan-chia-cong-tru'},
    {path: 'sosanh', component: ToansosanhComponent, title: 'toan-so-sanh'}
];
