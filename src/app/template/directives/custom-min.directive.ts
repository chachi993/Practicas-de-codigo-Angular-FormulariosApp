import { Directive, Input } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
    selector: '[customMin][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CustomMinDirective,
        multi: true
    }]
})
export class CustomMinDirective implements Validator{
@Input() minimo!: number;

constructor(){
    console.log(this.minimo);
}
    validate(control:FormControl) { //control es el elemento del input
       const inputValue = control.value;
       console.log(inputValue);
       return ( inputValue  < this.minimo)? { 'customMin': true }: null; // null de ningun error
    }
}