import { Component, Input,OnInit,AfterViewInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from './validate.service';
@Component({
  selector: 'control-messages',
  template: `<div class="text-danger" *ngIf="errorMessage !== null">
         <small>{{labelDesc}} {{errorMessage}}</small></div>`
})
export class FdControlMessagesComponent{
  @Input() control: FormControl;
  @Input() labelDesc:string;
  constructor(){}
  get errorMessage() {
    if(this.control && this.control.errors){
        for (let propertyName in this.control.errors) {
            if(this.control.errors.hasOwnProperty(propertyName) && (!this.control.valid && this.control.hasError)) {
                  let error=ValidationService.getValidatorErrorMessage(propertyName,this.control.errors[propertyName]);
                  if(!error && this.control.errors.email){
                      let key=ValidationService.emailValidator(this.control);
                      error=ValidationService.getValidatorErrorMessage(key,this.control.errors[propertyName]);
                  }
                return error;
            }
          }
    }
    return null;
  }
}
