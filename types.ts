
export type Language = 'en' | 'ar' | 'ru' | 'fr';

export interface Translations {
  [key: string]: { [key: string]: string };
}
