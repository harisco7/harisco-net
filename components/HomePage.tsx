import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import Header from './Header';
import Knowledge from './Knowledge';
import Projects from './Projects';
import Resources from './Resources';
import Reveal from './Reveal';
import ScrollSpy from './ScrollSpy';
import Skills from './Skills';

export default function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const sections = [
    { id: 'Header', label: t.Header },
    { id: 'About', label: t.About },
    { id: 'Knowledge', label: t.Knowledge },
    { id: 'Projects', label: t.Projects },
    { id: 'Skills', label: t.Skills },
    { id: 'Contact', label: t.Contact },
    { id: 'Resources', label: t.Resources },
  ];

  return (
    <>
      <ScrollSpy items={sections} />
      <Header id="Header" locale={locale} t={t} />
      <main>
        <Reveal effect="slide-left">
          <About id="About" t={t} />
        </Reveal>
        <Reveal effect="fade">
          <Knowledge id="Knowledge" t={t} />
        </Reveal>
        <Projects id="Projects" t={t} />
        <Skills id="Skills" t={t} />
        <Contact id="Contact" t={t} />
        <Reveal effect="fade">
          <Resources id="Resources" t={t} />
        </Reveal>
      </main>
      <Footer t={t} />
    </>
  );
}
