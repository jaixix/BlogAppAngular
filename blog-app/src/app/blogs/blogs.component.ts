import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { PostData } from './postdata.model';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  constructor(private http: HttpClient) { }
  fetchedPosts: PostData[] = [];
  firebaseUrl =
    'https://blog-app-e6bdb-default-rtdb.firebaseio.com/posts.json';
  
    ngOnInit(): void {}

  createPost (postData: {title:string, content:string}) {
    console.log(postData);
    this.http.post(this.firebaseUrl, postData).subscribe((responseData) => {
      console.log(responseData);
    });
  }

  onClearPosts(){
    this.http.delete(this.firebaseUrl).subscribe((response) => {
      console.log("Posts Cleared!");

    });
  }

  onFetchPosts(){
    this.http.get(this.firebaseUrl).pipe(map((responseData) => {
      const postsArray : PostData[] = [];
      for(const key in responseData){
        postsArray.push({...responseData[key], id:key})
      }
      return postsArray;
    })).subscribe((posts) => {
      this.fetchedPosts = posts;
    });
  }
}
