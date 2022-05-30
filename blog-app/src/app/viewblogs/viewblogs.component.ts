import { HttpClient } from '@angular/common/http';
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

  editBlog(fetchedPostsFromUI: {content:string, title:string, id:string}){
    console.log(fetchedPostsFromUI);
    this.editService.setTitle(fetchedPostsFromUI.title);
    this.editService.setContent(fetchedPostsFromUI.content);
    this.router.navigateByUrl('/writeblog');
  }

  deleteBlog(fetchedPostDelete: {content:string, title:string, id:string}){
    const deleteUrl = "https://blog-app-e6bdb-default-rtdb.firebaseio.com/posts/" +fetchedPostDelete.id;
    this.http.delete(deleteUrl).subscribe((response) => {
      console.log(fetchedPostDelete.id);
      console.log("Deleted Post!");
    });
    // console.log(fetchedPostDelete.id);
  }
}
