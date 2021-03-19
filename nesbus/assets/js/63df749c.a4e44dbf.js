(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{121:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"metadata",(function(){return i})),t.d(n,"toc",(function(){return o})),t.d(n,"default",(function(){return d}));var r=t(3),a=t(8),s=(t(0),t(204)),c={},i={unversionedId:"api/nesbus.servicebusaadtokencredentials.credentials",id:"api/nesbus.servicebusaadtokencredentials.credentials",isDocsHomePage:!1,title:"nesbus.servicebusaadtokencredentials.credentials",description:"Home &gt; @pebula/nesbus &gt; ServiceBusAadTokenCredentials &gt; credentials",source:"@site/docs/api/nesbus.servicebusaadtokencredentials.credentials.md",slug:"/api/nesbus.servicebusaadtokencredentials.credentials",permalink:"/node/nesbus/docs/api/nesbus.servicebusaadtokencredentials.credentials",editUrl:"https://github.com/pebula/node/tree/master/apps/dpcs/touchstone/docs/docs/api/nesbus.servicebusaadtokencredentials.credentials.md",version:"current"},o=[{value:"ServiceBusAadTokenCredentials.credentials property",id:"servicebusaadtokencredentialscredentials-property",children:[]}],u={toc:o};function d(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(s.b)("wrapper",Object(r.a)({},u,t,{components:n,mdxType:"MDXLayout"}),Object(s.b)("p",null,Object(s.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/index"},"Home")," ",">"," ",Object(s.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/nesbus"},"@pebula/nesbus")," ",">"," ",Object(s.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/nesbus.servicebusaadtokencredentials"},"ServiceBusAadTokenCredentials")," ",">"," ",Object(s.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/nesbus.servicebusaadtokencredentials.credentials"},"credentials")),Object(s.b)("h2",{id:"servicebusaadtokencredentialscredentials-property"},"ServiceBusAadTokenCredentials.credentials property"),Object(s.b)("p",null,"The Token credentials generated by using the ","*"," ",Object(s.b)("inlineCode",{parentName:"p"},"@azure/ms-rest-nodeauth")," library. It can be one of the following: - ApplicationTokenCredentials - UserTokenCredentials - DeviceTokenCredentials - MSITokenCredentials Token audience (or resource in case of MSI based credentials) to use when creating the credentials is ",Object(s.b)("a",{parentName:"p",href:"https://servicebus.azure.net/"},"https://servicebus.azure.net/")),Object(s.b)("b",null,"Signature:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-typescript"},"credentials: Parameters<typeof ServiceBusClient['createFromAadTokenCredentials']>[1];\n")))}d.isMDXComponent=!0},204:function(e,n,t){"use strict";t.d(n,"a",(function(){return l})),t.d(n,"b",(function(){return f}));var r=t(0),a=t.n(r);function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var u=a.a.createContext({}),d=function(e){var n=a.a.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},l=function(e){var n=d(e.components);return a.a.createElement(u.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},b=a.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,s=e.originalType,c=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),l=d(t),b=r,f=l["".concat(c,".").concat(b)]||l[b]||p[b]||s;return t?a.a.createElement(f,i(i({ref:n},u),{},{components:t})):a.a.createElement(f,i({ref:n},u))}));function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var s=t.length,c=new Array(s);c[0]=b;var i={};for(var o in n)hasOwnProperty.call(n,o)&&(i[o]=n[o]);i.originalType=e,i.mdxType="string"==typeof e?e:r,c[1]=i;for(var u=2;u<s;u++)c[u]=t[u];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);