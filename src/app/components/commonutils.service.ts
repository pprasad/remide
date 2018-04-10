export class Source{
    key:string;
    value:number;
    constructor(key:string,value:number){
        this.key=key;
        this.value=value;
    }
}
export class CommonUtilService{
    private source:Array<Source>=new Array<Source>();
    private status:Array<Source>=new Array<Source>();
    private priority:Array<Source>=new Array<Source>();
    constructor(){
       this.source.push(new Source('--Select--',0));
       this.source.push(new Source('Email',1));
       this.source.push(new Source('Portal',2));
       this.source.push(new Source('Phone',3));
       this.source.push(new Source('Chat',4));
       this.source.push(new Source('Mobihelp',5));
       this.source.push(new Source('Feedback Widget',6));
       this.source.push(new Source('Outbound Email',7));
       /*Status*/
       this.status.push(new Source('--Select--',0));
       this.status.push(new Source('Open',2));
       this.status.push(new Source('Pending',3));
       this.status.push(new Source('Resolved',4));
       this.status.push(new Source('Closed',5));
       /*Priority*/
       this.priority.push(new Source('--Select--',0));
       this.priority.push(new Source('Low',1));
       this.priority.push(new Source('Medium',2));
       this.priority.push(new Source('High',3));
       this.priority.push(new Source('Urgent',4));
    }
    get Source():Array<Source>{
       return this.source;
    }
    get Status():Array<Source>{
        return this.status;
    }
    get Priorites():Array<Source>{
        return this.priority;
    }
    get PriorityValue():any{
        return {1:'Low',2:'Medium',3:'High',4:'Urgent'};
    }
    get StatusValue():any{
        return {2:'Open',3:'Pending',4:'Resolved',5:'Closed'};
    }
    get SourceValue():any{
        return {1:'Email',2:'Portal',3:'Phone',4:'Chat',5:'Mobilehelp',6:'Feedback Widget',7:'Outbound Email'};
    }
}