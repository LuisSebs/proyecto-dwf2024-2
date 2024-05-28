import { Component } from '@angular/core';
import { Usuario } from '../_model/usuario';
import { HttpClient } from '@angular/common/http';
import { urlApiRegistroUsuario } from '../_helper/urls';
import { faBuilding, faEnvelope, faUser }  from '@fortawesome/free-solid-svg-icons';
import { faGlobe, faKey, faLocationArrow, faUserPlus, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SwalMessages } from '../../commons/_dto/swal-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  swal: SwalMessages = new SwalMessages();

  urlRegistro : string = urlApiRegistroUsuario;
  // usuario: Usuario = new Usuario();

  userIcon = faUser;
  surnameIcon = faUserPlus;
  addressIcon = faLocationArrow;
  mailIcon = faEnvelope;
  usernameIcon = faUserSecret;
  passwordIcon = faKey;
  regionIcon = faGlobe;
  rfcIcon = faBuilding;

  submitted = false;

  formRegister = this.formBuilder.group({
    name: ["", [Validators.required, Validators.pattern('[\\s]*[a-zA-Zñ]+[a-zA-Z\\sñ]*')]],
    surname: ["", [Validators.required, Validators.pattern('[\\s]*[a-zA-Zñ]+[a-zA-Z\\sñ]*')]],
    address: ["", [Validators.required]],
    mail: ["", [Validators.required, Validators.email]],
    username: ["", [Validators.required]],
    password: ["", [Validators.required]],
    region_id: [0, [Validators.required]],
    rfc: ["", [Validators.required, Validators.minLength(10)]],
    rol_id: [0, []]
  })

  constructor(
    private http : HttpClient, private router: Router,
    private formBuilder: FormBuilder
  ){}

  onSubmit(){

    console.log(this.formRegister.value);
    // console.log(this.usuario);

    if (this.formRegister.valid){
      this.http.post(this.urlRegistro, this.formRegister.value, {observe: 'body'}).subscribe(
        (response) => {
          console.log(JSON.stringify(response));   
          Swal.fire(
            {
              title: 'Usuario registrado',
              text: 'Usuario Registrado exitosamente',
              icon: 'success',
              showConfirmButton: true,
              
            }
          ).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            }     
        })
      },
        (error) => {
          console.log(error.error!.message);
          this.swal.errorMessage(error.error!.message);
        },
        () => {
          console.log('Bloque de codigo que se ejecuta siempre. Sin importar si se ejecuto con exito o con error');
        }
      )
    }    
  }

  tieneNumeros(str: string){
    const regex = /\d/;
    return regex.test(str);
  }
}

/**
 * Validador que verifica que no se contienen numeros
 * en una cadena.
 * @returns ValidatorFn
 */
export function noNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const hasNumbers = /\d/.test(control.value);
    return hasNumbers ? { 'hasNumbers': { value: control.value } } : null;
  };
}