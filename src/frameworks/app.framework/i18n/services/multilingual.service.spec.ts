import {provide} from 'angular2/core';

import {TranslateService} from 'ng2-translate/ng2-translate';

import {t, TEST_COMMON_PROVIDERS} from '../../../test.framework/_providers';
import {WindowMockFrench} from '../../../test.framework/core/mocks/iwindow.mock';
import {Multilingual, Lang} from './multilingual.service';

export function main() {
  t.describe('Multilingual', () => {
    t.bep(() => [
      TEST_COMMON_PROVIDERS(),
      provide(Multilingual, {
        useFactory: (translate, win) => {
          return new Multilingual(translate, win);
        },
        deps: [TranslateService, Window]
      })
    ]);
    t.it('should get language', t.inject([Multilingual], (multilang) => {
      expect(multilang.getLang()).toBe('en');
    }));
    t.it('should support only english by default', t.inject([Multilingual], (multilang) => {
      expect(Multilingual.SUPPORTED_LANGUAGES.length).toBe(1);
      expect(Multilingual.SUPPORTED_LANGUAGES[0].code).toBe('en');
    }));
    t.it('should default static files loader', t.inject([Multilingual], (multilang) => {
      expect(Multilingual.STATIC_FILES_LOADER).toBe('assets/i18n');
    }));

  });

  t.describe('Multilingual for French and should allow customization of location of i18n files', () => {
    const SUPPORTED_LANGUAGES: Array<Lang> = [
      { code: 'en', label: 'English' },
      { code: 'fr', label: 'French' }
    ];
    t.bep(() => [
      TEST_COMMON_PROVIDERS({ Window: WindowMockFrench}),
      provide(Multilingual, {
        useFactory: (translate, win) => {
          Multilingual.SUPPORTED_LANGUAGES = SUPPORTED_LANGUAGES;
          Multilingual.STATIC_FILES_LOADER = 'public/i18n';
          return new Multilingual(translate, win);
        },
        deps: [TranslateService, Window]
      })
    ]);
    t.it('should get language - french', t.inject([Multilingual], (multilang) => {
      expect(multilang.getLang()).toBe('fr');
    }));
    t.it('should now support french', t.inject([Multilingual], (multilang) => {
      expect(Multilingual.SUPPORTED_LANGUAGES.length).toBe(2);
      expect(Multilingual.SUPPORTED_LANGUAGES[0].code).toBe('en');
      expect(Multilingual.SUPPORTED_LANGUAGES[1].code).toBe('fr');
    }));
    t.it('i18n file location should be custom', t.inject([Multilingual], (multilang) => {
      expect(Multilingual.STATIC_FILES_LOADER).toBe('public/i18n');
    }));
  });

}
