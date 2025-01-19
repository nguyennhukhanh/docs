import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'High Performance',
    Svg: require('@site/static/img/thanhhoa_performance.svg').default,
    description: (
      <>
        Built on Bun's non-blocking I/O, ThanhHoaJS delivers ultra-fast request processing
        with built-in caching and response compression.
      </>
    ),
  },
  {
    title: 'Developer Friendly',
    Svg: require('@site/static/img/thanhhoa_dev.svg').default,
    description: (
      <>
        Full TypeScript support with intuitive routing, modular middleware system,
        and comprehensive error handling for a seamless development experience.
      </>
    ),
  },
  {
    title: 'Enterprise Ready',
    Svg: require('@site/static/img/thanhhoa_security.svg').default,
    description: (
      <>
        Production-ready features including CORS, Helmet security, rate limiting,
        and Swagger documentation integration out of the box.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
