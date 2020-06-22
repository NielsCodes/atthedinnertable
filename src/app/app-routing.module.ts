import { TopicDetailComponent } from './home/topic-detail/topic-detail.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'contribute', loadChildren: () => import('./contribute/contribute.module').then(m => m.ContributeModule)
  },
  {
    path: '', component: HomeComponent, children: [
      { path: ':url', component: TopicDetailComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
