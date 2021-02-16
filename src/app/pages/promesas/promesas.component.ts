import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getUsuarios().then(usuarios => {console.log(usuarios)});


    // // Ejemplo promesas
    // const promesa = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('HOLA MUNDO');
    //   } else {
    //     reject('Algo salio mal');
    //   }
    // });

    // promesa
    //   .then((mensaje) => {
    //     console.log('Lo que recibimos del resolve --> ' + mensaje);
    //   })
    //   .catch((error) => console.log('Error en mi promesa', error));

    // console.log('FIN DEL INIT');
  }

  getUsuarios() {
    const promesa = new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((resp) => resp.json())
        .then((body) => resolve(body.data));
    });

    return promesa;
  }
}
