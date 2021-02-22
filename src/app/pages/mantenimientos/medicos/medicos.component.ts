import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  medicos: Medico[] = [];
  cargando: boolean = true;
  imgSubs: Subscription = new Subscription();

  constructor(
    private medicoService: MedicoService,
    private modalImageService: ModalImagenService,
    private busquedaService: BusquedaService
  ) {}
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImageService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((medicos) => {
      this.cargando = false;
      this.medicos = medicos;
      console.log(medicos);
    });
  }

  abrirModal(medico: Medico) {
    this.modalImageService.abrirModal('medicos', medico._id!, medico.img);
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarMedicos();
    }
    return this.busquedaService
      .buscar('medicos', termino)
      .subscribe((resp: any) => {
        this.medicos = resp;
      });
  }

  borrarMedico(medico: Medico) {
    return Swal.fire({
      title: '¿Borrar este medico?',
      text: `Este proceso no se puede desacer. Borrara a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, lo quiero eliminar',
    }).then((result) => {
      if (result.value) {
        this.medicoService.borrarMedico(medico._id!).subscribe((resp) => {
          this.cargarMedicos();
          Swal.fire(
            'Medico borrado',
            `${medico.nombre} ha sido eliminado`,
            'success'
          );
        });
      }
    });
  }
}
