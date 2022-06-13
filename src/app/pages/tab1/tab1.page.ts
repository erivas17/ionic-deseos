import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  listaPendientes: Lista[] = [];
  //logica ya innecesaria, todo se llevo al listas.component.ts como template

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertController: AlertController) {
    this.listaPendientes = deseosService.listas;
  }


  async agregarLista(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Lista',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
            text: 'Crear',
            handler: (data) => {
              if(data.titulo.lenght === 0){
                return;
              }

              const listaId = this.deseosService.crearLista(data.titulo);

              this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);
            }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
          }
        }
      ]
    });

    alert.present();
  }


  listaSeleccionada(lista: Lista){
    this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
  }
}
