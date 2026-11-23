import cardTranslations from './english-cards.txt?raw';
import uiTranslations from './english-ui.txt?raw';

export const english = document.documentElement.lang === 'en';

const translations = new Map((cardTranslations + '\n' + uiTranslations)
  .split(/\r?\n/)
  .filter(line => line.includes('|'))
  .map(line => {
    const [phrase, translated] = line.split('|');
    return [phrase, translated.replaceAll('\\x20', ' ')];
  }));
const escapeRegex = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const pattern = english && new RegExp(
  [...translations.keys()].sort((a, b) => b.length - a.length).map(escapeRegex).join('|'),
  'g',
);

// The original calculator and its English interface share the same rules and card IDs.
export function localize(text) {
  return english ? text.replace(pattern, phrase => translations.get(phrase)) : text;
}

export const copy = (portuguese, translated) => english ? translated : portuguese;
