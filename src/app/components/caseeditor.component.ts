/*
 *@Auth Prasad
 *@Date 10/04/2018
 */
import {Component,OnInit,ViewChild,Input} from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators,FormArray} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap';
import {CommonUtilService,Source} from './commonutils.service';
import {RestTemplateService} from './resttemplate.service';
import {TicketRequest} from './ticketrequest.dao';
import {DataTableService} from './datatable.component';
@Component({
    selector:'fd-editor-dialog',
    templateUrl:'./caseeditor.component.html',
    styleUrls:['./caseeditor.component.scss']
})
export class FdEditorDialogComponent implements OnInit{
    @ViewChild("editModal") 
    public editModel:ModalDirective;
    @Input() title?:string; 
    ticketReq:TicketRequest=new TicketRequest();
    caseCreateFrom:FormGroup;
    
    constructor(private formBuilder:FormBuilder,private utilService:CommonUtilService,
        private httpClient:RestTemplateService,private dataService:DataTableService){
         this.caseCreateFrom=this.formBuilder.group({
              subject:['',Validators.required],
              description:['',Validators.required],
              name:[''],
              email:['',[Validators.required,Validators.email]],
              cc_emails:new FormArray([]),
              source:[0,Validators.required],
              status:[0,Validators.required],
              priority:[0,Validators.required]
         });
         this.addEmail();
    }
    ngOnInit(){}

    public showModel():void{
        this.editModel.show();
    }
      
    public closeModel():void{
        console.info("*******Closed************");
        this.editModel.hide();
    }
    public onSubmit():void{
        const self=this;
       if(this.caseCreateFrom.invalid){
           return;
        }
        this.httpClient._start();
        this.ticketReq=this.caseCreateFrom.value;
        this.httpClient.getGenericAction(this.httpClient.CREATE_TICKET_API,this.ticketReq).
        subscribe(res=>{
            this.httpClient.validateResponse(res,true,function(response:any){
                self.closeModel();
                self.caseCreateFrom.reset();
                self.dataService.reloadGrid();
            });
        },errorRes=>{
            this.httpClient.setErrorMsg(errorRes);
        });
    }
    get ccEmails(): FormArray {
        return this.caseCreateFrom.get('cc_emails') as FormArray;
    }
    public addEmail():void{
       this.ccEmails.push(this.formBuilder.control('',Validators.email));
    }
    public remove(index:number):void{
        this.ccEmails.removeAt(index);
    }
    trackByFn(index: any, item: any) {
        return index;
    }

    get Source():Array<Source>{
        return this.utilService.Source;
    }
    get Status():Array<Source>{
        return this.utilService.Status;
    }
    get Priority():Array<Source>{
        return this.utilService.Priorites;
    }
}