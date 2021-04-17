(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{102:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(96),i=n(99);n(57);t.a=function(e){var t=e.to;return o.a.createElement(i.a,{to:Object(a.a)(t)},e.children)}},85:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return p}));var r=n(3),o=n(8),a=(n(0),n(98)),i=(n(102),{id:"basic-usage",title:"Basic Usage",sidebar_label:"2. Basic Usage"}),s={unversionedId:"mapping/basic-usage",id:"mapping/basic-usage",isDocsHomePage:!1,title:"Basic Usage",description:"`typescript",source:"@site/docs/mapping/basic-usage.md",slug:"/mapping/basic-usage",permalink:"/node/tom/docs/mapping/basic-usage",editUrl:"https://github.com/pebula/node/tree/master/apps/docs/tom/docs/docs/mapping/basic-usage.md",version:"current",sidebar_label:"2. Basic Usage",sidebar:"someSidebar",previous:{title:"Mapping Introduction",permalink:"/node/tom/docs/mapping/mapping-introduction"}},c=[],u={toc:c};function p(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"import { defineClassMapping, getMapper } from '@pebula/tom/mapping';\n\nclass OrderDto implements Models.OrderDto {\n  @P id: number;\n  @P date: string;\n  @P shipped: boolean;\n  @P status: string;\n  @P.asArray(() => OrderItemDto) items: OrderItemDto[];\n  @P eTag: string;\n}\n\nclass OrderItemDto implements Models.OrderItemDto {\n  @P sku: string;\n  @P quantity: number;\n  @P price: number;\n}\n\nclass Order implements Models.Order {\n  @P id: number;\n  @P date: Date;\n  @P shipped: boolean;\n  @P.enum(OrderStatus) status: OrderStatus;\n  @P.asArray(() => OrderItem) items: OrderItem[];\n}\n\nclass OrderItem implements Models.OrderItem {\n  @P sku: string;\n  @P quantity: number;\n  @P price: number;\n}\n\ndefineClassMapping(OrderItemDto, OrderItem, { 'strict' })\n  .forMember('sku', 'sku')\n  .forMember('price', 'price')\n  .forMember('quantity', 'quantity')\n  .seal();\n\ndefineClassMapping(OrderDto, Order, { 'strict' })\n  .forMember('id', 'id')\n  .forMember('date', 'date', Types.String) // Convert string to Date\n  .forMember('shipped', 'shipped')\n  .forMember('status', 'status', true) // Convert enum value\n  .forMember('items', 'items')\n  .forMember('eTag', c => c.ignore() ) // We must ignore or we can seal (enforced on design & runtime level)\n  .seal();\n\n\nconst mapper = getMapper(OrderDto, Order);\nconst orderDto = new OrderDto();\n// Assume populating OrderDto and OrderItemDto items\n\nconst order = mapper.transform(orderDto, {});\n")))}p.isMDXComponent=!0},96:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return i}));var r=n(16),o=n(97);function a(){var e=Object(r.default)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,n=void 0===t?"/":t,a=e.url;return{withBaseUrl:function(e,t){return function(e,t,n,r){var a=void 0===r?{}:r,i=a.forcePrependBaseUrl,s=void 0!==i&&i,c=a.absolute,u=void 0!==c&&c;if(!n)return n;if(n.startsWith("#"))return n;if(Object(o.b)(n))return n;if(s)return t+n;var p=n.startsWith(t)?n:t+n.replace(/^\//,"");return u?e+p:p}(a,n,e,t)}}}function i(e,t){return void 0===t&&(t={}),(0,a().withBaseUrl)(e,t)}},97:function(e,t,n){"use strict";function r(e){return!0===/^(\w*:|\/\/)/.test(e)}function o(e){return void 0!==e&&!r(e)}n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return o}))},98:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return m}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=o.a.createContext({}),p=function(e){var t=o.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=p(e.components);return o.a.createElement(u.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},f=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=p(n),f=r,m=d["".concat(i,".").concat(f)]||d[f]||l[f]||a;return n?o.a.createElement(m,s(s({ref:t},u),{},{components:n})):o.a.createElement(m,s({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=f;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var u=2;u<a;u++)i[u]=n[u];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},99:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(10),i=n(97),s=n(7),c=Object(r.createContext)({collectLink:function(){}}),u=n(96),p=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};t.a=function(e){var t,n,d,l=e.isNavLink,f=e.to,m=e.href,b=e.activeClassName,O=e.isActive,g=e["data-noBrokenLinkCheck"],v=e.autoAddBaseUrl,y=void 0===v||v,w=p(e,["isNavLink","to","href","activeClassName","isActive","data-noBrokenLinkCheck","autoAddBaseUrl"]),h=Object(u.b)().withBaseUrl,j=Object(r.useContext)(c),P=f||m,D=Object(i.a)(P),M=null==P?void 0:P.replace("pathname://",""),k=void 0!==M?(n=M,y&&function(e){return e.startsWith("/")}(n)?h(n):n):void 0,C=Object(r.useRef)(!1),I=l?a.e:a.c,E=s.a.canUseIntersectionObserver;Object(r.useEffect)((function(){return!E&&D&&window.docusaurus.prefetch(k),function(){E&&d&&d.disconnect()}}),[k,E,D]);var x=null!==(t=null==k?void 0:k.startsWith("#"))&&void 0!==t&&t,U=!k||!D||x;return k&&D&&!x&&!g&&j.collectLink(k),U?o.a.createElement("a",Object.assign({href:k},P&&!D&&{target:"_blank",rel:"noopener noreferrer"},w)):o.a.createElement(I,Object.assign({},w,{onMouseEnter:function(){C.current||(window.docusaurus.preload(k),C.current=!0)},innerRef:function(e){var t,n;E&&e&&D&&(t=e,n=function(){window.docusaurus.prefetch(k)},(d=new window.IntersectionObserver((function(e){e.forEach((function(e){t===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(d.unobserve(t),d.disconnect(),n())}))}))).observe(t))},to:k||""},l&&{isActive:O,activeClassName:b}))}}}]);