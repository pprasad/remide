import {Component,OnInit,Injectable,EventEmitter,Output} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {RestTemplateService} from './resttemplate.service';
import {TicketRequest} from './ticketrequest.dao';
import {CommonUtilService} from './commonutils.service';

@Injectable()
export class DataTableService{
    private gridData: Subject<TicketRequest[]> = new Subject<TicketRequest[]>();
    public gridDataObserver = this.gridData.asObservable();
    constructor(private httpClient:RestTemplateService){ }
    public reloadGrid():void{
        const self=this;
        this.httpClient._start();
        this.httpClient.getAction(this.httpClient.VIEW_TICKET_API,null).
        subscribe(res=>{
            this.httpClient.validateResponse(res,false,function(response:any){
                self.gridData.next(response);
            });
        },errorRes=>{
            this.httpClient.setErrorMsg(errorRes);
        });
    }
}
@Component({
    selector:'data-table',
    templateUrl:'./datatable.component.html',
    styleUrls:['./datatable.component.scss']
})
export class DataTableComponent implements OnInit{
    listofTickets:TicketRequest[]=[];
    hScrollWidth:string;  
    @Output()
    refreshChart:EventEmitter<any>=new EventEmitter<any>();

    constructor(private dataService:DataTableService,private utilService:CommonUtilService){
       dataService.gridDataObserver.subscribe((gridData:TicketRequest[]) => {
               gridData.forEach(val=>{
                  this.listofTickets.push(val);
               });
               this.refreshChart.emit(this.listofTickets);
       });
    }
    ngOnInit(){ }
    /**
      * 
      * @param  event
      */
    onWindowScroll($event:any){
        const width=$event.target.clientWidth+$event.target.scrollLeft;
        this.hScrollWidth=width+"px";
    }

    get StatusMap():any{
        return this.utilService.StatusValue;
    }
    get SourceMap():any{
        return this.utilService.SourceValue;
    }
    get PriorityMap():any{
        return this.utilService.PriorityValue;
    }
}