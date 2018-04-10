import {Component,AfterViewInit} from '@angular/core';

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

export class PieChartComponent{
    // Doughnut
  public doughnutChartLabels:string[] = ['Open','Pending','Resolved','Closed'];
  public doughnutChartData:number[] = [350, 450, 100,20];
  public doughnutChartType:string = 'pie';

  constructor(){}
   // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  public chartHovered(e:any):void {
    console.log(e);
  }
}