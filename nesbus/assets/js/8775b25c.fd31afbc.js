(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{134:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return p}));var r=n(3),a=n(8),o=(n(0),n(204)),i={},c={unversionedId:"api-docs/nesbus.sbemitterref",id:"api-docs/nesbus.sbemitterref",isDocsHomePage:!1,title:"nesbus.sbemitterref",description:"Home &gt; @pebula/nesbus &gt; SbEmitterRef",source:"@site/docs/api-docs/nesbus.sbemitterref.md",slug:"/api-docs/nesbus.sbemitterref",permalink:"/node/nesbus/docs/api-docs/nesbus.sbemitterref",editUrl:"https://github.com/pebula/node/tree/main/apps/docs/nesbus/docs/docs/api-docs/nesbus.sbemitterref.md",version:"current"},s=[{value:"SbEmitterRef type",id:"sbemitterref-type",children:[]}],u={toc:s};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/index"},"Home")," ",">"," ",Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus"},"@pebula/nesbus")," ",">"," ",Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus.sbemitterref"},"SbEmitterRef")),Object(o.b)("h2",{id:"sbemitterref-type"},"SbEmitterRef type"),Object(o.b)("p",null,"A Reference to an existing client emitter. This is basically a query to get the service bus ",Object(o.b)("inlineCode",{parentName:"p"},"Sender")," instance for the client registered at the queue / topic name."),Object(o.b)("p",null,"Note that if you're using unique client name you can also provide the specific client id to target."),Object(o.b)("p",null,"Type (topic/queue) is irrelevant because in any case two identical entities can not share the same name event if they are of different type."),Object(o.b)("b",null,"Signature:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"export declare type SbEmitterRef = SbEmitterMetadataOptions;\n")),Object(o.b)("b",null,"References:")," [SbEmitterMetadataOptions](/node/nesbus/docs/api-docs/nesbus.sbemittermetadataoptions)")}p.isMDXComponent=!0},204:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=a.a.createContext({}),p=function(e){var t=a.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},b=function(e){var t=p(e.components);return a.a.createElement(u.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},f=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),b=p(n),f=r,d=b["".concat(i,".").concat(f)]||b[f]||l[f]||o;return n?a.a.createElement(d,c(c({ref:t},u),{},{components:n})):a.a.createElement(d,c({ref:t},u))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=f;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var u=2;u<o;u++)i[u]=n[u];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"}}]);