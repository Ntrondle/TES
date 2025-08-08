import {defaultLocale} from './locales';

export async function getDictionary(locale) {
  try {
    const dict = (await import(`./dictionaries/${locale}.json`)).default;
    return dict;
  } catch {
    const dict = (await import(`./dictionaries/${defaultLocale}.json`)).default;
    return dict;
  }
}
