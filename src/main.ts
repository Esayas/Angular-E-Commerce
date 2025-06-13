import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

import { importProvidersFrom } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faUser, faEdit } from '@fortawesome/free-solid-svg-icons';

// 🔁 Add any icons you want to use globally
library.add(faTrash, faUser, faEdit);

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(FontAwesomeModule), // ⬅️ Required for <fa-icon>
  ],
}).catch((err) => console.error(err));

// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
// import { provideHttpClient } from '@angular/common/http';

// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';

// // bootstrapApplication(AppComponent, appConfig).catch((err) =>
// //   console.error(err)
// // );

// bootstrapApplication(AppComponent, {
//   ...appConfig,
//   providers: [
//     ...(appConfig.providers || []),
//     provideHttpClient(), // Add HTTP client support
//     provideRouter(routes),

//   ],
// }).catch((err) => console.error(err));
