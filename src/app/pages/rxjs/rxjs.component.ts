import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {


  public intervalSubs: Subscription;

  constructor() {

    // this.retornaObservable().pipe(retry()).subscribe(
    //   (valor) => console.log('Subs:', valor),
    //   (error) => console.warn('Error', error),
    //   () => console.log('Obs terminado')
    // );

   this.intervalSubs = this.retornaIntervalo().subscribe(console.log); //Pasa los argumentos que recibe subscribe a la funcion que está dentro de la misma
    // this.retornaIntervalo().subscribe((valor) => console.log(valor));
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(100).pipe(
      // take(10),
      map((valor) => valor + 1),
      filter(valor => valor % 2 === 0),
    );
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>((observer) => {
      //const obs$ se puede cambiar por el return directamente
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          //Si salta el error no sigue el complete
          observer.error('i llego al valor 2');
        }
      }, 1000);
    });

    return obs$;
  }

}
