import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

function typeToSegment(type: string) {
  switch (type) {
    case 'arm':
      return 'arm-servicebus';
    case 'schemaType':
      return 'service-bus';
  }
  throw new Error(`Unknown link segment type ${type}`);
}

export function AzureDocsLink(props: React.PropsWithChildren<{ type: string; symbol: string; display: string; }>) {
  const context = useDocusaurusContext();
  const { type, symbol, display } = props;

  const href = `${context.siteConfig.customFields.azureDocsUrl}/${typeToSegment(type)}/${symbol.toLowerCase()}`;
  return <a href={href} target="_blank">{ props.children || display || symbol }</a>;
}

export default AzureDocsLink;