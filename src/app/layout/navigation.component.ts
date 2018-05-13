import {Component,OnInit} from '@angular/core';
import {AuthorizationService} from '../components/authorization.service';

@Component({
    selector:'fui-navigator',
    templateUrl:'./navigation.component.html',
    styleUrls:['./navigation.component.scss']
})
export class FuiNavigationComponent implements OnInit{
       public userInfo:any;
       constructor(private authService:AuthorizationService){
          this.authService.userInfoObserver.subscribe((userinfo:any)=>{
             this.userInfo=userinfo;
          })
       }
       ngOnInit(){}
}
