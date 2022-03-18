import {Dispatch, SetStateAction} from 'react';

export enum Language {
  EN = 'en',
}

export interface LocalizationContextProps {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}
