(window.webpackJsonp=window.webpackJsonp||[]).push([[167],{241:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return u}));var a=n(3),r=n(8),o=(n(0),n(277)),i=n(285),c={id:"columns",title:"Columns",sidebar_label:"2. Columns"},s={unversionedId:"basics/columns",id:"basics/columns",isDocsHomePage:!1,title:"Columns",description:"Columns are the building blocks of every model.",source:"@site/docs/basics/columns.md",slug:"/basics/columns",permalink:"/node/goosetyped/docs/basics/columns",editUrl:"https://github.com/pebula/node/tree/master/apps/dpcs/touchstone/docs/docs/basics/columns.md",version:"current",sidebar_label:"2. Columns",sidebar:"someSidebar",previous:{title:"Metadata",permalink:"/node/goosetyped/docs/basics/metadata"},next:{title:"Documents And SubDocuments",permalink:"/node/goosetyped/docs/basics/documents-and-sub-documents"}},l=[{value:"Column Options (metadata)",id:"column-options-metadata",children:[]},{value:"Column Type",id:"column-type",children:[{value:"Explicit type definition",id:"explicit-type-definition",children:[]}]}],p={toc:l};function u(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Columns are the building blocks of every model."),Object(o.b)("p",null,"Each column has a type and optionally additional metadata used to describe a behavior or property of that column."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"import { GtDocument, GtModel } from '@pebula/goosetyped';\n\n@GtDocument()\nexport class Customer extends GtModel() {\n  @GtColumn()\n  name: string;\n\n  @GtColumn()\n  age: number;\n}\n")),Object(o.b)("h2",{id:"column-options-metadata"},"Column Options (metadata)"),Object(o.b)("p",null,"We can add additional metadata to columns:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"import { GtDocument, GtModel } from '@pebula/goosetyped';\n\n@GtDocument()\nexport class Customer extends GtModel() {\n  @GtColumn({\n    required: true,\n  })\n  name: string;\n\n  @GtColumn({\n    validate: value => value > 0,\n  })\n  age: number;\n\n  @GtColumn({\n    enum: ['male', 'female', 'other'],\n    default: 'other'\n  })\n  gender: 'male' | 'female' | 'other';\n}\n")),Object(o.b)("p",null,"You can review all of the metadata options in the API docs for ",Object(o.b)(i.a,{type:"interface",symbol:"GtColumnMetadataArgs",mdxType:"ApiDocsLink"},"GtColumnMetadataArgs<T",">"),"."),Object(o.b)("h2",{id:"column-type"},"Column Type"),Object(o.b)("p",null,"TypeScript emits the type used for every column so ",Object(o.b)("strong",{parentName:"p"},"GooseType")," can use that to automatically define the proper type with mongoose."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"export class Customer {\n  @GtColumn()\n  age: number;\n}\n")),Object(o.b)("p",null,"In the example above ",Object(o.b)("strong",{parentName:"p"},"GooseType")," will identify that the type is a number and will use ",Object(o.b)("inlineCode",{parentName:"p"},"mongoose.Schema.Types.Number")," as the type for the column."),Object(o.b)("h3",{id:"explicit-type-definition"},"Explicit type definition"),Object(o.b)("p",null,"There are some scenarios in which typescript's type system is not able to provide a type definition and an explicit type definition is required."),Object(o.b)("p",null,"This usually happen when:"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"Generics is used to define the type (e.g. ",Object(o.b)("inlineCode",{parentName:"li"},"Array<string>"),", ",Object(o.b)("inlineCode",{parentName:"li"},"Map<number>"),", etc...)"),Object(o.b)("li",{parentName:"ol"},"The type is unknown at the time it is defined (usually due to cyclic reference)")),Object(o.b)("div",{className:"admonition admonition-warning alert alert--danger"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"warning")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},Object(o.b)("strong",{parentName:"p"},"GooseType")," will throw an error when these scenarios occur and are not handled."))),Object(o.b)("p",null,"Additionally, it might be that would want to customize the type defined."),Object(o.b)("p",null,"To define a custom type we use ",Object(o.b)(i.a,{type:"interface",symbol:"GtColumnMetadataArgs",hash:"type",mdxType:"ApiDocsLink"},"GtColumnMetadataArgs.type"),"\nwhich accepts one of:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Schema"),Object(o.b)("li",{parentName:"ul"},"typeof SchemaType (e.g ",Object(o.b)("inlineCode",{parentName:"li"},"mongoose.Schema.Types.Number"),")"),Object(o.b)("li",{parentName:"ul"},"A function that returns a ",Object(o.b)("strong",{parentName:"li"},"GooseTyped")," model or resource (the classes of a document or sub-document).")),Object(o.b)("p",null,"We will not go into depth on the first two options, they are straight forward and we recommend not to use them\nunless there is really no solution to your problem."),Object(o.b)("p",null,"The last option is nothing but a simple arrow function that returns the type for this column, let's review some examples:"),Object(o.b)("h4",{id:"array"},"Array"),Object(o.b)("p",null,"This covers the 1st scenario which TS can not resolve the type for us:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"export class Person {\n  @GtColumn({\n    type: () => String,\n  })\n  friends: string[];\n\n  @GtColumn({\n    type: () => Date,\n  })\n  importantDates: Array<Date>;\n}\n")),Object(o.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},"We return the actual generic type, ",Object(o.b)("inlineCode",{parentName:"p"},"String")," and not ",Object(o.b)("inlineCode",{parentName:"p"},"Array<string>"),". TypeScript already resolves the type to Array we only need the internal type."))),Object(o.b)("h4",{id:"map"},"Map"),Object(o.b)("p",null,"Again, same as ",Object(o.b)("inlineCode",{parentName:"p"},"Array")," above, TS can not resolve the subject type of the Map, it will only resolve ",Object(o.b)("inlineCode",{parentName:"p"},"Map"),"."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"export class Person {\n  @GtColumn({\n    type: () => Number,\n  })\n  map: Map<number>;\n}\n")),Object(o.b)("h4",{id:"circular-or-undefined"},"Circular or Undefined"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"// module: person.ts\nexport class Person {\n\n  @GtColumn({\n    type: () => Address,\n  })\n  address: Address;\n}\n\n// module: address.ts\nexport class Address {\n\n  @GtColumn({\n    type: () => Person,\n  })\n  resident: Person;\n}\n")),Object(o.b)("p",null,"At the time when the class is defined both modules (person & address) refer to each other.",Object(o.b)("br",{parentName:"p"}),"\n","This means that the type will be undefined and will get populated later once both classes are exported."),Object(o.b)("p",null,"TypeScript does not account for that and will mark the type for the property as undefined.\nTo solve this we use the function that returns the type. We will resolve the type after both classes are resolved so we will get the proper value."),Object(o.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},"Circular reference types requires deffered model initialization described in the advanced section."))))}u.isMDXComponent=!0},277:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),p=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=p(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(n),b=a,m=u["".concat(i,".").concat(b)]||u[b]||d[b]||o;return n?r.a.createElement(m,c(c({ref:t},l),{},{components:n})):r.a.createElement(m,c({ref:t},l))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=b;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var l=2;l<o;l++)i[l]=n[l];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},278:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return i}));var a=n(16),r=n(281);function o(){var e=Object(a.default)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,n=void 0===t?"/":t,o=e.url;return{withBaseUrl:function(e,t){return function(e,t,n,a){var o=void 0===a?{}:a,i=o.forcePrependBaseUrl,c=void 0!==i&&i,s=o.absolute,l=void 0!==s&&s;if(!n)return n;if(n.startsWith("#"))return n;if(Object(r.b)(n))return n;if(c)return t+n;var p=n.startsWith(t)?n:t+n.replace(/^\//,"");return l?e+p:p}(o,n,e,t)}}}function i(e,t){return void 0===t&&(t={}),(0,o().withBaseUrl)(e,t)}},280:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(10),i=n(281),c=n(7),s=Object(a.createContext)({collectLink:function(){}}),l=n(278),p=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n};t.a=function(e){var t,n,u,d=e.isNavLink,b=e.to,m=e.href,f=e.activeClassName,h=e.isActive,y=e["data-noBrokenLinkCheck"],O=e.autoAddBaseUrl,v=void 0===O||O,j=p(e,["isNavLink","to","href","activeClassName","isActive","data-noBrokenLinkCheck","autoAddBaseUrl"]),g=Object(l.b)().withBaseUrl,w=Object(a.useContext)(s),N=b||m,C=Object(i.a)(N),x=null==N?void 0:N.replace("pathname://",""),T=void 0!==x?(n=x,v&&function(e){return e.startsWith("/")}(n)?g(n):n):void 0,G=Object(a.useRef)(!1),A=d?o.e:o.c,M=c.a.canUseIntersectionObserver;Object(a.useEffect)((function(){return!M&&C&&window.docusaurus.prefetch(T),function(){M&&u&&u.disconnect()}}),[T,M,C]);var P=null!==(t=null==T?void 0:T.startsWith("#"))&&void 0!==t&&t,k=!T||!C||P;return T&&C&&!P&&!y&&w.collectLink(T),k?r.a.createElement("a",Object.assign({href:T},N&&!C&&{target:"_blank",rel:"noopener noreferrer"},j)):r.a.createElement(A,Object.assign({},j,{onMouseEnter:function(){G.current||(window.docusaurus.preload(T),G.current=!0)},innerRef:function(e){var t,n;M&&e&&C&&(t=e,n=function(){window.docusaurus.prefetch(T)},(u=new window.IntersectionObserver((function(e){e.forEach((function(e){t===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(u.unobserve(t),u.disconnect(),n())}))}))).observe(t))},to:T||""},d&&{isActive:h,activeClassName:f}))}},281:function(e,t,n){"use strict";function a(e){return!0===/^(\w*:|\/\/)/.test(e)}function r(e){return void 0!==e&&!a(e)}n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return r}))},285:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(278),i=n(16),c=n(280);n(58);t.a=function(e){var t=Object(i.default)(),n=e.symbol;return r.a.createElement(c.a,{to:Object(o.a)(""+t.siteConfig.customFields.apiDocPrefix+n.toLowerCase())},e.children||n)}}}]);