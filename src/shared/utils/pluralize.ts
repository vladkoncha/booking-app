export function pluralize(count: number, wordForms: string[]) {
  const pluralRules = new Intl.PluralRules('ru-RU');

  switch (pluralRules.select(count)) {
    case 'one':
      return `${count} ${wordForms[0]}`;
    case 'few':
      return `${count} ${wordForms[1]}`;
    case 'many':
      return `${count} ${wordForms[2]}`;
    default:
      return `${count} ${wordForms[2]}`;
  }
}
