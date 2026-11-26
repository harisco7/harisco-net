import type { Dictionary } from '@/i18n/dictionaries';

export const newsletters = [
  { name: 'Front-end Focus', href: 'https://frontendfoc.us/' },
  { name: 'TLDR', href: 'https://www.tldrnewsletter.com/' },
  { name: 'Mobile Dev Weekly', href: 'https://mobiledevweekly.com/' },
  { name: 'Web Tools Weekly', href: 'https://webtoolsweekly.com/' },
  { name: 'Node Weekly', href: 'https://nodeweekly.com/' },
  { name: 'React Newsletter', href: 'http://reactjsnewsletter.com/' },
  { name: 'Responsive Design Weekly', href: 'https://responsivedesign.is/' },
  { name: 'Web Development Reading List', href: 'https://wdrl.info/' },
  { name: 'Javascript Weekly', href: 'https://javascriptweekly.com/' },
  { name: 'UX Design Weekly', href: 'http://uxdesignweekly.com/' },
  { name: 'Smashing Newsletter', href: 'https://www.smashingmagazine.com' },
  { name: 'AI Weekly', href: 'http://aiweekly.co/' },
  { name: 'CSS Weekly', href: 'https://css-weekly.com/' },
  { name: 'Sitepoint Newsletter', href: 'https://www.sitepoint.com/newsletter/' },
  { name: 'Postgres Weekly', href: 'https://postgresweekly.com/' },
  { name: 'Postanly Weekly', href: 'https://goodbits.io/emails/635efb73-5078-4937-ad39-eeda04e3286d' },
  { name: 'GraphQL Weekly', href: 'https://www.graphqlweekly.com/' },
  { name: 'Deep Learning Weekly', href: 'https://www.deeplearningweekly.com/' },
  { name: 'Medium Weekly Digest', href: 'https://www.medium.com/' },
  { name: 'DEV Digest', href: 'https://www.dev.to/' },
  { name: 'Programming Digest', href: 'https://programmingdigest.net/' },
];

export type ResourceCollection = {
  /** A translation key, or a fixed name that is the same in every language. */
  title: { key: keyof Dictionary } | { text: string };
  description: keyof Dictionary;
  link: { name: string; href: string };
};

export const collections: ResourceCollection[] = [
  {
    title: { text: 'Awesome Lists' },
    description: 'AwesomeDesc1',
    link: { name: 'sindresorhus/awesome', href: 'https://github.com/sindresorhus/awesome' },
  },
  {
    title: { text: 'Awesome Awesomeness' },
    description: 'AwesomeDesc2',
    link: { name: 'bayandin/awesome-awesomeness', href: 'https://github.com/bayandin/awesome-awesomeness' },
  },
  {
    title: { key: 'Codepen' },
    description: 'CodepenDesc',
    link: { name: 'CodePen Coolness', href: 'https://codepen.io/collection/DwJYwz/' },
  },
];
