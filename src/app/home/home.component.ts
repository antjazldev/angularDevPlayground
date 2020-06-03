import { Component, OnInit } from '@angular/core';
//import { HelloGQL, HelloQuery } from './.';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { HelloGQL,  HelloQuery} from 'src/generated/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading = true;
  holaGQL: HelloGQL
  resul: Observable<HelloQuery['hello']>;
  error: any;
  constructor(helloGQL: HelloGQL) {
   this.holaGQL = helloGQL
  }



  ngOnInit() {
    this.resul=this.holaGQL.watch().valueChanges.pipe(map(result => result.data.hello, this.loading=false));
    console.log(this.resul)
   }

}
