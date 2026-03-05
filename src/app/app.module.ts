import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

/**
 * Root Module Configuration
 * Angular 21+ Application with Standalone Components Support
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HeaderComponent,
    FooterComponent,

  ],
  providers: [
    // Zone change detection optimization
    provideClientHydration(withEventReplay()),

    // HTTP Client with fetch API
    // Provides: HttpClient, HttpRequest, HttpResponse, etc.
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    // Services are provided via @Injectable({ providedIn: 'root' })
    // CalculationService
    // EmailCaptureService
    // ToastService
    // AnalyticsService
    // SeoService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
