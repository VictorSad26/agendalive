import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../shared/service/user.service";
import {group} from "@angular/animations";
import {error} from "@angular/compiler/src/util";
import {errorObject} from "rxjs/internal-compatibility";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  public userForm!: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private rest: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  createUser(){
    this.rest.postUser(this.userForm.value).subscribe(result =>{
        console.log(result);
        this.userForm.reset();
        this.router.navigate(['/']).then(r => {})
    })
  }
}
