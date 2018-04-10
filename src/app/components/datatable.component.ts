import {Component,OnInit} from '@angular/core';

@Component({
    selector:'data-table',
    template:`
            <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th class="th-lg">ID</th>
                        <th class="th-lg">Source</th>
                        <th class="th-lg">Status</th>
                        <th class="th-lg">Priority</th>
                        <th class="th-lg">Created Date</th>
                    </tr>
                </thead> 
                <tbody>
                   
                </tbody> 
            </table>
        </div>
    `
})
export class DataTableComponent implements OnInit{
    constructor(){}
    ngOnInit(){

    }
}