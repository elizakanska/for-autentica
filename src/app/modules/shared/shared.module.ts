import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DemoNgZorroAntdModule } from '../../DemoNgZorroAntdModule';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    DemoNgZorroAntdModule,
    NgxSpinnerModule
  ], exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    DemoNgZorroAntdModule,
    NgxSpinnerModule
  ]
})
export class SharedModule { }
