(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{144:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return u})),n.d(t,"default",(function(){return p}));var r=n(3),a=n(8),o=(n(0),n(172)),i=n(185),c={id:"basic-example",title:"Basic Usage",sidebar_label:"3. Basic Usage"},s={unversionedId:"getting-started/basic-example",id:"getting-started/basic-example",isDocsHomePage:!1,title:"Basic Usage",description:"To run a benchmark you need",source:"@site/docs/getting-started/basic-example.md",slug:"/getting-started/basic-example",permalink:"/node/touchstone/docs/getting-started/basic-example",editUrl:"https://github.com/pebula/node/tree/master/apps/docs/touchstone/docs/docs/getting-started/basic-example.md",version:"current",sidebar_label:"3. Basic Usage",sidebar:"someSidebar",previous:{title:"Installation",permalink:"/node/touchstone/docs/getting-started/installation"},next:{title:"Suite Container",permalink:"/node/touchstone/docs/using-touchstone/suite-container"}},u=[{value:"Reports",id:"reports",children:[]}],l={toc:u};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"To run a benchmark you need"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"At least one benchmark ",Object(o.b)("strong",{parentName:"li"},"Case")),Object(o.b)("li",{parentName:"ul"},"At least one ",Object(o.b)("strong",{parentName:"li"},"Suite"),", grouping the case/s."),Object(o.b)("li",{parentName:"ul"},"A touchstone configuration container, used for configuration, composition, etc... (not mandatory)")),Object(o.b)("p",null,"We start with a ",Object(o.b)("strong",{parentName:"p"},"Suite")," and 2 ",Object(o.b)("strong",{parentName:"p"},"Cases")," benchmarks:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"import { Suite, Case, touchStone } from '@pebula/touchstone';\n\n@Suite({ name: 'My First Benchmark Suite' })\nclass MyFirstBenchmarkSuite {\n @Case({ name: 'my-first-benchmark' })\n  firstBenchmark() {\n    /* Benchmarking... */\n  }\n\n  @Case()\n  async secondBenchmark() {\n     // Will automatically detect that it's async. Name is taken from method name.\n    /* Benchmarking... */\n  }\n}\n\n// await touchStone(); // for top level await\ntouchStone()\n    .then( () => console.log('Done') )\n    .catch( err => console.error(err) );\n")),Object(o.b)("p",null,"We can add more suites with cases or add cases to the existing suite."),Object(o.b)("p",null,"At this point we can call ",Object(o.b)("inlineCode",{parentName:"p"},"await touchStone()")," to execute the suite/s.",Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("inlineCode",{parentName:"p"},"touchStone()")," will run go over all suites and execute all cases within each suite."),Object(o.b)("p",null,"Something is missing though, it will not report anything, we need a ",Object(o.b)("strong",{parentName:"p"},"reporter")," for that..."),Object(o.b)("h2",{id:"reports"},"Reports"),Object(o.b)("p",null,"Reporters are used to output the statistics and result of the suite/s, case/s and other metadata collected in the benchmarking process."),Object(o.b)("p",null,"Each report implements it's own output medium, let's add the default console reporter:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"import { Suite, Case, SimpleConsoleReporter } from '@pebula/touchstone';\n\n@Suite({ name: 'My First Benchmark Suite' })\nclass MyFirstBenchmarkSuite extends Mixin(SimpleConsoleReporter) {\n @Case({ name: 'my-first-benchmark' })\n  firstBenchmark() {\n    /* Benchmarking... */\n  }\n\n  @Case()\n  async secondBenchmark() {\n     // Will automatically detect that it's async. Name is taken from method name.\n    /* Benchmarking... */\n  }\n}\n")),Object(o.b)("p",null,"Note that all we do here is ",Object(o.b)("strong",{parentName:"p"},"extend")," our suite with the reporter class using the ",Object(o.b)("inlineCode",{parentName:"p"},"Mixin")," function."),Object(o.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("ul",{parentName:"div"},Object(o.b)("li",{parentName:"ul"},"A report can output to multiple mediums, it is up to the implementation of each report"),Object(o.b)("li",{parentName:"ul"},"You can ",Object(o.b)("strong",{parentName:"li"},"mixin")," multiple reports.")))),Object(o.b)("p",null,"This is pretty simple and will work with multiple suite's as well.",Object(o.b)("br",{parentName:"p"}),"\n","You can configure a different reporter for different suites but it is also harder to manage."),Object(o.b)("p",null,"To help managing the suite, creating a shared configuration and automate execution use the ",Object(o.b)(i.a,{to:"docs/using-touchstone/suite-container",mdxType:"DocLink"},"suite container"),"."),Object(o.b)("div",{className:"admonition admonition-info alert alert--info"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},"A reporter is nothing but a class which hooks into life cycle events from the benchmarking process."))),Object(o.b)("p",null,"You can read more about reporters, starting from the ",Object(o.b)(i.a,{to:"docs/reporters/introduction",mdxType:"DocLink"},"reporters introduction")))}p.isMDXComponent=!0},172:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=a.a.createContext({}),l=function(e){var t=a.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=l(e.components);return a.a.createElement(u.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(n),m=r,d=p["".concat(i,".").concat(m)]||p[m]||b[m]||o;return n?a.a.createElement(d,c(c({ref:t},u),{},{components:n})):a.a.createElement(d,c({ref:t},u))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var u=2;u<o;u++)i[u]=n[u];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},175:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return i}));var r=n(16),a=n(176);function o(){var e=Object(r.default)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,n=void 0===t?"/":t,o=e.url;return{withBaseUrl:function(e,t){return function(e,t,n,r){var o=void 0===r?{}:r,i=o.forcePrependBaseUrl,c=void 0!==i&&i,s=o.absolute,u=void 0!==s&&s;if(!n)return n;if(n.startsWith("#"))return n;if(Object(a.b)(n))return n;if(c)return t+n;var l=n.startsWith(t)?n:t+n.replace(/^\//,"");return u?e+l:l}(o,n,e,t)}}}function i(e,t){return void 0===t&&(t={}),(0,o().withBaseUrl)(e,t)}},176:function(e,t,n){"use strict";function r(e){return!0===/^(\w*:|\/\/)/.test(e)}function a(e){return void 0!==e&&!r(e)}n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return a}))},178:function(e,t,n){"use strict";var r=n(0),a=n.n(r),o=n(10),i=n(176),c=n(7),s=Object(r.createContext)({collectLink:function(){}}),u=n(175),l=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n};t.a=function(e){var t,n,p,b=e.isNavLink,m=e.to,d=e.href,f=e.activeClassName,h=e.isActive,O=e["data-noBrokenLinkCheck"],g=e.autoAddBaseUrl,v=void 0===g||g,j=l(e,["isNavLink","to","href","activeClassName","isActive","data-noBrokenLinkCheck","autoAddBaseUrl"]),y=Object(u.b)().withBaseUrl,w=Object(r.useContext)(s),N=m||d,k=Object(i.a)(N),x=null==N?void 0:N.replace("pathname://",""),C=void 0!==x?(n=x,v&&function(e){return e.startsWith("/")}(n)?y(n):n):void 0,B=Object(r.useRef)(!1),S=b?o.e:o.c,E=c.a.canUseIntersectionObserver;Object(r.useEffect)((function(){return!E&&k&&window.docusaurus.prefetch(C),function(){E&&p&&p.disconnect()}}),[C,E,k]);var P=null!==(t=null==C?void 0:C.startsWith("#"))&&void 0!==t&&t,M=!C||!k||P;return C&&k&&!P&&!O&&w.collectLink(C),M?a.a.createElement("a",Object.assign({href:C},N&&!k&&{target:"_blank",rel:"noopener noreferrer"},j)):a.a.createElement(S,Object.assign({},j,{onMouseEnter:function(){B.current||(window.docusaurus.preload(C),B.current=!0)},innerRef:function(e){var t,n;E&&e&&k&&(t=e,n=function(){window.docusaurus.prefetch(C)},(p=new window.IntersectionObserver((function(e){e.forEach((function(e){t===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(p.unobserve(t),p.disconnect(),n())}))}))).observe(t))},to:C||""},b&&{isActive:h,activeClassName:f}))}},185:function(e,t,n){"use strict";var r=n(0),a=n.n(r),o=n(175),i=n(178);n(57);t.a=function(e){var t=e.to;return a.a.createElement(i.a,{to:Object(o.a)(t)},e.children)}}}]);