import LocalizedStrings from 'react-localization';

import translations from 'common/localization/translations';
import {Language} from 'common/localization/Localization.types';
import {useLanguageContext} from 'common/localization/Localization.context';

export default function useTranslation() {
  const {language} = useLanguageContext();

  const translation = new LocalizedStrings(translations);
  translation.setLanguage(language ?? Language.EN);

  return translation;
}
