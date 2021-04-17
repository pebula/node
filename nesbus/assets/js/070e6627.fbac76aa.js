(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{204:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return f}));var r=n(0),o=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=o.a.createContext({}),p=function(e){var t=o.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=p(e.components);return o.a.createElement(c.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},l=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,a=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),d=p(n),l=r,f=d["".concat(a,".").concat(l)]||d[l]||b[l]||i;return n?o.a.createElement(f,s(s({ref:t},c),{},{components:n})):o.a.createElement(f,s({ref:t},c))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=l;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var c=2;c<i;c++)a[c]=n[c];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,n)}l.displayName="MDXCreateElement"},70:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return u})),n.d(t,"default",(function(){return p}));var r=n(3),o=n(8),i=(n(0),n(204)),a={},s={unversionedId:"api-docs/nesbus.sbqueueentityprovision.deadletter",id:"api-docs/nesbus.sbqueueentityprovision.deadletter",isDocsHomePage:!1,title:"nesbus.sbqueueentityprovision.deadletter",description:"Home &gt; @pebula/nesbus &gt; SbQueueEntityProvision &gt; deadLetter",source:"@site/docs/api-docs/nesbus.sbqueueentityprovision.deadletter.md",slug:"/api-docs/nesbus.sbqueueentityprovision.deadletter",permalink:"/node/nesbus/docs/api-docs/nesbus.sbqueueentityprovision.deadletter",editUrl:"https://github.com/pebula/node/tree/master/apps/docs/nesbus/docs/docs/api-docs/nesbus.sbqueueentityprovision.deadletter.md",version:"current"},u=[{value:"SbQueueEntityProvision.deadLetter property",id:"sbqueueentityprovisiondeadletter-property",children:[]}],c={toc:u};function p(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,Object(i.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/index"},"Home")," ",">"," ",Object(i.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus"},"@pebula/nesbus")," ",">"," ",Object(i.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus.sbqueueentityprovision"},"SbQueueEntityProvision")," ",">"," ",Object(i.b)("a",{parentName:"p",href:"/node/nesbus/docs/api-docs/nesbus.sbqueueentityprovision.deadletter"},"deadLetter")),Object(i.b)("h2",{id:"sbqueueentityprovisiondeadletter-property"},"SbQueueEntityProvision.deadLetter property"),Object(i.b)("p",null,'Define how the dead letter queue/topic is provisioned ("forwardDeadLetteredMessagesTo") ',">",' Relevant only when "forwardDeadLetteredMessagesTo" has a value.'),Object(i.b)("b",null,"Signature:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-typescript"},"deadLetter?: SbLinkedEntityProvisionOption;\n")))}p.isMDXComponent=!0}}]);