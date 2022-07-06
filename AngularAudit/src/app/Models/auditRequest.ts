import { auditDetails } from './auditDetails';

export class auditRequest 
{
    //ProjectId: number = 0;
    projectName: string = '';
    projectManagerName: string|null = '' ;
    applicationOwnerName: string = '';
    auditDetails: auditDetails = new auditDetails();
}