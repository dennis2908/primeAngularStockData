import { Component, OnInit } from '@angular/core';


@Component({
	selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  attemptSubmit
  userForm=[] 
  username
  myform = {} as any;
  constructor(){
  
  }

  ngOnInit(): void {
	
  }
  
  onSubmit() {
    this.attemptSubmit = true
		if(this.myform.username && this.myform.password){
		   if(!this.hasWhiteSpace(this.myform))
			return false;
			if(this.myform.username==="console" && this.myform.password==="myconsole"){
				localStorage.setItem('NgPrimeDM', window.btoa(window.btoa(window.btoa(window.btoa( "console" )))));
				window.location.reload()  
			}
		}

  }
  hasWhiteSpace(s) {
    return /\s/g.test(s);
  }
}