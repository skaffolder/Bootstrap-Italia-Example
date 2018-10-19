// DEPENDENCIES
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

// SHARED MODULE
import { SharedModule } from './shared/shared.module';

// CORE MODULE
import { CoreModule } from './core.module';

// LAYOUT
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar.component';

// DIRECTIVES
import { MailValidator } from './directives/mail.validate.directive';

// DECLARE APPLICATION MODULE
@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    AppRoutingModule, // ROUTES
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    CoreModule
  ],
  declarations: [
    // LAYOUT
    AppComponent,
    NavbarComponent,
    MailValidator,
  ],
  providers:    [
  ],
})
export class AppModule { }
