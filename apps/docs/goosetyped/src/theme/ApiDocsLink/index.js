import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function ApiDocsLink(props) {
  const context = useDocusaurusContext();
  const { symbol } = props;
  return (
    <Link to={useBaseUrl(`${context.siteConfig.customFields.apiDocPrefix}${symbol.toLowerCase()}`)}>{ props.children || symbol }</Link>
  );
}

export default ApiDocsLink;
