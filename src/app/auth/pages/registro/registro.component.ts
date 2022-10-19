import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';

import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: []
})
export class RegistroComponent implements OnInit {
  
miFormulario: FormGroup = this.fb.group({
  nombre: [ '', [Validators.required, Validators.pattern( this.validatorService.nombreApellidoPattern )] ],
  email: [ '', [Validators.required, Validators.pattern( this.validatorService.emailPattern )], this.emailValidator ],
  username: [ '', [Validators.required, this.validatorService.noPuedeSerStrider] ],
  password: [ '', [Validators.required], Validators.minLength(6) ],
  password2: [ '', [Validators.required],  ]
},{
  Validators: []
});


  get emailErrorMsg(): string{
    const errors = this.miFormulario.get('email')?.errors;
    if( errors?.required ){
      return 'Email es obligatorio';
    } else if ( errors?.pattern ) {
      return 'El valor ingresado no tiene el formato de correo';
    }else if ( errors?.tomado ){
      return 'Ese correo no está disponible';
    } 
    return '';
  }

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService
    ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Sabrina Taramaco',
      email: 'sabrinataramasco@gmail.com',
      username: 'sabrinataramasco',
      password: '123456',
      password2: '123456'
    }
    );
  }

  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid &&
    this.miFormulario.get(campo)?.touched; //por si no existe
  }

  guardar(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched(); 
  }

  // emailRequired(){
  //   return this.miFormulario.get('email')?.errors?.required &&
  //   this.miFormulario.get('email')?.touched;
  // }

  // emailFormato(){
  //   return this.miFormulario.get('email')?.errors?.pattern &&
  //   this.miFormulario.get('email')?.touched;
  // }

  // emailTomado(){
  //   return this.miFormulario.get('email')?.errors?.emailTomado &&
  //   this.miFormulario.get('email')?.touched;
  // }
}
