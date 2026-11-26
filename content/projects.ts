import type { Dictionary } from '@/i18n/dictionaries';

type Key = keyof Dictionary;

export type Project = {
  /** A translation key, or a fixed name that is the same in every language. */
  title: { key: Key } | { text: string };
  href?: string;
  points: [Key, Key, Key, Key];
  status: 'done' | 'archived';
  duration: { amount: string; unit: 'months' | 'years' };
};

export const projects: Project[] = [
  {
    title: { text: 'Edyoucated' },
    href: 'https://edyoucated.org/',
    points: ['WikiForumPlatform1', 'WikiForumPlatform2', 'WikiForumPlatform3', 'WikiForumPlatform4'],
    status: 'done',
    duration: { amount: '7', unit: 'months' },
  },
  {
    title: { key: 'TextUnited' },
    href: 'https://www.textunited.com/',
    points: ['TextUnited1', 'TextUnited2', 'TextUnited3', 'TextUnited4'],
    status: 'done',
    duration: { amount: '5+', unit: 'years' },
  },
  {
    title: { text: 'Protonet SOUL' },
    href: 'https://protonet.com/',
    points: ['Protonet1', 'Protonet2', 'Protonet3', 'Protonet4'],
    status: 'done',
    duration: { amount: '16', unit: 'months' },
  },
  {
    title: { key: 'eTermin' },
    points: ['eTermin1', 'eTermin2', 'eTermin3', 'eTermin4'],
    status: 'archived',
    duration: { amount: '9', unit: 'months' },
  },
  {
    title: { key: 'ElectionVoting' },
    points: ['ElectionVoting1', 'ElectionVoting2', 'ElectionVoting3', 'ElectionVoting4'],
    status: 'done',
    duration: { amount: '3', unit: 'months' },
  },
  {
    title: { key: 'Shopify' },
    points: ['Shopify1', 'Shopify2', 'Shopify3', 'Shopify4'],
    status: 'done',
    duration: { amount: '6', unit: 'months' },
  },
  {
    title: { key: 'ShortenText' },
    points: ['ShortenText1', 'ShortenText2', 'ShortenText3', 'ShortenText4'],
    status: 'done',
    duration: { amount: '12', unit: 'months' },
  },
  {
    title: { key: 'DigitalLibrary' },
    points: ['DigitalLibrary1', 'DigitalLibrary2', 'DigitalLibrary3', 'DigitalLibrary4'],
    status: 'archived',
    duration: { amount: '6', unit: 'months' },
  },
  {
    title: { key: 'ErpSystem' },
    points: ['ErpSystem1', 'ErpSystem2', 'ErpSystem3', 'ErpSystem4'],
    status: 'archived',
    duration: { amount: '12', unit: 'months' },
  },
];
