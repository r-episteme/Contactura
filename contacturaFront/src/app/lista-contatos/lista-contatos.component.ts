import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Contacts } from '../models/contacts';
import { ContatosService } from '../service/contatos.service';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.scss']
})
export class ListaContatosComponent implements OnInit {

  contactsList: Contacts[];
  //collection = {count: 10, data: []};
  constructor(public contatosService: ContatosService, private router: Router) { }

ngOnInit(): void {
    //this.populateContacts();
    this.getContacts();
  }

  getContacts(){
    //console.log('teste');
    this.contatosService.getContacts().subscribe(
      data => {
        this.contactsList = data;
        console.log(data);
      },
      error => {
        this.contactsList = [];
        console.log(error);
      }
    );
  }


  //método para preecher os contatos com dados marcados
/*populateContacts(){
  for (let i = 0; i < this.collection.count; i++) {
    this.collection.data.push({
      id: i,
      name: 'teste' + i,
      email: 'email' + i + '@contactura.com',
      phone: '(' + 0 + 8 + 1 + ')' + 9 + i + i + i + i + '-' + i + i + i + i
    });
  }
    
    this.contactsList = this.collection.data;
    console.log(this.contactsList);
}   */

editContatos(contatos: Contacts){
  console.log('edit esta funcionando', contatos);
  this.contatosService.getContactsList(contatos);
  this.router.navigate(['/cadastro-contatos']);
}

deleteContacts(contatos: Contacts){
  Swal.fire({
    title: 'Você tem certeza?',
    text: 'Deseja mesmo deletar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não'
  }).then((result) => {
    if (result.isConfirmed) {
      this.contatosService.deleteContacts(contatos.id).subscribe(
        data => {
        Swal.fire(
          String(data),
        //'Deletado com sucesso!',
        );
        this.getContacts();
       }
     );
    }
  });
 }

}


