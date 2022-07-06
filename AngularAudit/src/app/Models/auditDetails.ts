export class auditDetails  
{
    type:string;
    date:string;
    questions:{ [key: string]: boolean };

    constructor()
    {
        this.type="";
        this.date = ""; 
        this.questions={};
    }

}