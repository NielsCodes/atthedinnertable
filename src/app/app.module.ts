import { MarkdownPipe } from './pipes/main/markdown.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {ClipboardModule} from '@angular/cdk/clipboard';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirePerformanceModule, PerformanceMonitoringService } from '@angular/fire/performance';

import { environment } from '../environments/environment';

// Quill editor -- needs to be registered in root module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './elements/header/header.component';
import { FooterComponent } from './elements/footer/footer.component';
import { BmcComponent } from './elements/bmc/bmc.component';
import { TweetComponent } from './elements/tweet/tweet.component';
import { TopicDetailComponent } from './home/topic-detail/topic-detail.component';
import { AboutComponent } from './about/about.component';
import { ShareMenuComponent } from './home/topic-detail/share-menu/share-menu.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BmcComponent,
    TweetComponent,
    TopicDetailComponent,
    MarkdownPipe,
    AboutComponent,
    ShareMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    AngularFirePerformanceModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ClipboardModule
  ],
  providers: [
    PerformanceMonitoringService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
