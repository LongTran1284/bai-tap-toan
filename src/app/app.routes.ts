import { Routes } from '@angular/router';
import { BaitaptoanComponent } from './baitaptoan/baitaptoan.component';
import { ToansosanhComponent } from './toansosanh/toansosanh.component';
import { TilethucComponent } from './tilethuc/tilethuc.component';

export const routes: Routes = [
    {path: '', component: BaitaptoanComponent, title: 'nhan-chia-cong-tru'},
    {path: 'sosanh', component: ToansosanhComponent, title: 'toan-so-sanh'},
    {path: 'tilethuc', component: TilethucComponent, title: 'ti-le-thuc'}
];
