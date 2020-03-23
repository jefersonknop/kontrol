import { Component, OnInit } from '@angular/core';
import { Fabricante } from 'src/app/modulo-estoque/domain/fabricante';
import { FabricanteService } from 'src/app/modulo-estoque/service/fabricante-service';
import { Response } from 'src/app/system/domain/response';
import { SelectItem } from 'primeng/api';
import { Cidade } from 'src/app/system/domain/cidade';
import { CidadeService } from 'src/app/system/service/cidade-service';

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

  cidades: Cidade[];
  cols: any[];

  pessoas: SelectItem[];
  estados: SelectItem[];

  cidadesItens: SelectItem[] = [];





  


  constructor(private fabricanteService: FabricanteService, private cidadeService: CidadeService) {
    this.pessoas = [
      {label: 'Pessoa Jurídica', value: 'Pessoa Jurídica'},
      {label: 'Pessoa Física', value: 'Pessoa Física'}

    ];


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
    ];
   }

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
    let fabricantes = [...this.fabricantes];
    if (this.newFabricante){
      fabricantes.push(this.fabricante);
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
      fabricantes[this.fabricantes.indexOf(this.selectedFabricante)] = this.fabricante;
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

      
       
    }
    this.fabricantes = fabricantes;
    this.fabricante = null;
    this.displayDialog = false;

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

  cancel() {
    this.displayDialog = false;
  }

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





    getCidades(estado: string) {           
      this.cidadeService.listBySiglaEstado(estado).subscribe(cidades => this.cidades = cidades);
      this.cidades.forEach((cidade) => { // foreach statement       
        this.cidadesItens.push({
          'value': cidade.nome,
          'label' :  cidade.nome
        });
       });
  
    }


}



