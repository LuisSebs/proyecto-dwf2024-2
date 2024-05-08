import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SwalMessages } from '../../commons/_dto/swal-messages';

export const adminGuard: CanActivateFn = (route, state) => {

  let swal: SwalMessages = new SwalMessages();

  if (localStorage.getItem('user')){
    let user = JSON.parse(localStorage.getItem('user')!);
    if (user.rol == "ADMIN"){
      return true;
    }
  }

  inject(Router).navigate(['/']);
  swal.errorMessage('No tienes los persmisos para acceder a esta pagina');
  return true;
};
