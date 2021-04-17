(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{102:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(96),i=n(99);n(57);t.a=function(e){var t=e.to;return o.a.createElement(i.a,{to:Object(a.a)(t)},e.children)}},81:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return l}));var r=n(3),o=n(8),a=(n(0),n(98)),i=(n(102),{id:"basic-usage",title:"Basic Usage",sidebar_label:"3. Basic Usage"}),c={unversionedId:"getting-started/basic-usage",id:"getting-started/basic-usage",isDocsHomePage:!1,title:"Basic Usage",description:"TBD...",source:"@site/docs/getting-started/basic-usage.md",slug:"/getting-started/basic-usage",permalink:"/node/tom/docs/getting-started/basic-usage",editUrl:"https://github.com/pebula/node/tree/master/apps/docs/tom/docs/docs/getting-started/basic-usage.md",version:"current",sidebar_label:"3. Basic Usage",sidebar:"someSidebar",previous:{title:"Installation",permalink:"/node/tom/docs/getting-started/installation"},next:{title:"Core Module",permalink:"/node/tom/docs/basics/core-module"}},s=[],u={toc:s};function l(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"TBD..."))}l.isMDXComponent=!0},96:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return i}));var r=n(16),o=n(97);function a(){var e=Object(r.default)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,n=void 0===t?"/":t,a=e.url;return{withBaseUrl:function(e,t){return function(e,t,n,r){var a=void 0===r?{}:r,i=a.forcePrependBaseUrl,c=void 0!==i&&i,s=a.absolute,u=void 0!==s&&s;if(!n)return n;if(n.startsWith("#"))return n;if(Object(o.b)(n))return n;if(c)return t+n;var l=n.startsWith(t)?n:t+n.replace(/^\//,"");return u?e+l:l}(a,n,e,t)}}}function i(e,t){return void 0===t&&(t={}),(0,a().withBaseUrl)(e,t)}},97:function(e,t,n){"use strict";function r(e){return!0===/^(\w*:|\/\/)/.test(e)}function o(e){return void 0!==e&&!r(e)}n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return o}))},98:function(e,t,n){"use strict";n.d(t,"a",(function(){return f})),n.d(t,"b",(function(){return b}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=o.a.createContext({}),l=function(e){var t=o.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},f=function(e){var t=l(e.components);return o.a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},p=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),f=l(n),p=r,b=f["".concat(i,".").concat(p)]||f[p]||d[p]||a;return n?o.a.createElement(b,c(c({ref:t},u),{},{components:n})):o.a.createElement(b,c({ref:t},u))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=p;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var u=2;u<a;u++)i[u]=n[u];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},99:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(10),i=n(97),c=n(7),s=Object(r.createContext)({collectLink:function(){}}),u=n(96),l=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};t.a=function(e){var t,n,f,d=e.isNavLink,p=e.to,b=e.href,v=e.activeClassName,g=e.isActive,m=e["data-noBrokenLinkCheck"],O=e.autoAddBaseUrl,y=void 0===O||O,w=l(e,["isNavLink","to","href","activeClassName","isActive","data-noBrokenLinkCheck","autoAddBaseUrl"]),j=Object(u.b)().withBaseUrl,h=Object(r.useContext)(s),k=p||b,P=Object(i.a)(k),E=null==k?void 0:k.replace("pathname://",""),x=void 0!==E?(n=E,y&&function(e){return e.startsWith("/")}(n)?j(n):n):void 0,B=Object(r.useRef)(!1),C=d?a.e:a.c,U=c.a.canUseIntersectionObserver;Object(r.useEffect)((function(){return!U&&P&&window.docusaurus.prefetch(x),function(){U&&f&&f.disconnect()}}),[x,U,P]);var D=null!==(t=null==x?void 0:x.startsWith("#"))&&void 0!==t&&t,T=!x||!P||D;return x&&P&&!D&&!m&&h.collectLink(x),T?o.a.createElement("a",Object.assign({href:x},k&&!P&&{target:"_blank",rel:"noopener noreferrer"},w)):o.a.createElement(C,Object.assign({},w,{onMouseEnter:function(){B.current||(window.docusaurus.preload(x),B.current=!0)},innerRef:function(e){var t,n;U&&e&&P&&(t=e,n=function(){window.docusaurus.prefetch(x)},(f=new window.IntersectionObserver((function(e){e.forEach((function(e){t===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(f.unobserve(t),f.disconnect(),n())}))}))).observe(t))},to:x||""},d&&{isActive:g,activeClassName:v}))}}}]);