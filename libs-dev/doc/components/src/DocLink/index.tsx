import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export function DocLink(props: React.PropsWithChildren<{ to: string }>) {
  const { to } = props;
  return <Link to={useBaseUrl(to)}>{ props.children }</Link>;
}

export default DocLink;