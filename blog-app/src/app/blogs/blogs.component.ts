import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { EditServiceService } from '../edit-service.service';
import { Router } from '@angular/router';
// import { map } from 'rxjs';
// import { PostData } from './postdata.model';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  constructor(private http: HttpClient, private editService : EditServiceService, private router:Router) { }
  firebaseUrl =
    'https://blog-app-e6bdb-default-rtdb.firebaseio.com/posts.json';

  ngOnInit(): void {
  }
  
  @Input()
  blogTitle : string = this.editService.getTitle();
  @Input()
  blogContent : string = this.editService.getContent();

  createPost (postData: {title:string, content:string}) {
    console.log(postData);
    this.http.post(this.firebaseUrl, postData).subscribe((responseData) => {
      console.log(responseData);
    });
    this.blogTitle="";
    this.blogContent="";
  }

  onClearPosts(){
    this.http.delete(this.firebaseUrl).subscribe((response) => {
      console.log("Posts Cleared!");
    });
  }

  successMessageCreated(){
    alert("Post Added Successfully!");
  }

  successMessageCleared(){
    alert("All Posts Deleted Successfully!");
  }

  fetchPosts(){
    this.router.navigateByUrl('/viewblogs');
  }
}
