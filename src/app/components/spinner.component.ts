import {Component,OnDestroy,Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SpinnerService{
    private status: Subject<boolean> = new Subject<boolean>();
    public statusObserver = this.status.asObservable();
  
    public start(): void {
         this.status.next(true);
    }
    public stop(): void {
        this.status.next(false);
    }
}
@Component({
  selector: 'spinner-component',
  template:`<div *ngIf="active" class='spinner-css'><div></div></div>`,
  styles:[`.spinner-css{
               display:inline-block;
               background-color: black;
               position: fixed;
               left: 0;top: 0;
               height: 100% ;
               width: 100% ;
               opacity: 0.4;
               z-index:2000;
            }
            .spinner-css div{
               position: absolute;
               top: 190px;
               left: 45%;
               height:60px;
               width:60px;
               margin:0px auto;
               -webkit-animation: rotation .6s infinite linear;
               -moz-animation: rotation .6s infinite linear;
               -o-animation: rotation .6s infinite linear;
               animation: rotation .6s infinite linear;
               border-left:6px solid rgba(0,174,239,.15);
               border-right:6px solid rgba(0,174,239,.15);
               border-bottom:6px solid rgba(0,174,239,.15);
               border-top:6px solid rgba(0,174,239,.8);
               border-radius:100%;
            }
            @-webkit-keyframes rotation {
               from {-webkit-transform: rotate(0deg);}
               to {-webkit-transform: rotate(359deg);}
            }
            @-moz-keyframes rotation {
               from {-moz-transform: rotate(0deg);}
               to {-moz-transform: rotate(359deg);}
            }
            @-o-keyframes rotation {
               from {-o-transform: rotate(0deg);}
               to {-o-transform: rotate(359deg);}
            }
            @keyframes rotation {
               from {transform: rotate(0deg);}
               to {transform: rotate(359deg);}
            }
         `]      
})
export class SpinnerComponent implements OnDestroy{
  public active: boolean;
  private currentTimeout:any;
  private isDelayedRunning: boolean = false;
  private delay: number =1000;
  public constructor(spinner:SpinnerService) {
    spinner.statusObserver.subscribe((status: boolean) => {
        console.info("active{}"+status);
        if (!status) {
            this.cancelTimeout();
            this.active= false;
            return;
        }
        if (this.currentTimeout) {
            return;
        }
         this.currentTimeout=setTimeout(()=>{
            this.active=status;
            this.cancelTimeout();
        },this.delay);
    });
  }
  private cancelTimeout(): void {
      clearTimeout(this.currentTimeout);
      this.currentTimeout=undefined;
  }
  ngOnDestroy(): any {
      this.active=false;
  }
}