import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BlogsComponent } from './blogs/blogs.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ViewblogsComponent } from './viewblogs/viewblogs.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'writeblog', component: BlogsComponent},
  { path: 'viewblogs', component: ViewblogsComponent  },
];

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    HomeComponent,
    ViewblogsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
