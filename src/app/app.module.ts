import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// angular material modules
import { MaterialModule } from './app.material';
// import httpclinet class for REST clients
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// RUTAS
import { routing, appRoutingProviders } from './app.routing';
// SPINNER
import { NgxSpinnerModule } from 'ngx-spinner';

//componentes
import { UserComponent } from './components/user/user.component';
import { UserAddComponent } from './components/user/user-add/user-add.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { FriendComponent } from './components/friend/friend.component';
import { FriendAddComponent } from './components/friend/friend-add/friend-add.component';
import { FriendEditComponent } from './components/friend/friend-edit/friend-edit.component';
import { MatComfirmDialogComponent } from './components/mat-comfirm-dialog/mat-comfirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FriendComponent,
    UserDetailComponent,
    UserAddComponent,
    MatComfirmDialogComponent,
    UserEditComponent,
    FriendAddComponent,
    FriendEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    routing,
    appRoutingProviders,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
