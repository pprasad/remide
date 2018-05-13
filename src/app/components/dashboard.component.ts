import {Component,OnInit,ViewChild} from '@angular/core';
import {FdEditorDialogComponent} from './caseeditor.component';
import {DataTableService} from './datatable.component';
import {CommonUtilService} from './commonutils.service';
import {AuthorizationService} from './authorization.service';

@Component({
   selector:'fd-dashboard',
   templateUrl:'./dashboard.component.html',
   styleUrls:['./dashboard.component.scss']
})
export class FdDashboardComponent implements OnInit{
    @ViewChild('editModal') openDialog:FdEditorDialogComponent;
    chartData:any;
     constructor(private dataSerice:DataTableService,
        private utilService:CommonUtilService,
        private authService:AuthorizationService){}
     ngOnInit(){
         let _this=this;
         this.authService.isAuth(function(){
             _this.dataSerice.reloadGrid();
         });
     }
     openWindow():void{
         this.openDialog.showModel();
     }
     public reloadChart(e:any):void{
      this.chartData={};
       e.filter(({status}:any)=>{
             let key:string=this.utilService.StatusValue[status];
             key=key.trim().toLowerCase();
             if(this.chartData[key]){
                this.chartData[key]=this.chartData[key]+1;
             }else{
                this.chartData[key]=1;
             }
          }
       );
    }
}