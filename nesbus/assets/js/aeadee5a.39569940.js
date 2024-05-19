(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{158:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return b}));var r=n(3),a=n(8),i=(n(0),n(204)),o=n(223),c={id:"back-off",title:"Backoff And Retry",sidebar_label:"2. Backoff And Retry"},s={unversionedId:"tasks/back-off",id:"tasks/back-off",isDocsHomePage:!1,title:"Backoff And Retry",description:"Performs a retry of service bus messages that threw when handled over a pseudo-random, incremental intervals.",source:"@site/docs/tasks/back-off.md",slug:"/tasks/back-off",permalink:"/node/nesbus/docs/tasks/back-off",editUrl:"https://github.com/pebula/node/tree/main/apps/docs/nesbus/docs/docs/tasks/back-off.md",version:"current",sidebar_label:"2. Backoff And Retry",sidebar:"someSidebar",previous:{title:"Introduction",permalink:"/node/nesbus/docs/tasks/introduction"},next:{title:"Idempotent Subscriber",permalink:"/node/nesbus/docs/tasks/idempotent-subscriber"}},l=[{value:"Why",id:"why",children:[]},{value:"SbBackoffRetry",id:"sbbackoffretry",children:[{value:"Backoff Algorithm",id:"backoff-algorithm",children:[]}]}],u={toc:l};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Performs a retry of service bus messages that threw when handled over a pseudo-random, incremental intervals."),Object(i.b)("h2",{id:"why"},"Why"),Object(i.b)("p",null,"Sometimes the server might be overwhelmed by a large number of message being processed at the same time.\nThis can cause processing errors in various areas such as database, file system, network connection, etc..."),Object(i.b)("p",null,"Once a message fails, it will go back to service bus which will re-emit it immediately or throw it to a dead-letter pool."),Object(i.b)("p",null,"Re-emitting the message is not good because our server is still stressed out, it is best to retry it laster, but how much later?"),Object(i.b)("p",null,"If we delay 5 seconds and we have multiple failed message we will hit the same scenario again, if we delay with the same\nstatic interval on every failed attempt we might sync our retries with another process running in cycle."),Object(i.b)("p",null,"What we need is chaos, re-emitting the messages at an increasing interval with each level getting a little distortion so it becomes a bit unpredictable."),Object(i.b)("h2",{id:"sbbackoffretry"},"SbBackoffRetry"),Object(i.b)("p",null,"This is where the ",Object(i.b)("strong",{parentName:"p"},"SbBackoffRetry plugin")," comes in."),Object(i.b)("p",null,"It wraps the the incoming bus message handling and wait's for errors.\nWhen error is thrown it will re-emit the message but with a certain delay, calculated based on your configuration."),Object(i.b)("h3",{id:"backoff-algorithm"},"Backoff Algorithm"),Object(i.b)("p",null,"The calculated delay is effected by 2 values:"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"The current retry iteration (e.g. 1st try, 2nd try, 3rd try, nth try);"),Object(i.b)("li",{parentName:"ol"},"The plugin configuration")),Object(i.b)("p",null,"The configuration is defined in ",Object(i.b)(o.a,{type:"interface",symbol:"SbBackoffRetryOptions",mdxType:"ApiDocsLink"}),":"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"delay: the baseline interval(ms) to wait between each attempt"),Object(i.b)("li",{parentName:"ul"},"delayType: 'linear' for linear increments in the delay between each retry. 'exponential' for exponential increments in the delay between each retry"),Object(i.b)("li",{parentName:"ul"},"factor: a multiplier for the delay (mostly effective in exponential delay)"),Object(i.b)("li",{parentName:"ul"},"distortFactor: how much randomness to introduce into the interval (higher value === more randomness).\nFor example, with a distortFactor of 10, the final delay will be multiplied by a value between 0.9 to 1.1")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-typescript"},"@Controller()\nexport class ServiceBusController {\n\n  @Queue<MethodDecorator>(({\n    name: 'nesbus-queue.demo'\n  })\n  @SbIntercept(new SbBackoffRetry({ retryCount: 3, factor: 1, delayType: 'linear' }))\n  testQueue3 = (source: Observable<SbContext>) => source\n    .pipe(\n      tap( context => {\n        const msg = context.getMessage();\n        throw new Error(`backoff ${msg.messageId}`);\n      }),\n    )\n\n}\n")),Object(i.b)("div",{className:"admonition admonition-warning alert alert--danger"},Object(i.b)("div",{parentName:"div",className:"admonition-heading"},Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",{parentName:"h5",className:"admonition-icon"},Object(i.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},Object(i.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"warning")),Object(i.b)("div",{parentName:"div",className:"admonition-content"},Object(i.b)("p",{parentName:"div"},"Because ",Object(i.b)("a",{parentName:"p",href:"https://github.com/Azure/azure-sdk-for-js/issues/8252"},"Transactions")," are not yet supported by ",Object(i.b)("inlineCode",{parentName:"p"},"@azure/service-bus")," using\n",Object(i.b)("inlineCode",{parentName:"p"},"SbBackoffRetry")," comes with a little risk."),Object(i.b)("p",{parentName:"div"},Object(i.b)("inlineCode",{parentName:"p"},"SbBackoffRetry")," will emit a clone the original message and emit the cloned message upon retry, after then it will complete the failed message."),Object(i.b)("p",{parentName:"div"},"If emitting the closed message succeed but completing the failed message fails there will be 2 messages (with the same id) in the system."),Object(i.b)("p",{parentName:"div"},"This can be solved by enabling duplication checks but in any case once Transactions are out they will be used to eliminate this issue"))))}b.isMDXComponent=!0},204:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return p}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),u=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},b=function(e){var t=u(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},f=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),b=u(n),f=r,p=b["".concat(o,".").concat(f)]||b[f]||d[f]||i;return n?a.a.createElement(p,c(c({ref:t},l),{},{components:n})):a.a.createElement(p,c({ref:t},l))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=f;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var l=2;l<i;l++)o[l]=n[l];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},207:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return o}));var r=n(16),a=n(209);function i(){var e=Object(r.default)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,n=void 0===t?"/":t,i=e.url;return{withBaseUrl:function(e,t){return function(e,t,n,r){var i=void 0===r?{}:r,o=i.forcePrependBaseUrl,c=void 0!==o&&o,s=i.absolute,l=void 0!==s&&s;if(!n)return n;if(n.startsWith("#"))return n;if(Object(a.b)(n))return n;if(c)return t+n;var u=n.startsWith(t)?n:t+n.replace(/^\//,"");return l?e+u:u}(i,n,e,t)}}}function o(e,t){return void 0===t&&(t={}),(0,i().withBaseUrl)(e,t)}},208:function(e,t,n){"use strict";var r=n(0),a=n.n(r),i=n(10),o=n(209),c=n(7),s=Object(r.createContext)({collectLink:function(){}}),l=n(207),u=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n};t.a=function(e){var t,n,b,d=e.isNavLink,f=e.to,p=e.href,m=e.activeClassName,h=e.isActive,y=e["data-noBrokenLinkCheck"],v=e.autoAddBaseUrl,g=void 0===v||v,O=u(e,["isNavLink","to","href","activeClassName","isActive","data-noBrokenLinkCheck","autoAddBaseUrl"]),w=Object(l.b)().withBaseUrl,j=Object(r.useContext)(s),k=f||p,N=Object(o.a)(k),x=null==k?void 0:k.replace("pathname://",""),B=void 0!==x?(n=x,g&&function(e){return e.startsWith("/")}(n)?w(n):n):void 0,C=Object(r.useRef)(!1),P=d?i.e:i.c,T=c.a.canUseIntersectionObserver;Object(r.useEffect)((function(){return!T&&N&&window.docusaurus.prefetch(B),function(){T&&b&&b.disconnect()}}),[B,T,N]);var S=null!==(t=null==B?void 0:B.startsWith("#"))&&void 0!==t&&t,E=!B||!N||S;return B&&N&&!S&&!y&&j.collectLink(B),E?a.a.createElement("a",Object.assign({href:B},k&&!N&&{target:"_blank",rel:"noopener noreferrer"},O)):a.a.createElement(P,Object.assign({},O,{onMouseEnter:function(){C.current||(window.docusaurus.preload(B),C.current=!0)},innerRef:function(e){var t,n;T&&e&&N&&(t=e,n=function(){window.docusaurus.prefetch(B)},(b=new window.IntersectionObserver((function(e){e.forEach((function(e){t===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(b.unobserve(t),b.disconnect(),n())}))}))).observe(t))},to:B||""},d&&{isActive:h,activeClassName:m}))}},209:function(e,t,n){"use strict";function r(e){return!0===/^(\w*:|\/\/)/.test(e)}function a(e){return void 0!==e&&!r(e)}n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return a}))},223:function(e,t,n){"use strict";var r=n(0),a=n.n(r),i=n(207),o=n(16),c=n(208);n(58);t.a=function(e){var t=Object(o.default)(),n=e.symbol;return a.a.createElement(c.a,{to:Object(i.a)(""+t.siteConfig.customFields.apiDocPrefix+n.toLowerCase())},e.children||n)}}}]);