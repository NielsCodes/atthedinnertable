import { TopicDetailComponent } from './home/topic-detail/topic-detail.component';
import { BmcComponent } from './elements/bmc/bmc.component';
import { FooterComponent } from './elements/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: ':title', component: TopicDetailComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
