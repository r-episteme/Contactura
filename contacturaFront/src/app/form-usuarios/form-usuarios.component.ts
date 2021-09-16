import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosService } from '../service/usuarios.service';


@Component({
  selector: 'app-form-contatos',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.scss']
})
export class FormUsuariosComponent implements OnInit {

  formUsuarios = new FormGroup({
    id: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, public usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.botaoEdit.subscribe( edit =>{
      if (edit !==null){
        console.log(edit, 'valor do edit');
        this.formUsuarios.get('email').setValue(edit.email);
        this.formUsuarios.get('password').setValue(edit.password);
        this.formUsuarios.get('name').setValue(edit.name);
        this.formUsuarios.get('id').setValue(edit.id);
      }
    })
  }

  save(){
    if (this.formUsuarios.valid){
      Swal.fire({
        icon: 'success',
        title: 'Eeeeeba..',
        text: 'Usuário cadastrado com sucesso!'
      }).then(okay => {
        if (okay){
          window.location.href="http://localhost:4200/lista-usuarios";
        }
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Ooooops..',
        text: 'Usuário não cadastrado,' + 
        'preencha corretamente os campos'
      });
    }
  }
}

