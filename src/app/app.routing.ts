import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//USERS
import { UserComponent } from './components/user/user.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
//FRIENDS
import { FriendComponent } from './components/friend/friend.component';
import { FriendDetailComponent } from './components/friend/friend-detail/friend-detail.component';

//creo una propiedad appRputes que instancia la clase Routes
const appRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: 'users',
    component: UserComponent,
  },
  {
    path: 'users/:id',
    component: UserDetailComponent,
  },
  {
    path: 'friends',
    component: FriendComponent,
  },
  {
    path: 'friends/:id',
    component: FriendDetailComponent,
  },
  {
    path: '**',
    component: UserComponent,
  },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
