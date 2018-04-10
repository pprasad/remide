import {Component,OnInit,ViewChild} from '@angular/core';
import {FdEditorDialogComponent} from './caseeditor.component';
import {DataTableService} from './datatable.component';

@Component({
   selector:'fd-dashboard',
   templateUrl:'./dashboard.component.html',
   styleUrls:['./dashboard.component.scss']
})
export class FdDashboardComponent implements OnInit{
    @ViewChild('editModal') openDialog:FdEditorDialogComponent;
     constructor(private dataSerice:DataTableService){}
     ngOnInit(){
         this.dataSerice.reloadGrid();
     }
     openWindow():void{
         this.openDialog.showModel();
     }
}