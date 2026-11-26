import Image from 'next/image';
import type { Dictionary } from '@/i18n/dictionaries';
import LanguageMeter from './LanguageMeter';
import Reveal from './Reveal';
import styles from './Skills.module.css';

type SkillsProps = {
  id: string;
  t: Dictionary;
};

export default function Skills({ id, t }: SkillsProps) {
  const skills = [
    { title: t.TimeManagement, icon: '/time.svg', corner: styles.topLeft },
    { title: t.AttentionToDetails, icon: '/details.svg', corner: styles.topRight },
    { title: t.Resourcefulness, icon: '/resources.svg', corner: styles.bottomLeft },
    { title: t.Responsibility, icon: '/notepad.svg', corner: styles.bottomRight },
  ];

  const languages = [
    { name: t.english, flag: '/en.png', percent: 97 },
    { name: t.german, flag: '/de.png', percent: 90 },
    { name: t.spanish, flag: '/es.png', percent: 25 },
  ];

  return (
    <section className={styles.root} id={id}>
      <div className={`container ${styles.container}`}>
        <h2>{t.PersonalSkills}</h2>
        <Reveal effect="zoom" cascade className="row justify-content-center">
          {skills.map((skill) => (
            <div key={skill.icon} className="col-12 col-lg-6">
              <div className={`${styles.card} ${skill.corner}`}>
                <h3>{skill.title}</h3>
                <Image src={skill.icon} alt="" width={115} height={115} />
              </div>
            </div>
          ))}
          <div className="col-12">
            <div className={styles.box}>
              <h3>{t.Languages}</h3>
              <div className="row">
                {languages.map((language) => (
                  <LanguageMeter key={language.flag} name={language.name} flag={language.flag} percent={language.percent} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
