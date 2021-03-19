(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{113:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return p})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return a}));var r=n(3),i=n(8),o=(n(0),n(204)),s={},p={unversionedId:"api/nesbus.sbtopicsubscriptionentityprovision.rules",id:"api/nesbus.sbtopicsubscriptionentityprovision.rules",isDocsHomePage:!1,title:"nesbus.sbtopicsubscriptionentityprovision.rules",description:"Home &gt; @pebula/nesbus &gt; SbTopicSubscriptionEntityProvision &gt; rules",source:"@site/docs/api/nesbus.sbtopicsubscriptionentityprovision.rules.md",slug:"/api/nesbus.sbtopicsubscriptionentityprovision.rules",permalink:"/node/nesbus/docs/api/nesbus.sbtopicsubscriptionentityprovision.rules",editUrl:"https://github.com/pebula/node/tree/master/apps/dpcs/touchstone/docs/docs/api/nesbus.sbtopicsubscriptionentityprovision.rules.md",version:"current"},c=[{value:"SbTopicSubscriptionEntityProvision.rules property",id:"sbtopicsubscriptionentityprovisionrules-property",children:[]}],u={toc:c};function a(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/index"},"Home")," ",">"," ",Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/nesbus"},"@pebula/nesbus")," ",">"," ",Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/nesbus.sbtopicsubscriptionentityprovision"},"SbTopicSubscriptionEntityProvision")," ",">"," ",Object(o.b)("a",{parentName:"p",href:"/node/nesbus/docs/api/nesbus.sbtopicsubscriptionentityprovision.rules"},"rules")),Object(o.b)("h2",{id:"sbtopicsubscriptionentityprovisionrules-property"},"SbTopicSubscriptionEntityProvision.rules property"),Object(o.b)("p",null,"A list of rules (actions/filters) to apply to the subscription or, a function that results a list of rules dynamically."),Object(o.b)("b",null,"Signature:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"rules?: SbRuleEntityProvision[] | ((topicName: string, subscriptionName: string) => SbRuleEntityProvision[]);\n")))}a.isMDXComponent=!0},204:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return f}));var r=n(0),i=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=i.a.createContext({}),a=function(e){var t=i.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},b=function(e){var t=a(e.components);return i.a.createElement(u.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},y=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),b=a(n),y=r,f=b["".concat(s,".").concat(y)]||b[y]||l[y]||o;return n?i.a.createElement(f,p(p({ref:t},u),{},{components:n})):i.a.createElement(f,p({ref:t},u))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=y;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p.mdxType="string"==typeof e?e:r,s[1]=p;for(var u=2;u<o;u++)s[u]=n[u];return i.a.createElement.apply(null,s)}return i.a.createElement.apply(null,n)}y.displayName="MDXCreateElement"}}]);