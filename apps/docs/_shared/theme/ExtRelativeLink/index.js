import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

function ExtRelativeLink(props) {
  const { to } = props;
  return (
    <a href={useBaseUrl(to)} target="_blank">{ props.children }</a>
  );
}

export default ExtRelativeLink;
