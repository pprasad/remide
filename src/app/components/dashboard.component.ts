import {Component,OnInit,ViewChild} from '@angular/core';
import {FdEditorDialogComponent} from './caseeditor.component';
@Component({
   selector:'fd-dashboard',
   templateUrl:'./dashboard.component.html',
   styleUrls:['./dashboard.component.scss']
})
export class FdDashboardComponent implements OnInit{
    @ViewChild('editModal') openDialog:FdEditorDialogComponent;
     constructor(){}
     ngOnInit(){}
     openWindow():void{
         this.openDialog.showModel();
     }
}