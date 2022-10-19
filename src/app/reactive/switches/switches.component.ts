import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {
  
  miFormulario: FormGroup = this.fb.group({
    genero: [ 'M', Validators.required ],
    notificaciones: [ true , Validators.required ],
    condiciones : [false,  Validators.requiredTrue ]
  });

  persona = {
    genero: 'F',
    notificaciones: true
  }
  
  // miFormulario: FormGroup = this.fb.group({
  //   genero: [ this.persona.genero, Validators.required ],
  //   notificaciones: [ this.persona.notificaciones , Validators.required ]
  // });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.miFormulario.reset({
      ...this.persona,
    condiciones: false
    });
    this.miFormulario.valueChanges.subscribe( ({ condiciones, ...restoDeArgumentos }) => { //extraigo condiciones como una variable independiente, y todos los demas argumentos caen en ese hueco de restoDeArgumentos 
      //delete form.condiciones;
      this.persona = restoDeArgumentos;
    })
    // this.miFormulario.valueChanges.subscribe( form => {
    //   delete form.condiciones;
    //   this.persona = form;
    //   console.log(form);
    // })
    // this.miFormulario.get('condiciones')?.valueChanges.subscribe( newValue => {
    //   console.log(newValue);
    // })
  }

  guardar(){
    const formValue = {...this.miFormulario.value };
    //eliminar condiciones
    delete formValue.condiciones;
    this.persona = formValue;
    console.log(formValue);
  }
 

}
