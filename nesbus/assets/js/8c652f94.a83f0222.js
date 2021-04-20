(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{141:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return o})),n.d(t,"toc",(function(){return i})),n.d(t,"default",(function(){return b}));var r=n(3),a=n(8),s=(n(0),n(204)),c={},o={unversionedId:"api-docs/nesbus.servicebusaadtokencredentials",id:"api-docs/nesbus.servicebusaadtokencredentials",isDocsHomePage:!1,title:"nesbus.servicebusaadtokencredentials",description:"Home &gt; @pebula/nesbus &gt; ServiceBusAadTokenCredentials",source:"@site/docs/api-docs/nesbus.servicebusaadtokencredentials.md",slug:"/api-docs/nesbus.servicebusaadtokencredentials",permalink:"/node/nesbus/docs/api-docs/nesbus.servicebusaadtokencredentials",editUrl:"https://github.com/pebula/node/tree/main/apps/docs/nesbus/docs/docs/api-docs/nesbus.servicebusaadtokencredentials.md",version:"current"},i=[{value:"ServiceBusAadTokenCredentials interface",id:"servicebusaadtokencredentials-interface",children:[]},{value:"Properties",id:"properties",children:[]}],u={toc:i};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(s.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(s.b)("p",null,Object(s.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/index"},"Home")," ",">"," ",Object(s.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus"},"@pebula/nesbus")," ",">"," ",Object(s.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus.servicebusaadtokencredentials"},"ServiceBusAadTokenCredentials")),Object(s.b)("h2",{id:"servicebusaadtokencredentials-interface"},"ServiceBusAadTokenCredentials interface"),Object(s.b)("b",null,"Signature:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-typescript"},"export interface ServiceBusAadTokenCredentials \n")),Object(s.b)("h2",{id:"properties"},"Properties"),Object(s.b)("table",null,Object(s.b)("thead",{parentName:"table"},Object(s.b)("tr",{parentName:"thead"},Object(s.b)("th",{parentName:"tr",align:null},"Property"),Object(s.b)("th",{parentName:"tr",align:null},"Type"),Object(s.b)("th",{parentName:"tr",align:null},"Description"))),Object(s.b)("tbody",{parentName:"table"},Object(s.b)("tr",{parentName:"tbody"},Object(s.b)("td",{parentName:"tr",align:null},Object(s.b)("a",{parentName:"td",href:"/node/nesbus/docs/api-docs/nesbus.servicebusaadtokencredentials.credentials"},"credentials")),Object(s.b)("td",{parentName:"tr",align:null},"Parameters","<","typeof ServiceBusClient","[","'createFromAadTokenCredentials'","]",">","[","1","]"),Object(s.b)("td",{parentName:"tr",align:null},"The Token credentials generated by using the ","*"," ",Object(s.b)("code",null,"@azure/ms-rest-nodeauth")," library. It can be one of the following: - ApplicationTokenCredentials - UserTokenCredentials - DeviceTokenCredentials - MSITokenCredentials Token audience (or resource in case of MSI based credentials) to use when creating the credentials is ",Object(s.b)("a",{parentName:"td",href:"https://servicebus.azure.net/"},"https://servicebus.azure.net/"))),Object(s.b)("tr",{parentName:"tbody"},Object(s.b)("td",{parentName:"tr",align:null},Object(s.b)("a",{parentName:"td",href:"/node/nesbus/docs/api-docs/nesbus.servicebusaadtokencredentials.host"},"host")),Object(s.b)("td",{parentName:"tr",align:null},"string"),Object(s.b)("td",{parentName:"tr",align:null},"Fully qualified domain name for ServiceBus. Most likely, {","yournamespace","}",".servicebus.windows.net")))))}b.isMDXComponent=!0},204:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return f}));var r=n(0),a=n.n(r);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=a.a.createContext({}),b=function(e){var t=a.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},l=function(e){var t=b(e.components);return a.a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},p=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),l=b(n),p=r,f=l["".concat(c,".").concat(p)]||l[p]||d[p]||s;return n?a.a.createElement(f,o(o({ref:t},u),{},{components:n})):a.a.createElement(f,o({ref:t},u))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,c=new Array(s);c[0]=p;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"==typeof e?e:r,c[1]=o;for(var u=2;u<s;u++)c[u]=n[u];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);