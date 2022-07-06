import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-amsheader',
  templateUrl: './amsheader.component.html',
  styleUrls: ['./amsheader.component.css']
})
export class AMSHeaderComponent implements OnInit {
  constructor(private router:Router) {
  }

  ngOnInit(): void {
  }

  logOutAll()
  {
    localStorage.removeItem("session");
    localStorage.removeItem("jwt");
    this.router.navigate(["/login"]);
    
  }

}
