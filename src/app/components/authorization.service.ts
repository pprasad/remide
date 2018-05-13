import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {RestTemplateService} from './resttemplate.service';

@Injectable()
export class AuthorizationService{
    private userInfo: Subject<any> = new Subject<any>();
    public  userInfoObserver = this.userInfo.asObservable();
    constructor(private httpClient:RestTemplateService){}
    public isAuth(fn:Function){
        this.httpClient._start();
        this.httpClient.getAction(this.httpClient.GET_USER_INFO,null).
        subscribe(res=>{
            fn();
            this.userInfo.next(res);
        },errorRes=>{
            window.location.href='/login';
        });
    }
    public getUserInfo(userInfo:any):void{
        this.httpClient._start();
        this.httpClient.getAction(this.httpClient.GET_USER_INFO,null).
        subscribe(res=>{
            userInfo=res;
        },errorRes=>{
            //window.location.href='/login';
        });
    }  
}