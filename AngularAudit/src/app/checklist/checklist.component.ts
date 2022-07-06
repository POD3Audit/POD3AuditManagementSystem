import { HttpClient, HttpHeaders } from '@angular/common/http';
import { auditDetails } from './../Models/auditDetails';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuditService } from '../audit.service';
import { ThrowStmt } from '@angular/compiler';
import {URLS1} from '../Models/Url';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  type: string;
  date: string;
  questions: any[];
  responses: { [key: string]: boolean; } = {};
  responseObject: auditDetails;
  auditTypeStatus = false;
  //auditServiceObject : AuditService;
  
  auditDetailsFlag = true;
  auditSeverityPortalFlag = false;

  
  constructor(private httpClient:HttpClient,private router:Router,private _service:AuditService) 
  {
    this.type = '';
    this.questions = [];
    this.date = "";
    this.responses = {};
    this.responseObject = new auditDetails();
    localStorage.setItem("session","true");
    
  }

  ngOnInit(): void {
    this.responses={"question1":false,"question2":false,"question3":false,"question4":false,"question5":false};
    console.log(this.responses);
    
  }
  getQuestions() {
    this.httpClient.get<any>(`${URLS1.auditCheckList}` + this.type,
    {headers: new HttpHeaders({
    }).set("Authorization", "Bearer " + localStorage.getItem("jwt"))}).subscribe(data => {
      this.questions = data;
    },err =>
    {
      
      this.router.navigate(["/error"]);
    });
    this.auditTypeStatus = true;
  }

  onSelectRadio(index: number, event: Event) {
        
    let a = (event.target as HTMLInputElement).value;
    if(a==="Yes")
    {
      this.responses[("question")+index] = true;
    }
    else{
      this.responses[("question")+index] = false;
    }
  }
  

  sendResponse() {
    
    this.responseObject.type = this.type;
    this.responseObject.date = "";
    this.responseObject.questions = this.responses;
    console.log(this.responseObject);
    this.auditSeverityPortalFlag=true;
    this.auditDetailsFlag=false;
    this._service.setAuditDetails(this.responseObject);
    this.router.navigateByUrl("/AuditResponse");
    
  }
}
