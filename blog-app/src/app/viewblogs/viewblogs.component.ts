import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { PostData } from '../blogs/postdata.model';

@Component({
  selector: 'app-viewblogs',
  templateUrl: './viewblogs.component.html',
  styleUrls: ['./viewblogs.component.css']
})
export class ViewblogsComponent implements OnInit {

  constructor(private http: HttpClient) { }
  fetchedPosts: PostData[] = [];
  firebaseUrl =
    'https://blog-app-e6bdb-default-rtdb.firebaseio.com/posts.json';
  ngOnInit(): void {}

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
