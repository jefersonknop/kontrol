import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/system/domain/response';
import { SelectItem, DialogService } from 'primeng/api';
import { Contador } from '../../domain/contador';
import { Cidade } from 'src/app/system/domain/cidade';
import { ContadorService } from '../../service/contador-service';
import { CidadeService } from 'src/app/system/service/cidade-service';
import { CidadeListComponent } from 'src/app/system/view/cidade/cidade-list/cidade-list.component';

@Component({
  selector: 'app-contador-crud',
  templateUrl: './contador-crud.component.html',
  styleUrls: ['./contador-crud.component.css'],
  providers: [DialogService]
})
export class ContadorCrudComponent implements OnInit {
  displayDialog: boolean;
  contador: Contador; 
  selectedContador: Contador;
  newContador: boolean;
  contadores: Contador[];
 


  cidade: Cidade; 
  selectedCidade: Cidade;
  cidades: Cidade[];
  
  cols: any[];
  pessoas: SelectItem[];
 





  


  constructor(private contadorService: ContadorService, private cidadeService: CidadeService, public dialogService: DialogService) {
    this.pessoas = [
      {label: 'Pessoa Jurídica', value: 'Pessoa Jurídica'},
      {label: 'Pessoa Física', value: 'Pessoa Física'}

    ];

   }

  ngOnInit() {
    this.contadorService.list().subscribe(contadores => this.contadores = contadores);
  

    this.cols = [
      { field: 'nome', header: 'Nome' },
      { field: 'logradouro', header: 'Endereço' },
      { field: 'numero', header: 'Numero' },
      { field: 'bairro', header: 'Bairro' },
      { field: 'cidade', header: 'Cidade/' } ,   
      { field: 'uf', header: 'UF' } ,   
      { field: 'fone', header: 'Telefone' },
      { field: 'email', header: 'Email' }
    ];
  }


  showDialogToAdd() {
    this.newContador = true;  
    this.contador = new Contador();
    this.tipo = 'PESSOA FÍSICA'

    this.displayDialog = true;

  }

  save() {
    if (this.contador.nome==""){
   
      alert("Informar nome");
         
      return;
    }
 
    let contadores = [...this.contadores];
    if (this.newContador){
      contadores.push(this.contador);
       /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVO Contador */     
       this.contadorService.createOrUpdate(this.contador).subscribe(response => {

        let res: Response = <Response>response;

        if (res.codigo == 1) {
          //alert(res.mensagem);
          this.contador = new Contador();
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
      contadores[this.contadores.indexOf(this.selectedContador)] = this.contador;
      this.contadorService.createOrUpdate(this.contador).subscribe(response => {
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
    this.contadores = contadores;
    this.contador = null;
    this.displayDialog = false;

  }

  delete() {
    let index = this.contadores.indexOf(this.selectedContador);  
    
    if(confirm("Deseja realmente excluir esse registro?")){
      this.contadorService.delete(this.selectedContador.id).subscribe(response => {
            let res:Response = <Response>response;
            if(res.codigo == 1){
              alert(res.mensagem);
              this.contadores.splice(index,1);
            }
            else{             
              alert(res.mensagem);
            }
        },
        (erro) => {  
             alert(erro);
        });        
    }
    this.contadores = this.contadores.filter((val, i) => i != index);
    this.contador = null;
    this.displayDialog = false;
  }

  cancel() {
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newContador = false;
    this.contador = this.cloneContador(event.data);
    this.displayDialog = true;
  }

  cloneContador(e: Contador): Contador {
    let contador = new Contador();
    for (let prop in e) {
      contador[prop] = e[prop];
    }
    return contador;
  }



  showCidadeList() {
    const ref = this.dialogService.open(CidadeListComponent, {
        header: 'Escolha uma cidade',
        width: '70%',
      //contentStyle: {"max-height": "350px", "overflow": "auto"}
       contentStyle: {"overflow": "auto"}
    });

    ref.onClose.subscribe((cidade: Cidade) =>{
        if (cidade) {
             this.contador.cidade = cidade.nome;
             this.contador.uf = cidade.estado_id.sigla;
        }
    });
  }

}



