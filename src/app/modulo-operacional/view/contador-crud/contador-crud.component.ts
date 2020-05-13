import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/system/domain/response';
import { SelectItem, DialogService } from 'primeng/api';
import { Contador } from '../../domain/contador';
import { Cidade } from 'src/app/system/domain/cidade';
import { ContadorService } from '../../service/contador-service';
import { CidadeService } from 'src/app/system/service/cidade-service';

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

/*
    this.estados = [
      {label: 'Acre', value: 'AC'},
      {label: 'Alagoas', value: 'AL'},
      {label: 'Amapá', value: 'AP'},
      {label: 'Amazonas', value: 'AM'},
      {label: 'Bahia', value: 'BA'},
      {label: 'Ceará', value: 'CE'},
      {label: 'Distrito Federal', value: 'DF'},
      {label: 'Espírito Santo', value: 'ES'},
      {label: 'Goiás', value: 'GO'},
      {label: 'Maranhão', value: 'MA'},
      {label: 'Mato Grosso', value: 'MG'},
      {label: 'Mato Grosso do Sul', value: 'MS'},
      {label: 'Minas Gerais', value: 'MG'},
      {label: 'Pará', value: 'PA'},
      {label: 'Paraíba', value: 'PB'},
      {label: 'Paraná', value: 'PR'},
      {label: 'Pernambuco', value: 'PE'},
      {label: 'Piauí', value: 'PI'},
      {label: 'Rio de Janeiro', value: 'RJ'},
      {label: 'Rio Grande do Norte', value: 'RN'},
      {label: 'Rio Grande do Sul', value: 'RS'},
      {label: 'Rondônia', value: 'RO'},
      {label: 'Roraima', value: 'RR'},
      {label: 'Santa Catarina', value: 'SC'},
      {label: 'São Paulo', value: 'SP'},
      {label: 'Sergipe', value: 'SE'},
      {label: 'Tocantins', value: 'TO'}
    ];*/
   }

  ngOnInit() {
    this.contadorService.list().subscribe(contadores => this.contadores = contadores);

    
  


    this.cols = [
      { field: 'nome', header: 'Nome' },
      { field: 'endereco', header: 'Endereço' },
      { field: 'cidade', header: 'Cidade' } ,   
      { field: 'telefone', header: 'Telefone' },
      { field: 'email', header: 'Email' }
    ];
  }

  showDialogToAdd() {
    this.newContador = true;  
    this.contador = new Contador();


    this.displayDialog = true;

  }

  save() {
    if (this.contador.nome==""){
      if (this.contador.tipo === "Pessoa Jurídica"){
        alert("Informar Razão Social");
      }
      else{
        alert("Informar nome");
      }      
      return;
    }
    //else if (this.linha.tipo==""){
      //alert("Informar tipo da linha");
     // return;      
   // } 
   



    let contadors = [...this.contadors];
    if (this.newContador){
      contadors.push(this.contador);
       /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA Contador */     
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
      contadors[this.contadors.indexOf(this.selectedContador)] = this.contador;
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
    this.contadors = contadors;
    this.contador = null;
    this.displayDialog = false;

  }

  delete() {
    let index = this.contadors.indexOf(this.selectedContador);  
    
    if(confirm("Deseja realmente excluir esse registro?")){
      this.contadorService.delete(this.selectedContador.id).subscribe(response => {
            let res:Response = <Response>response;
            if(res.codigo == 1){
              alert(res.mensagem);
              this.contadors.splice(index,1);
            }
            else{             
              alert(res.mensagem);
            }
        },
        (erro) => {  
             alert(erro);
        });        
    }
    this.contadors = this.contadors.filter((val, i) => i != index);
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


 



    onTabChange(event) {
       // this.messageService.add({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    }





   /* getCidades(estado: string) {           
      this.cidadeService.listBySiglaEstado(estado).subscribe(cidades => this.cidades = cidades);
      this.cidades.forEach((cidade) => { // foreach statement       
        this.cidadesItens.push({
          'value': cidade.nome,
          'label' :  cidade.nome
        });
       });
  
    }
   */


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



