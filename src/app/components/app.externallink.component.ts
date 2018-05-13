import { Component, Injectable, NgModule } from '@angular/core';
@Component({
   template:''
})
export class ExternalLinkComponent{
    constructor(){
       window.location.href='/login';
    }  
}
