import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  hospitales: Hospital[] = [];
  cargando: boolean = true;
  imgSubs: Subscription = new Subscription();

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImagenService,
    private busquedaService: BusquedaService
  ) {}
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImageService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService
      .actualizarHospital(hospital.nombre, hospital._id!)
      .subscribe((resp) => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id!).subscribe((resp) => {
      this.cargarHospitales();
      Swal.fire('Eliminado', hospital.nombre, 'success');
    });
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      //Desestructuramos el objeto para SOLO tomar el campo value que es el que nos interesa
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
    });
    if (value!.trim().length > 0) {
      this.hospitalService.crearHospital(value!).subscribe((resp: any) => {
        this.hospitales.push(resp.hospital);
      });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImageService.abrirModal(
      'hospitales',
      hospital._id!,
      hospital.img
    );
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarHospitales();
    }
    return this.busquedaService
      .buscar('hospitales', termino)
      .subscribe((resp: any) => {
        this.hospitales = resp;
      });
  }
}
