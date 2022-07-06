import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditResponseService } from '../audit-response.service';
import { AuditService } from '../audit.service';
import { auditDetails } from '../Models/auditDetails';
import { auditRequest } from '../Models/auditRequest';
import { auditResponse } from '../Models/auditResponse';
import {URLS1} from '../Models/Url';

@Component({
  selector: 'app-severity',
  templateUrl: './severity.component.html',
  styleUrls: ['./severity.component.css']
})
export class SeverityComponent implements OnInit {

  status : string='';
  requestdata: auditRequest = {
    projectManagerName: '',
    applicationOwnerName: '',
    projectName: '',
    auditDetails: new auditDetails()
  };
  response : auditResponse = new auditResponse();

  responseCheckFlag : boolean = false;
  statustype:string="table-success";
  
  
  constructor(private httpClient:HttpClient,private router:Router,private _service:AuditService,private _responseservice:AuditResponseService) {

   }

  ngOnInit(): void {
  }
  saveProjectdetails(projdetails: auditRequest): void
  {
    
    console.log(projdetails);
    projdetails.auditDetails=this._service.getAuditDetails();
    projdetails.projectManagerName=localStorage.getItem("username");
    console.log(this._service.getAuditDetails);
    console.log(projdetails);
    this.httpClient.post<auditResponse>(`${URLS1.auditSeverity}`, projdetails,{
      headers:new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("jwt"))
    }).subscribe(data => {
      this._responseservice.setResponse(data);
      console.log(data);
      this.responseCheckFlag = true;
      this.response = data;
      this.router.navigateByUrl("/AuditDetails");
    },err =>
    {
      this.router.navigate(["/error"]);
    }); 
  }
}
