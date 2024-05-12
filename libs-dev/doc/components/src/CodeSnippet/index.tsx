import React, {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode } from '@docusaurus/theme-common';
import { Highlight, type PrismTheme } from 'prism-react-renderer';

import monokai from './monokai_prism_theme';

import styles from './styles.module.css';

export function CodeSnippet(props: React.PropsWithChildren<{ lang: string; snippet: string; }>) {
  const context = useDocusaurusContext();
  const prism: { theme?: PrismTheme; darkTheme?: PrismTheme; } = context.siteConfig.themeConfig.prism || {};

  const [mounted, setMounted] = useState(false);
  // The Prism theme on SSR is always the default theme but the site theme
  // can be in a different mode. React hydration doesn't update DOM styles
  // that come from SSR. Hence force a re-render after mounting to apply the
  // current relevant styles. There will be a flash seen of the original
  // styles seen using this current approach but that's probably ok. Fixing
  // the flash will require changing the theming approach and is not worth it
  // at this point.
  useEffect(() => { setMounted(true); }, []);

  const {isDarkTheme} = useColorMode();
  const lightModeTheme = prism.theme || monokai;
  const darkModeTheme = prism.darkTheme || lightModeTheme;
  const prismTheme = isDarkTheme ? darkModeTheme : lightModeTheme;

  const { lang = 'yaml', snippet } = props;

  return (
    <Highlight theme={prismTheme} code={snippet} language={lang}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} ${styles.codeSnippet}`} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export default CodeSnippet;
