import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { FormatCPFPipe } from './pipes/format-cpf.pipe';

import { CpfFormatterDirective } from './directives/cpf-formatter.directive';

@NgModule({
  declarations: [FormatDatePipe, FormatCPFPipe, CpfFormatterDirective],
  imports: [CommonModule],
  exports: [FormatDatePipe, CpfFormatterDirective, FormatCPFPipe],
})
export class SharedModule {}
