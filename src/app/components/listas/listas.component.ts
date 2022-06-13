
import { Component, Input } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {

  //Otra forma de hacer referencia a todos los componentes de la lista html <ion-list>
  //@ViewChild( IonList ) lista : IonList;
  //luego se cierran los items con:
  //this.lista.closeSlidingItems();
  @Input() terminada = true;

  listaPendientes: Lista[] = [];

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertController: AlertController) {
    this.listaPendientes = deseosService.listas;
  }

  listaSeleccionada(lista: Lista){
    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    }
    else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
  }

  borrar(lista: Lista){
    this.deseosService.borrarLista(lista);
    this.listaPendientes = this.deseosService.listas;
  }


  async editarLista(lista: Lista, slidingItem: IonItemSliding){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar Lista',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo
        }
      ],
      buttons: [
        {
            text: 'Guardar',
            handler: (data) => {
              if(data.titulo.lenght === 0){
                return;
              }

              lista.titulo = data.titulo;
              this.deseosService.editarLista();
              slidingItem.close();
              //this.lista.closeSlidingItems();
            }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
            slidingItem.close();
          }
        }
      ]
    });

    alert.present();
  }

}
