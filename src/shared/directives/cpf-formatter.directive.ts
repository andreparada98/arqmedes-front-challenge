import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[cpfFormatter]',
})
export class CpfFormatterDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;

    this.el.nativeElement.value = this.formatCPF(initialValue);
    event.preventDefault();
  }

  formatCPF(cpf: string): string {
    const nums = cpf.replace(/\D/g, '');
    if (nums.length <= 11) {
      return nums.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
  }
}
