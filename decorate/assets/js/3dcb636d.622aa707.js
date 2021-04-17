(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{77:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return i})),a.d(t,"metadata",(function(){return c})),a.d(t,"toc",(function(){return s})),a.d(t,"default",(function(){return l}));var r=a(3),n=a(8),o=(a(0),a(92)),i={id:"introduction",title:"Introduction",sidebar_label:"1. Introduction"},c={unversionedId:"decorate/introduction",id:"decorate/introduction",isDocsHomePage:!1,title:"Introduction",description:"Decorate (core library) provides a unified framework for decorator management, life-cycle flow and storage.",source:"@site/docs/decorate/introduction.md",slug:"/decorate/introduction",permalink:"/node/decorate/docs/decorate/introduction",editUrl:"https://github.com/pebula/node/tree/master/apps/docs/decorate/docs/docs/decorate/introduction.md",version:"current",sidebar_label:"1. Introduction",sidebar:"someSidebar",previous:{title:"Installation",permalink:"/node/decorate/docs/getting-started/installation"},next:{title:"Introduction",permalink:"/node/decorate/docs/decorate-fluent/introduction"}},s=[{value:"Structure",id:"structure",children:[]},{value:"Mixins",id:"mixins",children:[]},{value:"Decorator Domain",id:"decorator-domain",children:[]},{value:"Target Classifier",id:"target-classifier",children:[]}],d={toc:s};function l(e){var t=e.components,a=Object(n.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},d,a,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Decorate")," (core library) provides a unified framework for decorator management, life-cycle flow and storage."),Object(o.b)("h2",{id:"structure"},"Structure"),Object(o.b)("p",null,"There are 2 key components:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Decorator domain"),Object(o.b)("li",{parentName:"ul"},"Target Classifier")),Object(o.b)("p",null,"In ",Object(o.b)("strong",{parentName:"p"},"Decorate")," we use ",Object(o.b)("strong",{parentName:"p"},"decorator domains")," to create strictly typed decorator functions.",Object(o.b)("br",{parentName:"p"}),"\n","All decorators created by the domain are bound to it, grouped together storing the metadata for their decorated targets in the same place, the domain.  "),Object(o.b)("p",null,"A domain uses a target classifier class to manage metadata related operation for each decorated target.",Object(o.b)("br",{parentName:"p"}),"\n","When creating a new domain you can provide your own target classifier class which extends the core classifier, override some of it's behavior and make work for your requirements."),Object(o.b)("p",null,"When a new decorated target is introduces, a new target classifier instance is created, which will store all metadata created by decorators of the domain for that target."),Object(o.b)("div",{className:"admonition admonition-info alert alert--info"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},"A ",Object(o.b)("strong",{parentName:"p"},"decorated target")," is the class a decorator decorates (including member decoration)."),Object(o.b)("pre",{parentName:"div"},Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"class MyDecoratedTarget {\n  @MyDecorator value: number\n}\n")),Object(o.b)("p",{parentName:"div"},"In the example above, ",Object(o.b)("inlineCode",{parentName:"p"},"MyDecoratedTarget")," is a decorated target."))),Object(o.b)("h2",{id:"mixins"},"Mixins"),Object(o.b)("p",null,"MixinFW + Mixin in decorate",Object(o.b)("br",{parentName:"p"}),"\n","Maybe in chapter on TargetClassifier and how it extends metadata"),Object(o.b)("h2",{id:"decorator-domain"},"Decorator Domain"),Object(o.b)("p",null,"A ",Object(o.b)("strong",{parentName:"p"},"decorator domains")," is like a store which is able to generate decorators and store all the metadata created when they get invoked."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"import { DecoratedDomain } from '@pebula/decorate';\n\nexport const domain = new DecoratedDomain();\n")),Object(o.b)("p",null,"Now we have a new domain which we can use to create decorators from.  "),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"const MyDecor = domain.createDecorator({\n  name: 'MyDecor',\n  allowedScopes: ['property'],\n  classifierData: { } // any data you want to pass forward\n});\n\nconst MyDecorFlat = domain.createImmediateDecorator({\n  name: 'MyDecorFlat',\n  allowedScopes: ['property'],\n  classifierData: { } // any data you want to pass forward\n});\n")),Object(o.b)("p",null,"Targets decorated by decorators created in our new domain will be stored in the domain."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"class MyApplicationClass {\n  @MyDecor() value: number;\n  @MyDecorFlat value2: number;\n}\n")),Object(o.b)("p",null,"When a decorator is activated, the domain is notified and it will start generating a metadata record.",Object(o.b)("br",{parentName:"p"}),"\n",'The domain has no logic, so we add logic that "tells" the domain what to do when a decorated is invoked.'),Object(o.b)("p",null,"The logic is places inside the ",Object(o.b)("inlineCode",{parentName:"p"},"TargetClassifier")," class.",Object(o.b)("br",{parentName:"p"}),"\n","When a target class is first decorated the domain assign's a classifier to it (",Object(o.b)("inlineCode",{parentName:"p"},"TargetClassifier"),") which will\nstore all metadata from all decorators on the domain which are invoked on this target."),Object(o.b)("p",null,"The domain will operate using methods on the classifier.",Object(o.b)("br",{parentName:"p"}),"\n","It will use the classifier to:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Create a new metadata records"),Object(o.b)("li",{parentName:"ul"},"Extend the metadata from existing metadata on an already decorated base class"),Object(o.b)("li",{parentName:"ul"},"Query if the target has metadata for a given decorator")),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"TargetClassifier")," class contains all of the functionality above but it can be replaced by a custom class, which extends ",Object(o.b)("inlineCode",{parentName:"p"},"TargetClassifier"),".  "),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"export const domain = new DecoratedDomain(MyCustomTargetClassifier);\n")),Object(o.b)("h2",{id:"target-classifier"},"Target Classifier"),Object(o.b)("p",null,"By default when we create a new domain:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"import { DecoratedDomain } from '@pebula/decorate';\n\nexport const domain = new DecoratedDomain();\n")),Object(o.b)("p",null,"The domain is created with the ",Object(o.b)("inlineCode",{parentName:"p"},"TargetClassifier")," class as the class to manage targets.",Object(o.b)("br",{parentName:"p"}),"\n","We can modify this behavior:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"class MyTargetClassifier extends TargetClassifier {\n  protected createRecord(decor: Decorator | DecoratorInitializer<TRecordMeta>,\n                         record: ClassifierRecord<TRecordMeta>,\n                         options: DecoratorOptions): TRecord {\n    // override behavior\n  }\n\n  protected extendDecoratorMetadata(targetClassifier: TargetClassifier) {\n    // override behavior\n  }\n}\n\nexport const domain = new DecoratedDomain(MyTargetClassifier);\n\n")))}l.isMDXComponent=!0},92:function(e,t,a){"use strict";a.d(t,"a",(function(){return p})),a.d(t,"b",(function(){return u}));var r=a(0),n=a.n(r);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var d=n.a.createContext({}),l=function(e){var t=n.a.useContext(d),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},p=function(e){var t=l(e.components);return n.a.createElement(d.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},m=n.a.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=l(a),m=r,u=p["".concat(i,".").concat(m)]||p[m]||b[m]||o;return a?n.a.createElement(u,c(c({ref:t},d),{},{components:a})):n.a.createElement(u,c({ref:t},d))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var d=2;d<o;d++)i[d]=a[d];return n.a.createElement.apply(null,i)}return n.a.createElement.apply(null,a)}m.displayName="MDXCreateElement"}}]);