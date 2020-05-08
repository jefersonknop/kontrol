import { Component, OnInit } from '@angular/core';
import { AdmModulo } from '../../domain/admModulo';
import { AdmModuloService } from '../../service/admModulo-service';
import { Response } from 'src/app/system/domain/response';

@Component({
  selector: 'app-adm-modulo-crud',
  templateUrl: './adm-modulo-crud.component.html',
  styleUrls: ['./adm-modulo-crud.component.css']
})
export class AdmModuloCrudComponent implements OnInit {
  displayDialog: boolean;
  admModulo: AdmModulo; 
  selectedAdmModulo: AdmModulo;
  newAdmModulo: boolean;
  admModulos: AdmModulo[];
  cols: any[];

  constructor(private admModuloService: AdmModuloService) { }

  ngOnInit() { this.admModuloService.list().subscribe(admModulos => this.admModulos = admModulos);

    this.cols = [
      { field: 'codigo', header: 'Código'}, 
      { field: 'nome', header: 'Nome'}, 
      { field: 'descricao', header: 'Descrição' }
    ];
  }

  showDialogToAdd() {
    this.newAdmModulo = true;  
    this.admModulo = new AdmModulo();
   
    this.displayDialog = true;

  


    
   
  }

  save() {
    let admModulos = [...this.admModulos];
    if (this.newAdmModulo){
      admModulos.push(this.admModulo);
       /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA admModulo */
    
       this.admModuloService.createOrUpdate(this.admModulo).subscribe(response => {

        let res: Response = <Response>response;

        if (res.codigo == 1) {
          //alert(res.mensagem);
          this.admModulo = new AdmModulo();
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
      admModulos[this.admModulos.indexOf(this.selectedAdmModulo)] = this.admModulo;
      this.admModuloService.createOrUpdate(this.admModulo).subscribe(response => {
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
    this.admModulos = admModulos;
    this.admModulo = null;
    this.displayDialog = false;

  }

  delete() {
    let index = this.admModulos.indexOf(this.selectedAdmModulo);  
    
    if(confirm("Deseja realmente excluir esse registro?")){
      this.admModuloService.delete(this.selectedAdmModulo.id).subscribe(response => {
            let res:Response = <Response>response;
            if(res.codigo == 1){
              alert(res.mensagem);
              this.admModulos.splice(index,1);
            }
            else{             
              alert(res.mensagem);
            }
        },
        (erro) => {  
             alert(erro);
        });        
    }
    this.admModulos = this.admModulos.filter((val, i) => i != index);
    this.admModulo = null;
    this.displayDialog = false;
  }




  onRowSelect(event) {
    this.newAdmModulo = false;
    this.admModulo = this.cloneAdmModulo(event.data);
    this.displayDialog = true;
  }

  cloneAdmModulo(e: AdmModulo): AdmModulo {
    let admModulo = new AdmModulo();
    for (let prop in e) {
      admModulo[prop] = e[prop];
    }
    return admModulo;
  }




    onTabChange(event) {
       // this.messageService.add({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    }


}


