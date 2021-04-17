import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Type Protection</>,
    imageUrl: 'img/type-protection.svg',
    description: (
      <>
        TOM is fully type safe, protecting your from interface updates, runtime type errors and more...
      </>
    ),
  },
  {
    title: <>Focus on What Matters</>,
    imageUrl: 'img/focus.svg',
    description: (
      <>
        TOM lets you focus on your application logic, taking away the complex and mundane work
        required to build and maintain serialization, validation and type to type mapping.
      </>
    ),
  },
  {
    title: <>Light Speed Performance</>,
    imageUrl: 'img/fast.svg',
    description: (
      <>
        TOM is fast, really, it is fast!
        By using a runtime JIT compilation engine TOM can create highly optimized JS serialization, validation and mapping
        functions which run super fast!
        TOM also includes a runtime function to each of the above so it can also fallback if not JIT is available due to lack of type information
        or just because you disabled it.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
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

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted
              )}
              to={useBaseUrl('docs/getting-started/introduction')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
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
        <div className="text--center">
          We're just scratching the surface, TOM is also highly extensible allowing type customization of any sort and offers a wide array of features!

        </div>
      </main>
    </Layout>
  );
}

export default Home;
