import { Injectable, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditServiceService {

  constructor() { }
  title : string = "";
  content : string = "";
  
  setTitle(loadTitle : string){
    this.title = loadTitle;
    console.log("Load Title : " + loadTitle);
    console.log("Main Title : " + this.title);
  }

  @Output()
  getTitle(){
    console.log(this.title);
    return this.title;
  }

  setContent(loadContent : string){
    this.content = loadContent;
    console.log("Load Content : " + loadContent);
    console.log("Main Content : " + this.content);
  }

  @Output()
  getContent(){
    console.log(this.content);
    return this.content;
  }
}
