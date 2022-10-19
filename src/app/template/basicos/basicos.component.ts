import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

@ViewChild('miForm') miFormulario!: NgForm;

initForm = {
  producto: '', 
  precio: 0,
  existencias: 0
}

  constructor() { }

  ngOnInit(): void {
  }

  nombreValido(): boolean{
    return this.miFormulario?.controls.product?.invalid && this.miFormulario?.controls.product?.touched
  }

  precioValido(): boolean{
    return  this.miFormulario?.controls.precio?.touched && this.miFormulario?.controls.precio?.value < 0
  }

  guardar(){
    // console.log(this.miFormulario);
    // if(this.miFormulario.controls.precio.value < 0) {
    //   console.log('No posteado')
    //   return;
    // }
    this.miFormulario.resetForm({
      producto: '',
      precio: 0,
      existencias: 0
  });
  }
}
