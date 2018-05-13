import {Injectable} from '@angular/core';
import {Http,URLSearchParams,RequestOptions,Headers} from '@angular/http';
import {SpinnerService} from './spinner.component';
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Injectable()
export class RestTemplateService{
   private toastOptions:ToastOptions; 
   private CONTEXT_PATH="/";
   public  CREATE_TICKET_API="api/create_tickets";
   public  VIEW_TICKET_API="api/viewtickets";
   public  GET_USER_INFO="api/user";
   constructor(private _http:Http,private spinnerService:SpinnerService,
    private toast:ToastyService){
        this.toastOptions={
            title:null,
            msg:null,
            showClose: true,
            timeout: 5000,
            theme: 'default',
            onAdd: (toast:ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast:ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
   }
   public getGenericAction(url:string,request:any):Observable<any>{
        let path=this.CONTEXT_PATH.concat(url);
        let options=this.setHeaders();
        return this._http.post(path,request,options).
        map(res=>res.json()).catch(this.errorHandler);
   }
   public getAction(url:string,request:any):Observable<any>{
    let path=this.CONTEXT_PATH.concat(url);
    let options=this.setHeaders();
    return this._http.get(path,options).
    map(res=>res.json()).catch(this.errorHandler);
   }
   private setHeaders(): any {
        let headers = new Headers( { 'Content-Type': 'application/json' });
        let options = new RequestOptions( { 'headers': headers });
        return options;
   }
   public errorHandler(res:any){
        let msg=(res.message)?res.message:
        res.status ?(res.statusText=='error'||res.status==404||res.status==401||res.status==302)?'Current Session Expired, Please re-login.'
            :`${res.statusText}`:'Server error';
        return Observable.throw(msg);
   }
   public setWarningMsg(msg:any):void{
        this.toastOptions.title="Warning";
        this.toastOptions.msg=msg;
        this.toast.info(this.toastOptions);
        this.spinnerService.stop();
    }
    public setErrorMsg(msg:any):void{
        this.toastOptions.title="Error";
        this.toastOptions.msg=msg;
        this.toast.error(this.toastOptions);
        this.spinnerService.stop();
    }
    public setInfoMsg(msg:any):void{
        this.toastOptions.title="Information";
        this.toastOptions.msg=msg;
        this.toast.info(this.toastOptions);
        this.spinnerService.stop();
    }
    public handleCallback(resp:any):void{
       if(resp && resp.errors){
            this.setErrorMsg(resp.description);
            this._stop();
        }else{
            this.setInfoMsg('Successfully Saved');
            this._stop();
        }
    }
    public validateResponse(resp:any,flag:boolean,callback:Function):void{
        if(resp && resp.errors){
            this.setErrorMsg(resp.description);
            this._stop();
        }else{
            if(flag){
                this.setInfoMsg('Successfully Saved');
            }
            callback(resp);
            this._stop();
        }
    }
    handelErrorAction(errorMsg:any):void{
        this.setErrorMsg(errorMsg);
        this.spinnerService.stop();
    }
    public _start(){
       this.spinnerService.start();
    }
    public _stop(){
        this.spinnerService.stop();
     }
}