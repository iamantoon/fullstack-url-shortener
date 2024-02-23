import { Component, EventEmitter, Input, Output, Self } from '@angular/core';
import { LinkParams } from '../_models/linkParams';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements ControlValueAccessor {
  @Output() loadLinks = new EventEmitter();
  @Output() resetFilters = new EventEmitter();
  @Input() linkParams: LinkParams | undefined;

  constructor(@Self() public ngControl: NgControl){
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  load(){
    this.loadLinks.emit();
  }

  reset(){
    this.resetFilters.emit();
  }
}