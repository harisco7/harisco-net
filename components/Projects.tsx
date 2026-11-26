import { projects } from '@/content/projects';
import type { Dictionary } from '@/i18n/dictionaries';
import styles from './Projects.module.css';

type ProjectsProps = {
  id: string;
  t: Dictionary;
};

export default function Projects({ id, t }: ProjectsProps) {
  const statusLabels = { done: t.DoneLabel, archived: t.ArchivedLabel };
  const unitLabels = { months: t.MonthsLabel, years: t.YearsLabel };

  return (
    <section className={styles.root} id={id}>
      <h2>{t.Projects}</h2>
      <div className="container-fluid">
        <div className="row">
          {projects.map((project) => {
            const title = 'key' in project.title ? t[project.title.key] : project.title.text;
            return (
              <div key={title} className={`col-12 col-sm-6 col-md-4 ${styles.project}`}>
                <h3>
                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noopener noreferrer">
                      {title}
                    </a>
                  ) : (
                    title
                  )}
                </h3>
                <ul>
                  {project.points.map((point) => (
                    <li key={point}>{t[point]}</li>
                  ))}
                </ul>
                <div>
                  {t.StatusLabel}: <span className={`${styles.label} ${styles[project.status]}`}>{statusLabels[project.status]}</span>
                  &nbsp;&nbsp;
                  {t.DurationLabel}:{' '}
                  <span className={`${styles.label} ${styles.duration}`}>
                    {project.duration.amount} {unitLabels[project.duration.unit]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
