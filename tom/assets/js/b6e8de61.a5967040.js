(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{102:function(e,t,r){"use strict";var n=r(0),i=r.n(n),o=r(96),a=r(99);r(57);t.a=function(e){var t=e.to;return i.a.createElement(a.a,{to:Object(o.a)(t)},e.children)}},88:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return a})),r.d(t,"metadata",(function(){return c})),r.d(t,"toc",(function(){return u})),r.d(t,"default",(function(){return l}));var n=r(3),i=r(8),o=(r(0),r(98)),a=(r(102),{id:"serializer",title:"Serializer",sidebar_label:"3. Serializer"}),c={unversionedId:"serialization/serializer",id:"serialization/serializer",isDocsHomePage:!1,title:"Serializer",description:"TBD...",source:"@site/docs/serialization/serializer.md",slug:"/serialization/serializer",permalink:"/node/tom/docs/serialization/serializer",editUrl:"https://github.com/pebula/node/tree/master/apps/docs/tom/docs/docs/serialization/serializer.md",version:"current",sidebar_label:"3. Serializer",sidebar:"someSidebar",previous:{title:"Basic Usage",permalink:"/node/tom/docs/serialization/basic-usage"},next:{title:"Validation Introduction",permalink:"/node/tom/docs/validation/validation-introduction"}},u=[],s={toc:u};function l(e){var t=e.components,r=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"TBD..."))}l.isMDXComponent=!0},96:function(e,t,r){"use strict";r.d(t,"b",(function(){return o})),r.d(t,"a",(function(){return a}));var n=r(16),i=r(97);function o(){var e=Object(n.default)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,r=void 0===t?"/":t,o=e.url;return{withBaseUrl:function(e,t){return function(e,t,r,n){var o=void 0===n?{}:n,a=o.forcePrependBaseUrl,c=void 0!==a&&a,u=o.absolute,s=void 0!==u&&u;if(!r)return r;if(r.startsWith("#"))return r;if(Object(i.b)(r))return r;if(c)return t+r;var l=r.startsWith(t)?r:t+r.replace(/^\//,"");return s?e+l:l}(o,r,e,t)}}}function a(e,t){return void 0===t&&(t={}),(0,o().withBaseUrl)(e,t)}},97:function(e,t,r){"use strict";function n(e){return!0===/^(\w*:|\/\/)/.test(e)}function i(e){return void 0!==e&&!n(e)}r.d(t,"b",(function(){return n})),r.d(t,"a",(function(){return i}))},98:function(e,t,r){"use strict";r.d(t,"a",(function(){return f})),r.d(t,"b",(function(){return b}));var n=r(0),i=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var s=i.a.createContext({}),l=function(e){var t=i.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},f=function(e){var t=l(e.components);return i.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},p=i.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,a=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),f=l(r),p=n,b=f["".concat(a,".").concat(p)]||f[p]||d[p]||o;return r?i.a.createElement(b,c(c({ref:t},s),{},{components:r})):i.a.createElement(b,c({ref:t},s))}));function b(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,a=new Array(o);a[0]=p;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:n,a[1]=c;for(var s=2;s<o;s++)a[s]=r[s];return i.a.createElement.apply(null,a)}return i.a.createElement.apply(null,r)}p.displayName="MDXCreateElement"},99:function(e,t,r){"use strict";var n=r(0),i=r.n(n),o=r(10),a=r(97),c=r(7),u=Object(n.createContext)({collectLink:function(){}}),s=r(96),l=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(n=Object.getOwnPropertySymbols(e);i<n.length;i++)t.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(e,n[i])&&(r[n[i]]=e[n[i]])}return r};t.a=function(e){var t,r,f,d=e.isNavLink,p=e.to,b=e.href,v=e.activeClassName,m=e.isActive,O=e["data-noBrokenLinkCheck"],y=e.autoAddBaseUrl,w=void 0===y||y,j=l(e,["isNavLink","to","href","activeClassName","isActive","data-noBrokenLinkCheck","autoAddBaseUrl"]),g=Object(s.b)().withBaseUrl,h=Object(n.useContext)(u),k=p||b,z=Object(a.a)(k),P=null==k?void 0:k.replace("pathname://",""),E=void 0!==P?(r=P,w&&function(e){return e.startsWith("/")}(r)?g(r):r):void 0,x=Object(n.useRef)(!1),C=d?o.e:o.c,B=c.a.canUseIntersectionObserver;Object(n.useEffect)((function(){return!B&&z&&window.docusaurus.prefetch(E),function(){B&&f&&f.disconnect()}}),[E,B,z]);var S=null!==(t=null==E?void 0:E.startsWith("#"))&&void 0!==t&&t,D=!E||!z||S;return E&&z&&!S&&!O&&h.collectLink(E),D?i.a.createElement("a",Object.assign({href:E},k&&!z&&{target:"_blank",rel:"noopener noreferrer"},j)):i.a.createElement(C,Object.assign({},j,{onMouseEnter:function(){x.current||(window.docusaurus.preload(E),x.current=!0)},innerRef:function(e){var t,r;B&&e&&z&&(t=e,r=function(){window.docusaurus.prefetch(E)},(f=new window.IntersectionObserver((function(e){e.forEach((function(e){t===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(f.unobserve(t),f.disconnect(),r())}))}))).observe(t))},to:E||""},d&&{isActive:m,activeClassName:v}))}}}]);