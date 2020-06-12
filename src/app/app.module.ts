import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirePerformanceModule, PerformanceMonitoringService } from '@angular/fire/performance';

import { environment } from '../environments/environment';

// Components
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './elements/header/header.component';
import { FooterComponent } from './elements/footer/footer.component';
import { BmcComponent } from './elements/bmc/bmc.component';
import { TweetComponent } from './elements/tweet/tweet.component';
import { TopicDetailComponent } from './home/topic-detail/topic-detail.component';

// Pipes
import { MarkdownPipe } from './pipes/markdown.pipe';

// Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    AngularFirePerformanceModule,
    BrowserAnimationsModule
  ],
  providers: [
    PerformanceMonitoringService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
