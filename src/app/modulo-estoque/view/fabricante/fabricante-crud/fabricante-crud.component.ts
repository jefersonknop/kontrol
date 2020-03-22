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

 // cidades: Cidade[];
  cols: any[];

  pessoas: SelectItem[];
  estados: SelectItem[];
  cidadesSelectItem: SelectItem[];

  


  constructor(private fabricanteService: FabricanteService, private cidadeService: CidadeService) {
    this.pessoas = [
      {label: 'Pessoa Jurídica', value: 'Pessoa Jurídica'},
      {label: 'Pessoa Física', value: 'Pessoa Física'}

    ];


    this.estados = [
      {label: 'Acre', value: 'Acre'},
      {label: 'Alagoas', value: 'Alagoas'},
      {label: 'Amapá', value: 'Amapá'},
      {label: 'Amazonas', value: 'Amazonas'},
      {label: 'Bahia', value: 'Bahia'},
      {label: 'Ceará', value: 'Ceará'},
      {label: 'Distrito Federal', value: 'Distrito Federal'},
      {label: 'Espírito Santo', value: 'Espírito Santo'},
      {label: 'Goiás', value: 'Goiás'},
      {label: 'Maranhão', value: 'Maranhão'},
      {label: 'Mato Grosso', value: 'Mato Grosso'},
      {label: 'Mato Grosso do Sul', value: 'Mato Grosso do Sul'},
      {label: 'Minas Gerais', value: 'Minas Gerais'},
      {label: 'Pará', value: 'Pará'},
      {label: 'Paraíba', value: 'Paraíba'},
      {label: 'Paraná', value: 'Paraná'},
      {label: 'Pernambuco', value: 'Pernambuco'},
      {label: 'Piauí', value: 'Piauí'},
      {label: 'Rio de Janeiro', value: 'Rio de Janeiro'},
      {label: 'Rio Grande do Norte', value: 'Rio Grande do Norte'},
      {label: 'Rio Grande do Sul', value: 'Rio Grande do Sul'},
      {label: 'Rondônia', value: 'Rondônia'},
      {label: 'Roraima', value: 'Roraima'},
      {label: 'Santa Catarina', value: 'Santa Catarina'},
      {label: 'São Paulo', value: 'São Paulo'},
      {label: 'Sergipe', value: 'Sergipe'},
      {label: 'Tocantins', value: 'Tocantins'}
    ];
   }

  ngOnInit() {
    this.fabricanteService.list().subscribe(fabricantes => this.fabricantes = fabricantes);

  // this._fornecedorService
  //  .getEstados()
  //  .subscribe((dataUf: Object[]) => {
  //    const estados: Array<Uf> = new Array<Uf>();
  //    dataUf.forEach((elemento: Uf) => {
    //    estados.push(elemento);
//this.constroiFormulario();

   // });




    this.cidadeService.list().subscribe((dataCidades: Object[]) => {
       // this.cidadesSelectItem: SelectItem<Cidade> = new SelectItem<Cidade>();
       //  dataCidades.forEach((elemento: Cidade) => {
        // cidades.push(elemento);
    //   });
   
   //  cidades.forEach (cidade => {
     //this.cidades.forEach ((cidade: Cidade) => {
     // this.cidadesSelectItem.push({label: 'cidade.nome', value: 'cidade.nome' });
   // });

  });

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


}



