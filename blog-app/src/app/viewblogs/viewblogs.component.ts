import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { map } from 'rxjs';
import { BlogsComponent } from '../blogs/blogs.component';
import { PostData } from '../blogs/postdata.model';
import { EditServiceService } from '../edit-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewblogs',
  templateUrl: './viewblogs.component.html',
  styleUrls: ['./viewblogs.component.css']
})
export class ViewblogsComponent implements OnInit {

  constructor(private http : HttpClient, private editService : EditServiceService, private router : Router) { }
  fetchedPosts: PostData[] = [];
  firebaseUrl =
    'https://blog-app-e6bdb-default-rtdb.firebaseio.com/posts.json';
  ngOnInit(): void {
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

  private personalHeaders = new HttpHeaders({"Access-Control-Allow-Origin" : '*',
  "Access-Control-Allow-Methods" : 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
  "Access-Control-Allow-Headers" : 'Origin, Content-Type, X-Auth-Token, content-type',
  });

  editBlog(fetchedPostsFromUI: {content:string, title:string, id:string}){
    console.log(fetchedPostsFromUI);
    this.editService.setTitle(fetchedPostsFromUI.title);
    this.editService.setContent(fetchedPostsFromUI.content);
    this.router.navigateByUrl('/writeblog');
  }

  deleteBlog(fetchedPostDelete: {content:string, title:string, id: string}){
    // const deleteUrl = "https://blog-app-e6bdb-default-rtdb.firebaseio.com/posts/" +fetchedPostDelete.id;
    // console.log(deleteUrl);
    // this.http.delete(deleteUrl, {headers : this.personalHeaders}).subscribe((responseData) => {
    //   console.log(fetchedPostDelete.id);
    //   alert("Deleted Post!");
    // });
    // const deleteUrl = "https://blog-app-e6bdb-default-rtdb.firebaseio.com/posts/" +fetchedPostDelete.id;
    // this.http.put(deleteUrl, fetchedPostDelete).subscribe(responseData => {
    //   fetchedPostDelete.title='New title';
    //   console.log(fetchedPostDelete.id);
    // });
    // console.log(fetchedPostDelete);
    this.reloadCurrentRoute();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
}
