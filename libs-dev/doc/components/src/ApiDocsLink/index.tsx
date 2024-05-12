import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export function ApiDocsLink(props: React.PropsWithChildren<{ symbol: string }>) {
  const context = useDocusaurusContext();
  const { symbol } = props;
  return <Link to={useBaseUrl(`${context.siteConfig.customFields.apiDocPrefix}${symbol.toLowerCase()}`)}>{ props.children || symbol }</Link>;
}

export default ApiDocsLink;
