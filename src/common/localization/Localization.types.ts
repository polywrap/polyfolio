import {Dispatch, SetStateAction} from 'react';

enum Language {
  EN = 'en',
}

interface LocalizationContextProps {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}

export {Language, LocalizationContextProps};
