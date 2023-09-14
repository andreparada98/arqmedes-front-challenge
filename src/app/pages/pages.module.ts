import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from 'src/shared/header/header.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [PagesComponent, HeaderComponent],
  imports: [CommonModule, PagesRoutingModule, MaterialModule],
})
export class PagesModule {}
