import { Component, OnInit } from '@angular/core';
import { Unidade_medida } from 'src/app/modulo-estoque/domain/unidade-medida';
import { Unidade_medidaService } from 'src/app/modulo-estoque/service/unidade-medida-service';
import { Response } from 'src/app/system/domain/response';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';

@Component({
  selector: 'app-unidade-medida-crud',
  templateUrl: './unidade-medida-crud.component.html',
  styleUrls: ['./unidade-medida-crud.component.css']
})
export class UnidadeMedidaCrudComponent implements OnInit {
  displayDialog: boolean;
  unidade_medida: Unidade_medida; 
  selectedUnidade_medida: Unidade_medida;
  newUnidade_medida: boolean;
  unidade_medidas: Unidade_medida[];
  cols: any[];


  constructor(private unidade_medidaService: Unidade_medidaService) { }

  ngOnInit() {
    this.unidade_medidaService.list().subscribe(unidade_medidas => this.unidade_medidas = unidade_medidas);

    this.cols = [
      { field: 'descricao', header: 'Unidade de medida' },
      { field: 'abreviatura', header: 'Abreviatura' }
    ];
  }

  showDialogToAdd() {
    this.newUnidade_medida = true;  
    this.unidade_medida = new Unidade_medida();
   
    this.displayDialog = true;

  


    
   
  }

  save() {
    let unidade_medidas = [...this.unidade_medidas];
    if (this.newUnidade_medida){
      unidade_medidas.push(this.unidade_medida);
       /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA unidade_medida */
       this.unidade_medida.ativo = true;
       this.unidade_medidaService.createOrUpdate(this.unidade_medida).subscribe(response => {

        let res: Response = <Response>response;

        if (res.codigo == 1) {
          //alert(res.mensagem);
          this.unidade_medida = new Unidade_medida();
        }
        else {         
          alert(res.mensagem);
        }
      },
        (erro) => {
          alert(erro);
        });



        


    }
    else{
      unidade_medidas[this.unidade_medidas.indexOf(this.selectedUnidade_medida)] = this.unidade_medida;
      this.unidade_medidaService.createOrUpdate(this.unidade_medida).subscribe(response => {
        let res: Response = <Response>response;

        if (res.codigo == 1) {
         // alert(res.mensagem);
         // this.router.navigate(['/consulta-pessoa']);
        }
        else {
          alert(res.mensagem);
        }
      },
        (erro) => {                           
          alert(erro);
        });

       
       
    }
    this.unidade_medidas = unidade_medidas;
    this.unidade_medida = null;
    this.displayDialog = false;

  }

  delete() {
    let index = this.unidade_medidas.indexOf(this.selectedUnidade_medida);  
    
    if(confirm("Deseja realmente excluir esse registro?")){
      this.unidade_medidaService.delete(this.selectedUnidade_medida.id).subscribe(response => {
            let res:Response = <Response>response;
            if(res.codigo == 1){
              alert(res.mensagem);
              this.unidade_medidas.splice(index,1);
            }
            else{             
              alert(res.mensagem);
            }
        },
        (erro) => {  
             alert(erro);
        });        
    }
    this.unidade_medidas = this.unidade_medidas.filter((val, i) => i != index);
    this.unidade_medida = null;
    this.displayDialog = false;
  }




  onRowSelect(event) {
    this.newUnidade_medida = false;
    this.unidade_medida = this.cloneUnidade_medida(event.data);
    this.displayDialog = true;
  }

  cloneUnidade_medida(e: Unidade_medida): Unidade_medida {
    let unidade_medida = new Unidade_medida();
    for (let prop in e) {
      unidade_medida[prop] = e[prop];
    }
    return unidade_medida;
  }




    onTabChange(event) {
       // this.messageService.add({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    }


}


