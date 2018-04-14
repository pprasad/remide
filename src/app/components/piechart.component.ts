import {Component,AfterViewInit,Input,OnChanges} from '@angular/core';
import {Subject} from 'rxjs/Subject';

export class PieChartService{
   private pieChart:Subject<any>=new Subject<any>();
   public pieChartObserver=this.pieChart.asObservable(); 
}
@Component({
    selector:'pie-chart',
    template:`
    <div style="display: block">
        <canvas baseChart
                [data]="doughnutChartData"
                [labels]="doughnutChartLabels"
                [chartType]="doughnutChartType"
                (chartHover)="chartHovered($event)"
                (chartClick)="chartClicked($event)">
        </canvas>
     </div>   
    `
})

export class PieChartComponent implements OnChanges{
    // Doughnut
  @Input() charData:any=null;
  public doughnutChartLabels:string[] = ['Open','Pending','Resolved','Closed'];
  public doughnutChartData:number[]=[0,0,0];
  public doughnutChartType:string = 'pie';

  constructor(){}
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  public chartHovered(e:any):void {
    console.log(e);
  }
  ngOnChanges(){
       if(this.charData){
           let values:any=[];
           this.doughnutChartLabels.forEach(key=>{
                key=key.toLowerCase();
               if(this.charData[key]){
                   values.push(this.charData[key]);
               }else{
                   values.push(0);
               }
           });
           this.doughnutChartData=values;
       }
  }
}