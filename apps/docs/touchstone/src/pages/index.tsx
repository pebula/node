import clsx from 'clsx';
import { DocusaurusConfig } from '@docusaurus/types';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { CodeSnippet } from "@doc-components";
import styles from './index.module.css';

const exampleCode = `import { Suite, Case } from '@pebula/touchstone';

@Suite({ name: 'My First Benchmark Suite' })
class MyFirstBenchmarkSuite {
 @Case({ name: 'my-first-benchmark' })
  firstBenchmark() {
    /* Benchmarking... */
  }

  @Case()
  async secondBenchmark() {
     // Will automatically detect that it's async. Name is taken from method name.
    /* Benchmarking... */
  }
}`;

const features = [
  {
    title: <>Easy to Use</>,
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>

      </>
    ),
  },
  {
    title: <>Focus on What Matters</>,
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>

      </>
    ),
  },
  {
    title: <>Code Reuse</>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>

      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home(): JSX.Element {
  const context = useDocusaurusContext();
  const siteConfig = context.siteConfig || {} as DocusaurusConfig;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/getting-started/introduction')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className={clsx('col')}>
                <CodeSnippet snippet={exampleCode} lang="typescript"></CodeSnippet>
              </div>
            </div>
          </div>
        </section>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
