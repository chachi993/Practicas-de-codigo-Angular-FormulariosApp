import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {
  
miFormulario: FormGroup = this.fb.group({
  nombre: ['', [Validators.required, Validators.minLength(3)] ],
  favoritos: this.fb.array ( [
    [' Metal Gear', Validators.required ],
    [ ' Death Strandign' , Validators.required ]
  ], Validators.required )
});

//una manera
//nuevoFavorito: FormControl =new FormControl;
nuevoFavorito: FormControl = this.fb.control('', Validators.required);

get favoritosArr(){
  return this.miFormulario.get('favoritos') as FormArray; //casteo
}

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

    campoNoEsValido(campo: string){
      return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
    }

    guardar(){
      if(this.miFormulario.controls.invalid) {
        this.miFormulario.markAllAsTouched();
        return;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
}

  agregarFavorito() {
    if ( this.nuevoFavorito.invalid ) { return; }

    // this.favoritosArr.push( new FormControl( this.nuevoFavorito.value, Validators.required ) );
    this.favoritosArr.push( this.fb.control(this.nuevoFavorito.value, Validators.required ) );
    this.nuevoFavorito.reset();
  }

  borrar(i: number){
     this.favoritosArr.removeAt(i);
  }
}
