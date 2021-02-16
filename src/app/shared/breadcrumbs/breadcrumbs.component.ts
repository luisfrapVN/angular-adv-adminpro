import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnInit {
  public titulo: string = '';
  public tituloSubs$: Subscription;

  constructor(private router: Router) {
    this.tituloSubs$ = this.getArgumentosRuta().subscribe(({ titulo }) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${titulo}`;
    });
  }

  getArgumentosRuta() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event) => (event as ActivationEnd).snapshot.firstChild === null),
      map((event) => (event as ActivationEnd).snapshot.data)
    ); //Conseguimos sacar los valores de ActivationEnd, nul, ... poniendo un console log del evento y filtrando el que nos interesa
  }

  ngOnInit(): void {}
}
