import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import Header from './Header';
import Projects from './Projects';
import Reveal from './Reveal';
import Skills from './Skills';

export default function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <Header id="Header" locale={locale} t={t} />
      <main>
        <Reveal effect="slide-left">
          <About id="About" t={t} />
        </Reveal>
        <Projects id="Projects" t={t} />
        <Skills id="Skills" t={t} />
        <Contact id="Contact" t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
