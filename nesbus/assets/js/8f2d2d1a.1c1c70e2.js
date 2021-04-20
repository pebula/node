(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{202:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return d})),n.d(t,"metadata",(function(){return m})),n.d(t,"toc",(function(){return v})),n.d(t,"default",(function(){return h}));var i=n(3),a=n(8),r=n(0),o=n.n(r),s=n(204),c=n(217),l=n(218),u=(n(143),n(16));var b=function(e){var t=Object(u.default)(),n=e.type,i=e.symbol,a=e.display,r=t.siteConfig.customFields.azureDocsUrl+"/"+function(e){switch(e){case"arm":return"arm-servicebus";case"schemaType":return"service-bus"}throw new Error("Unknown link segment type "+e)}(n)+"/"+i.toLowerCase();return o.a.createElement("a",{href:r,target:"_blank"},e.children||a||i)},p=n(223),d={id:"provisioning",title:"Provisioning",sidebar_label:"6. Provisioning"},m={unversionedId:"guide/provisioning",id:"guide/provisioning",isDocsHomePage:!1,title:"Provisioning",description:"Provisioning adds management capabilities over your service bus entities.",source:"@site/docs/guide/provisioning.md",slug:"/guide/provisioning",permalink:"/node/nesbus/docs/guide/provisioning",editUrl:"https://github.com/pebula/node/tree/main/apps/docs/nesbus/docs/docs/guide/provisioning.md",version:"current",sidebar_label:"6. Provisioning",sidebar:"someSidebar",previous:{title:"The Context",permalink:"/node/nesbus/docs/guide/the-context"},next:{title:"Interceptors",permalink:"/node/nesbus/docs/guide/interceptors"}},v=[{value:"Basic Provisioning",id:"basic-provisioning",children:[]},{value:"Management Clients",id:"management-clients",children:[{value:"ARM Client",id:"arm-client",children:[]},{value:"ATOM Client (experimental)",id:"atom-client-experimental",children:[]}]},{value:"Entity Creation Configuration",id:"entity-creation-configuration",children:[{value:"Params",id:"params",children:[]},{value:"Additional Provision Configuration",id:"additional-provision-configuration",children:[]}]},{value:"Entity Configuration Adapter",id:"entity-configuration-adapter",children:[]}],f={toc:v};function h(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(s.b)("wrapper",Object(i.a)({},f,n,{components:t,mdxType:"MDXLayout"}),Object(s.b)("p",null,"Provisioning adds management capabilities over your service bus entities."),Object(s.b)("p",null,"If you try to register to a queue, topic or subscription that does not exist, service bus will throw an error.\nWith provision enabled, you can instruct ",Object(s.b)("strong",{parentName:"p"},"nestbus")," to verify (eager, on load) that the entity exist and if not create it."),Object(s.b)("h2",{id:"basic-provisioning"},"Basic Provisioning"),Object(s.b)("p",null,"The most basic provision configuration is to decide what level of provisioning are we doing:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},Object(s.b)("strong",{parentName:"li"},"skip")," ","[default]"," - provision is disabled"),Object(s.b)("li",{parentName:"ul"},Object(s.b)("strong",{parentName:"li"},"verify")," - verify entity exists when the server bootstraps, throw if it does not exist (eager check)"),Object(s.b)("li",{parentName:"ul"},Object(s.b)("strong",{parentName:"li"},"verifyCreate")," - verify entity exists when the server bootstraps, create the entity if it does not exists")),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-typescript"},"@Controller()\nexport class ServiceBusController {\n  @Queue<MethodDecorator>(({\n    name: 'nesbus-queue.demo',\n    provision: 'verifyCreate' // or 'skip' or 'verify'\n  })\n  async myQueueEntity(@Ctx() context: SbContext) { }\n}\n")),Object(s.b)("p",null,"This is a valid configuration but it is not enough by itself."),Object(s.b)("p",null,"What happens when the library detects that an entity does not exist and it needs to create it?\nCreating a new service bus entity require additional configuration."),Object(s.b)("p",null,"Moreover, the configuration we need is based on the type of the entity, i.e. creating a ",Object(s.b)("inlineCode",{parentName:"p"},"subscription")," is different than creating a ",Object(s.b)("inlineCode",{parentName:"p"},"queue"),"."),Object(s.b)("div",{className:"admonition admonition-info alert alert--info"},Object(s.b)("div",{parentName:"div",className:"admonition-heading"},Object(s.b)("h5",{parentName:"div"},Object(s.b)("span",{parentName:"h5",className:"admonition-icon"},Object(s.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(s.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(s.b)("div",{parentName:"div",className:"admonition-content"},Object(s.b)("p",{parentName:"div"},"That being said, setting ",Object(s.b)("inlineCode",{parentName:"p"},"provision: 'verifyCreate'")," is a valid definition with the help of a small adapter, more on this in a couple of paragraphs."))),Object(s.b)("h2",{id:"management-clients"},"Management Clients"),Object(s.b)("p",null,"Verifying and/or creating entities requires management capabilities so we can create/update entities in service bus.\nTo enable provisioning we must provide a management configuration otherwise it is disabled."),Object(s.b)("p",null,"There are currently 2 management clients available:"),Object(s.b)("h3",{id:"arm-client"},"ARM Client"),Object(s.b)("p",null,"The official service bus management package offered by azure, when using this client you must install the package:"),Object(s.b)(c.a,{defaultValue:"yarn",values:[{label:"Yarn",value:"yarn"},{label:"NPM",value:"npm"}],mdxType:"Tabs"},Object(s.b)(l.a,{value:"yarn",mdxType:"TabItem"},Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-bash"},"$ yarn add @azure/arm-servicebus\n"))),Object(s.b)(l.a,{value:"npm",mdxType:"TabItem"},Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-bash"},"$ npm install @azure/arm-servicebus\n")))),Object(s.b)("p",null,"Then configure the management client when registering the module we need to provide the management\nconfiguration ",Object(s.b)(p.a,{type:"interface",symbol:"SbManagementClientArmOptions",mdxType:"ApiDocsLink"}),":"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-ts"},"import { ApplicationTokenCredentials } from '@azure/ms-rest-nodeauth';\nimport { Module } from '@nestjs/common';\nimport { ServiceBusModule, SbServerOptions } from '@pebula/nesbus';\n\nconst sbServerOptions: SbServerOptions[] = [\n  {\n    client: { /* Client configuration options... */ },\n    management: {\n      credentials: {\n        host: 'my-service-bus.servicebus.windows.net,\n        resourceGroupName: 'NorthEurope',\n        namespace: 'my-service-bus',\n        subscriptionId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',\n        credentials: new ApplicationTokenCredentials(\n          'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', // clientId,\n          'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', // tenantId,\n          'K2.329cnlw3293:#@Mc2EK#)CKE', // clientSecret,\n        ),\n      },\n    },\n  },\n];\n\n@Module({\n  imports: [\n    ServiceBusModule.register({ servers: sbServerOptions }),\n  ],\n})\nexport class AppModule {}\n")),Object(s.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(s.b)("div",{parentName:"div",className:"admonition-heading"},Object(s.b)("h5",{parentName:"div"},Object(s.b)("span",{parentName:"h5",className:"admonition-icon"},Object(s.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},Object(s.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),Object(s.b)("div",{parentName:"div",className:"admonition-content"},Object(s.b)("p",{parentName:"div"},"In this example, the credentials used are ",Object(s.b)("inlineCode",{parentName:"p"},"ApplicationTokenCredentials")," but you can use any token credentials object\nwhich implements the ",Object(s.b)("inlineCode",{parentName:"p"},"getToken()")," interface."),Object(s.b)("p",{parentName:"div"},"In most cases, one of the following from the ",Object(s.b)("inlineCode",{parentName:"p"},"@azure/ms-rest-nodeauth")," package:"),Object(s.b)("ul",{parentName:"div"},Object(s.b)("li",{parentName:"ul"},"ApplicationTokenCredentials"),Object(s.b)("li",{parentName:"ul"},"UserTokenCredentials"),Object(s.b)("li",{parentName:"ul"},"DeviceTokenCredentials"),Object(s.b)("li",{parentName:"ul"},"MSITokenCredentials Token audience (or resource in case of MSI based credentials) to use when creating the credentials is ",Object(s.b)("a",{parentName:"li",href:"https://servicebus.azure.net/"},"https://servicebus.azure.net/"))),Object(s.b)("p",{parentName:"div"},"For more details see the API Docs for ",Object(s.b)(p.a,{type:"interface",symbol:"ServiceBusManagementAadTokenCredentials",mdxType:"ApiDocsLink"})," "))),Object(s.b)("div",{className:"admonition admonition-warning alert alert--danger"},Object(s.b)("div",{parentName:"div",className:"admonition-heading"},Object(s.b)("h5",{parentName:"div"},Object(s.b)("span",{parentName:"h5",className:"admonition-icon"},Object(s.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},Object(s.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"warning")),Object(s.b)("div",{parentName:"div",className:"admonition-content"},Object(s.b)("p",{parentName:"div"},Object(s.b)("inlineCode",{parentName:"p"},"@azure/arm-servicebus")," supports authentication & authorization through azure active directory."),Object(s.b)("p",{parentName:"div"},"This has 2 limitations:"),Object(s.b)("ul",{parentName:"div"},Object(s.b)("li",{parentName:"ul"},"You will need to manage permissions through azure's role based authorization model."),Object(s.b)("li",{parentName:"ul"},"You can not use connection strings to connect to service bus.")))),Object(s.b)("h3",{id:"atom-client-experimental"},"ATOM Client (experimental)"),Object(s.b)("p",null,"The ATOM Client is a management client the uses and authentication and authorization model based on a connection string, which is not possible\nwhen using the ",Object(s.b)("inlineCode",{parentName:"p"},"@azure/arm-servicebus")," library."),Object(s.b)("p",null,"The client is in development by the ",Object(s.b)("inlineCode",{parentName:"p"},"@azure/service-bus")," team and is planned to release with the ",Object(s.b)("inlineCode",{parentName:"p"},"@azure/service-bus")," pacakge."),Object(s.b)("p",null,"The client itself is operational but not publicly exposed."),Object(s.b)("p",null,"To allow using it today, ",Object(s.b)("strong",{parentName:"p"},"nesbus")," includes a copy of the ATOM client from the ",Object(s.b)("inlineCode",{parentName:"p"},"@azure/service-bus")," repository, with no changes.\nOnce officially released the copy will be removed and the original ATOM client will be used instead. If things go as planned\nthis will go unnoticed, without breaking changes."),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-ts"},"import { Module } from '@nestjs/common';\nimport { ServiceBusModule, SbServerOptions } from '@pebula/nesbus';\n\nconst sbServerOptions: SbServerOptions[] = [\n  {\n    client: { /* Client configuration options... */ },\n    management: {\n      credentials: {\n        connectionString: 'MY-SAS-CONNECTION-STRING',\n      },\n    },\n  },\n];\n\n@Module({\n  imports: [\n    ServiceBusModule.register({ servers: sbServerOptions }),\n  ],\n})\nexport class AppModule {}\n")),Object(s.b)("h2",{id:"entity-creation-configuration"},"Entity Creation Configuration"),Object(s.b)("p",null,"Instead of setting ",Object(s.b)("inlineCode",{parentName:"p"},"provision: 'verifyCreate'")," we can set ",Object(s.b)("inlineCode",{parentName:"p"},"provision")," to an object that contains the configuration required when creating an entity:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-typescript"},"@Controller()\nexport class ServiceBusController {\n  @Queue<MethodDecorator>(({\n    name: 'nesbus-queue.demo',\n    provision: {\n      type: 'verifyCreate',\n      params: { /* Default, entity specific, values */\n        deadLetteringOnMessageExpiration: true,\n        maxSizeInMegabytes: 1024,\n        defaultMessageTtl: 'P14D',\n        lockDuration: 'PT5M',\n      }\n      /* ... Additional, entity specific, provisioning values */\n    }\n  })\n  async myQueueEntity(@Ctx() context: SbContext) { }\n}\n")),Object(s.b)("h3",{id:"params"},"Params"),Object(s.b)("p",null,"The ",Object(s.b)("strong",{parentName:"p"},"params")," property is an object that defines the default values that each entity instance will have when created."),Object(s.b)("p",null,"This type differs based on the provision context, i.e. the decorator used."),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"For Queue see ",Object(s.b)(b,{type:"arm",symbol:"SBQueue",mdxType:"AzureDocsLink"})),Object(s.b)("li",{parentName:"ul"},"For Topic see ",Object(s.b)(b,{type:"arm",symbol:"SBTopic",mdxType:"AzureDocsLink"})),Object(s.b)("li",{parentName:"ul"},"For Subscription see ",Object(s.b)(b,{type:"arm",symbol:"SBSubscription",mdxType:"AzureDocsLink"}))),Object(s.b)("h3",{id:"additional-provision-configuration"},"Additional Provision Configuration"),Object(s.b)("p",null,"The additional provision configuration also depends on the entity being provisioned."),Object(s.b)("p",null,"For example, a ",Object(s.b)("strong",{parentName:"p"},"Subscription")," is a child entity of ",Object(s.b)("strong",{parentName:"p"},"Topic"),", you can create a nested provision option\nto also run a provision to make sure that the topic exists."),Object(s.b)("p",null,"See the API docs for more details:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},Object(s.b)(p.a,{type:"interface",symbol:"SbQueueEntityProvision",mdxType:"ApiDocsLink"})),Object(s.b)("li",{parentName:"ul"},Object(s.b)(p.a,{type:"interface",symbol:"SbTopicEntityProvision",mdxType:"ApiDocsLink"})),Object(s.b)("li",{parentName:"ul"},Object(s.b)(p.a,{type:"interface",symbol:"SbTopicSubscriptionEntityProvision",mdxType:"ApiDocsLink"})),Object(s.b)("li",{parentName:"ul"},Object(s.b)(p.a,{type:"interface",symbol:"SbRuleEntityProvision",mdxType:"ApiDocsLink"}))),Object(s.b)("h2",{id:"entity-configuration-adapter"},"Entity Configuration Adapter"),Object(s.b)("p",null,"We've started with a simple provision definition: ",Object(s.b)("inlineCode",{parentName:"p"},"provision: 'verifyCreate'"),".\nIn most cases, our entities will have the same setup, wouldn't it be great to have all of this set from one place and use\nthe simple definition?"),Object(s.b)("p",null,"We can do this by providing an special adapter that the management client will use, when creating new entities."),Object(s.b)("p",null,"We register the adapter along with the management options we provide when registering a management client:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-ts"},"import { Module } from '@nestjs/common';\nimport { ServiceBusModule, SbServerOptions, SbManagementDefaultsAdapter } from '@pebula/nesbus';\n\nconst defaults: SbManagementDefaultsAdapter = { /* ... */ };\n\nconst sbServerOptions: SbServerOptions[] = [\n  {\n    client: { /* Client configuration options... */ },\n    management: {\n      credentials: {\n        connectionString: 'MY-SAS-CONNECTION-STRING',\n      },\n      defaults, // Here we register the default configuration for entities.\n    },\n  },\n];\n\n@Module({\n  imports: [\n    ServiceBusModule.register({ servers: sbServerOptions }),\n  ],\n})\nexport class AppModule {}\n")),Object(s.b)("p",null,"The adapter contains an ",Object(s.b)("inlineCode",{parentName:"p"},"entities")," property, with a definition for each type of entity:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-typescript"},"  entities?: {\n    queue?: SbQueue;\n    topic?: SbTopic;\n    subscription?: SbSubscription;\n  };\n")),Object(s.b)("p",null,"These values will go to the ",Object(s.b)("inlineCode",{parentName:"p"},"params")," property in the provision definition."),Object(s.b)("p",null,"In addition, an optional handler can be set to handle the creation of new rules when a new subscription is created."),Object(s.b)("p",null,"For more information, read the API Docs for ",Object(s.b)(p.a,{type:"interface",symbol:"SbManagementDefaultsAdapter",mdxType:"ApiDocsLink"})))}h.isMDXComponent=!0},204:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var i=n(0),a=n.n(i);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),u=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},b=function(e){var t=u(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,o=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),b=u(n),d=i,m=b["".concat(o,".").concat(d)]||b[d]||p[d]||r;return n?a.a.createElement(m,s(s({ref:t},l),{},{components:n})):a.a.createElement(m,s({ref:t},l))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var l=2;l<r;l++)o[l]=n[l];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},205:function(e,t,n){"use strict";function i(e){var t,n,a="";if("string"==typeof e||"number"==typeof e)a+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=i(e[t]))&&(a&&(a+=" "),a+=n);else for(t in e)e[t]&&(a&&(a+=" "),a+=t);return a}t.a=function(){for(var e,t,n=0,a="";n<arguments.length;)(e=arguments[n++])&&(t=i(e))&&(a&&(a+=" "),a+=t);return a}},207:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return o}));var i=n(16),a=n(209);function r(){var e=Object(i.default)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,n=void 0===t?"/":t,r=e.url;return{withBaseUrl:function(e,t){return function(e,t,n,i){var r=void 0===i?{}:i,o=r.forcePrependBaseUrl,s=void 0!==o&&o,c=r.absolute,l=void 0!==c&&c;if(!n)return n;if(n.startsWith("#"))return n;if(Object(a.b)(n))return n;if(s)return t+n;var u=n.startsWith(t)?n:t+n.replace(/^\//,"");return l?e+u:u}(r,n,e,t)}}}function o(e,t){return void 0===t&&(t={}),(0,r().withBaseUrl)(e,t)}},208:function(e,t,n){"use strict";var i=n(0),a=n.n(i),r=n(10),o=n(209),s=n(7),c=Object(i.createContext)({collectLink:function(){}}),l=n(207),u=function(e,t){var n={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(i=Object.getOwnPropertySymbols(e);a<i.length;a++)t.indexOf(i[a])<0&&Object.prototype.propertyIsEnumerable.call(e,i[a])&&(n[i[a]]=e[i[a]])}return n};t.a=function(e){var t,n,b,p=e.isNavLink,d=e.to,m=e.href,v=e.activeClassName,f=e.isActive,h=e["data-noBrokenLinkCheck"],g=e.autoAddBaseUrl,O=void 0===g||g,j=u(e,["isNavLink","to","href","activeClassName","isActive","data-noBrokenLinkCheck","autoAddBaseUrl"]),y=Object(l.b)().withBaseUrl,x=Object(i.useContext)(c),w=d||m,N=Object(o.a)(w),C=null==w?void 0:w.replace("pathname://",""),T=void 0!==C?(n=C,O&&function(e){return e.startsWith("/")}(n)?y(n):n):void 0,S=Object(i.useRef)(!1),k=p?r.e:r.c,M=s.a.canUseIntersectionObserver;Object(i.useEffect)((function(){return!M&&N&&window.docusaurus.prefetch(T),function(){M&&b&&b.disconnect()}}),[T,M,N]);var A=null!==(t=null==T?void 0:T.startsWith("#"))&&void 0!==t&&t,E=!T||!N||A;return T&&N&&!A&&!h&&x.collectLink(T),E?a.a.createElement("a",Object.assign({href:T},w&&!N&&{target:"_blank",rel:"noopener noreferrer"},j)):a.a.createElement(k,Object.assign({},j,{onMouseEnter:function(){S.current||(window.docusaurus.preload(T),S.current=!0)},innerRef:function(e){var t,n;M&&e&&N&&(t=e,n=function(){window.docusaurus.prefetch(T)},(b=new window.IntersectionObserver((function(e){e.forEach((function(e){t===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(b.unobserve(t),b.disconnect(),n())}))}))).observe(t))},to:T||""},p&&{isActive:f,activeClassName:v}))}},209:function(e,t,n){"use strict";function i(e){return!0===/^(\w*:|\/\/)/.test(e)}function a(e){return void 0!==e&&!i(e)}n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return a}))},213:function(e,t,n){"use strict";var i=n(0),a=n(214);t.a=function(){var e=Object(i.useContext)(a.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},214:function(e,t,n){"use strict";var i=n(0),a=Object(i.createContext)(void 0);t.a=a},217:function(e,t,n){"use strict";var i=n(0),a=n.n(i),r=n(213),o=n(205),s=n(57),c=n.n(s);var l=37,u=39;t.a=function(e){var t=e.lazy,n=e.block,s=e.defaultValue,b=e.values,p=e.groupId,d=e.className,m=Object(r.a)(),v=m.tabGroupChoices,f=m.setTabGroupChoices,h=Object(i.useState)(s),g=h[0],O=h[1],j=i.Children.toArray(e.children),y=[];if(null!=p){var x=v[p];null!=x&&x!==g&&b.some((function(e){return e.value===x}))&&O(x)}var w=function(e){var t=e.target,n=y.indexOf(t),i=j[n].props.value;O(i),null!=p&&(f(p,i),setTimeout((function(){var e,n,i,a,r,o,s,l;(e=t.getBoundingClientRect(),n=e.top,i=e.left,a=e.bottom,r=e.right,o=window,s=o.innerHeight,l=o.innerWidth,n>=0&&r<=l&&a<=s&&i>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(c.a.tabItemActive),setTimeout((function(){return t.classList.remove(c.a.tabItemActive)}),2e3))}),150))},N=function(e){var t,n;switch(e.keyCode){case u:var i=y.indexOf(e.target)+1;n=y[i]||y[0];break;case l:var a=y.indexOf(e.target)-1;n=y[a]||y[y.length-1]}null===(t=n)||void 0===t||t.focus()};return a.a.createElement("div",{className:"tabs-container"},a.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(o.a)("tabs",{"tabs--block":n},d)},b.map((function(e){var t=e.value,n=e.label;return a.a.createElement("li",{role:"tab",tabIndex:g===t?0:-1,"aria-selected":g===t,className:Object(o.a)("tabs__item",c.a.tabItem,{"tabs__item--active":g===t}),key:t,ref:function(e){return y.push(e)},onKeyDown:N,onFocus:w,onClick:w},n)}))),t?Object(i.cloneElement)(j.filter((function(e){return e.props.value===g}))[0],{className:"margin-vert--md"}):a.a.createElement("div",{className:"margin-vert--md"},j.map((function(e,t){return Object(i.cloneElement)(e,{key:t,hidden:e.props.value!==g})}))))}},218:function(e,t,n){"use strict";var i=n(0),a=n.n(i);t.a=function(e){var t=e.children,n=e.hidden,i=e.className;return a.a.createElement("div",{role:"tabpanel",hidden:n,className:i},t)}},223:function(e,t,n){"use strict";var i=n(0),a=n.n(i),r=n(207),o=n(16),s=n(208);n(58);t.a=function(e){var t=Object(o.default)(),n=e.symbol;return a.a.createElement(s.a,{to:Object(r.a)(""+t.siteConfig.customFields.apiDocPrefix+n.toLowerCase())},e.children||n)}}}]);