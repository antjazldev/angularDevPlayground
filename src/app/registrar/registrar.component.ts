import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../helpers/must-match.validator';
import {RegisterGQL,RegisterMutation} from 'src/generated/graphql';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
    registerForm : FormGroup;
    submitted = false;
    registrarGQL: RegisterGQL
    email: string;
    password: string;
  

  constructor(private formBuilder: FormBuilder, registerGQL: RegisterGQL,private router: Router) {
     this.registrarGQL = registerGQL
   }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userMail:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },{
      validator: MustMatch('password', 'confirmPassword')
  })
  }
  get getControls() { return this.registerForm.controls; }
  onSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
   
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      alert('Llene los datos correctamente')
        return;
    }
    console.log(this.getControls.userMail.value)
    this.email = this.getControls.userMail.value
    console.log(this.getControls.password.value)
    this.password = this.getControls.password.value
    this.registrarGQL.mutate({email:this.email,password:this.password},)
    .subscribe((data)=>{console.log(data)
      this.getControls.userMail.setValue("");
      this.getControls.password.setValue("");
      this.router.navigate(['/']);
    });
    

}}
