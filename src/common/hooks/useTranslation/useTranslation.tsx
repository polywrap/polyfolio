import LocalizedStrings from 'react-localization';

import {useLanguageContext} from 'common/localization/Localization.context';
import translations from 'common/localization/translations';

export default function useTranslation() {
  const {language} = useLanguageContext();
  const translation = new LocalizedStrings(translations);
  translation.setLanguage(language);

  return translation;
}
