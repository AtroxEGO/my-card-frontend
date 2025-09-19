import { provideServerRendering, withRoutes } from '@angular/ssr';
import {
  mergeApplicationConfig,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { readFileSync } from 'fs';
import { ReplaySubject } from 'rxjs';

export function TranslateServerLoader() {
  return {
    getTranslation: (lang: string) => {
      const filePath = `./src/assets/locale/${lang}.json`;
      const content = readFileSync(filePath, 'utf8');
      const response = new ReplaySubject();
      response.next(JSON.parse(content));
      return response.asObservable();
    },
  };
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: TranslateServerLoader,
          deps: [HttpClient],
        },
      }),
    ),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
