import { Component, OnInit } from '@angular/core';
import { Fabricante } from 'src/app/modulo-estoque/domain/fabricante';
import { FabricanteService } from 'src/app/modulo-estoque/service/fabricante-service';
import { Response } from 'src/app/system/domain/response';

@Component({
  selector: 'app-fabricante-crud',
  templateUrl: './fabricante-crud.component.html',
  styleUrls: ['./fabricante-crud.component.css']
})
export class FabricanteCrudComponent implements OnInit {
  displayDialog: boolean;
  fabricante: Fabricante; 
  selectedFabricante: Fabricante;
  newFabricante: boolean;
  fabricantes: Fabricante[];
  cols: any[];


  constructor(private fabricanteService: FabricanteService) { }

  ngOnInit() {
    this.fabricanteService.list().subscribe(fabricantes => this.fabricantes = fabricantes);
    this.cols = [
      { field: 'nome', header: 'Nome' },
      { field: 'endereco', header: 'Endereço' },
      { field: 'cidade', header: 'Cidade' } ,   
      { field: 'telefone', header: 'Telefone' },
      { field: 'email', header: 'Email' }
    ];
  }

  showDialogToAdd() {
    this.newFabricante = true;  
    this.fabricante = new Fabricante();
    this.displayDialog = true;
  }

  save() {
    let Fabricantes = [...this.fabricantes];
    if (this.newFabricante){
      Fabricantes.push(this.fabricante);
       /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA Fabricante */     
       this.fabricanteService.createOrUpdate(this.fabricante).subscribe(response => {

        let res: Response = <Response>response;

        if (res.codigo == 1) {
          //alert(res.mensagem);
          this.fabricante = new Fabricante();
        }
        else {         
          alert(res.mensagem);
        }
      },
        (erro) => {
          alert(erro);
        });


        
        this.showDialogToAdd(); 

    }
    else{
      Fabricantes[this.fabricantes.indexOf(this.selectedFabricante)] = this.fabricante;
      this.fabricanteService.createOrUpdate(this.fabricante).subscribe(response => {
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

        this.fabricantes = Fabricantes;
        this.fabricante = null;
        this.displayDialog = false;
       
    }
    //this.Fabricantes = Fabricantes;
   // this.Fabricante = null;
    //this.displayDialog = false;

  }

  delete() {
    let index = this.fabricantes.indexOf(this.selectedFabricante);  
    
    if(confirm("Deseja realmente excluir esse registro?")){
      this.fabricanteService.delete(this.selectedFabricante.id).subscribe(response => {
            let res:Response = <Response>response;
            if(res.codigo == 1){
              alert(res.mensagem);
              this.fabricantes.splice(index,1);
            }
            else{             
              alert(res.mensagem);
            }
        },
        (erro) => {  
             alert(erro);
        });        
    }
    this.fabricantes = this.fabricantes.filter((val, i) => i != index);
    this.fabricante = null;
    this.displayDialog = false;
  }

 // cancel() {
   // this.displayDialog = false;
 // }

  onRowSelect(event) {
    this.newFabricante = false;
    this.fabricante = this.cloneFabricante(event.data);
    this.displayDialog = true;
  }

  cloneFabricante(e: Fabricante): Fabricante {
    let fabricante = new Fabricante();
    for (let prop in e) {
      fabricante[prop] = e[prop];
    }
    return fabricante;
  }


 



    onTabChange(event) {
       // this.messageService.add({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    }


}



