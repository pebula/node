(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{204:function(e,t,r){"use strict";r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return f}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=a.a.createContext({}),i=function(e){var t=a.a.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},b=function(e){var t=i(e.components);return a.a.createElement(u.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),b=i(r),m=n,f=b["".concat(c,".").concat(m)]||b[m]||l[m]||o;return r?a.a.createElement(f,s(s({ref:t},u),{},{components:r})):a.a.createElement(f,s({ref:t},u))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,c=new Array(o);c[0]=m;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:n,c[1]=s;for(var u=2;u<o;u++)c[u]=r[u];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},93:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return s})),r.d(t,"toc",(function(){return p})),r.d(t,"default",(function(){return i}));var n=r(3),a=r(8),o=(r(0),r(204)),c={},s={unversionedId:"api-docs/nesbus.metaormetafactory",id:"api-docs/nesbus.metaormetafactory",isDocsHomePage:!1,title:"nesbus.metaormetafactory",description:"Home &gt; @pebula/nesbus &gt; MetaOrMetaFactory",source:"@site/docs/api-docs/nesbus.metaormetafactory.md",slug:"/api-docs/nesbus.metaormetafactory",permalink:"/node/nesbus/docs/api-docs/nesbus.metaormetafactory",editUrl:"https://github.com/pebula/node/tree/master/apps/docs/nesbus/docs/docs/api-docs/nesbus.metaormetafactory.md",version:"current"},p=[{value:"MetaOrMetaFactory type",id:"metaormetafactory-type",children:[]}],u={toc:p};function i(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},u,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/index"},"Home")," ",">"," ",Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus"},"@pebula/nesbus")," ",">"," ",Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus.metaormetafactory"},"MetaOrMetaFactory")),Object(o.b)("h2",{id:"metaormetafactory-type"},"MetaOrMetaFactory type"),Object(o.b)("b",null,"Signature:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"export declare type MetaOrMetaFactory<T> = T | ((helper?: any) => (T | Promise<T>));\n")))}i.isMDXComponent=!0}}]);