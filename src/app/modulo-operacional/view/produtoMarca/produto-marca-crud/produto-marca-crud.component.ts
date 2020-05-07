import { Component, OnInit } from '@angular/core';
import { ProdutoMarcaService } from 'src/app/modulo-operacional/service/produtoMarca-service';
import { ProdutoMarca } from 'src/app/modulo-operacional/domain/produtoMarca';
import { Response } from 'src/app/system/domain/response';

@Component({
  selector: 'app-produto-marca-crud',
  templateUrl: './produto-marca-crud.component.html',
  styleUrls: ['./produto-marca-crud.component.css']
})
export class ProdutoMarcaCrudComponent implements OnInit {
  displayDialog: boolean;
  produtoMarca: ProdutoMarca; 
  selectedProdutoMarca: ProdutoMarca;
  newProdutoMarca: boolean;
  produtoMarcas: ProdutoMarca[];
  cols: any[];

  constructor(private produtoMarcaService: ProdutoMarcaService) { }

  ngOnInit() { this.produtoMarcaService.list().subscribe(produtoMarcas => this.produtoMarcas = produtoMarcas);

    this.cols = [
      { field: 'nome', header: 'Nome'}, 
      { field: 'descricao', header: 'Descrição' }
    ];
  }

  showDialogToAdd() {
    this.newProdutoMarca = true;  
    this.produtoMarca = new ProdutoMarca();
   
    this.displayDialog = true;

  


    
   
  }

  save() {
    let produtoMarcas = [...this.produtoMarcas];
    if (this.newProdutoMarca){
      produtoMarcas.push(this.produtoMarca);
       /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA produtoMarca */
    
       this.produtoMarcaService.createOrUpdate(this.produtoMarca).subscribe(response => {

        let res: Response = <Response>response;

        if (res.codigo == 1) {
          //alert(res.mensagem);
          this.produtoMarca = new ProdutoMarca();
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
      produtoMarcas[this.produtoMarcas.indexOf(this.selectedProdutoMarca)] = this.produtoMarca;
      this.produtoMarcaService.createOrUpdate(this.produtoMarca).subscribe(response => {
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
    this.produtoMarcas = produtoMarcas;
    this.produtoMarca = null;
    this.displayDialog = false;

  }

  delete() {
    let index = this.produtoMarcas.indexOf(this.selectedProdutoMarca);  
    
    if(confirm("Deseja realmente excluir esse registro?")){
      this.produtoMarcaService.delete(this.selectedProdutoMarca.id).subscribe(response => {
            let res:Response = <Response>response;
            if(res.codigo == 1){
              alert(res.mensagem);
              this.produtoMarcas.splice(index,1);
            }
            else{             
              alert(res.mensagem);
            }
        },
        (erro) => {  
             alert(erro);
        });        
    }
    this.produtoMarcas = this.produtoMarcas.filter((val, i) => i != index);
    this.produtoMarca = null;
    this.displayDialog = false;
  }




  onRowSelect(event) {
    this.newProdutoMarca = false;
    this.produtoMarca = this.cloneProdutoMarca(event.data);
    this.displayDialog = true;
  }

  cloneProdutoMarca(e: ProdutoMarca): ProdutoMarca {
    let produtoMarca = new ProdutoMarca();
    for (let prop in e) {
      produtoMarca[prop] = e[prop];
    }
    return produtoMarca;
  }




    onTabChange(event) {
       // this.messageService.add({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    }


}


