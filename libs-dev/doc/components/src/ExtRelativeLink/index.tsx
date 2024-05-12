import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export function ExtRelativeLink(props: React.PropsWithChildren<{ to: string }>) {
  const { to } = props;
  return <a href={useBaseUrl(to)} target="_blank">{ props.children }</a>;
}

export default ExtRelativeLink;
