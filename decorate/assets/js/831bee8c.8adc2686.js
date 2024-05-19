(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{80:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return s}));var a=n(3),r=n(8),o=(n(0),n(92)),i={id:"decorator-api-class",title:"Decorator API Class",sidebar_label:"3. Decorator API Class"},l={unversionedId:"decorate-fluent/decorator-api-class",id:"decorate-fluent/decorator-api-class",isDocsHomePage:!1,title:"Decorator API Class",description:"The Decorator API Class is where all of the magic happens.",source:"@site/docs/decorate-fluent/decorator-api-class.md",slug:"/decorate-fluent/decorator-api-class",permalink:"/node/decorate/docs/decorate-fluent/decorator-api-class",editUrl:"https://github.com/pebula/node/tree/main/apps/docs/decorate/docs/docs/decorate-fluent/decorator-api-class.md",version:"current",sidebar_label:"3. Decorator API Class",sidebar:"someSidebar",previous:{title:"Decorator API Suite",permalink:"/node/decorate/docs/decorate-fluent/decorator-api-suite"},next:{title:"Decorator API Class Mixins",permalink:"/node/decorate/docs/decorate-fluent/composing-decorator-api-class"}},c=[{value:"Building the API",id:"building-the-api",children:[{value:"Custom Class Decorator API",id:"custom-class-decorator-api",children:[]}]},{value:"Plugins",id:"plugins",children:[]},{value:"Design Time and Runtime",id:"design-time-and-runtime",children:[]}],p={toc:c};function s(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"The Decorator API Class is where all of the magic happens."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Define the Schema Configuration class"),Object(o.b)("li",{parentName:"ul"},"Define the plugin interface and implement it")),Object(o.b)("p",null,"If we go back to API Suite we define in the previous page:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript",metastring:"{5,8}","{5,8}":!0},"import { DecorApiSuite } from '@pebula/decorate/fluent';\n\nexport const suite = DecorApiSuite.create()\n  .forClass(MyClassDecoratorFluentApiClass)            // Fluent Decorator API for a class decorator\n  .forProperty(MyPropertyDecoratorFluentApiClass);     // Fluent Decorator API for a property decorator\n\nexport const C = suite.classApi;\nexport const P = suite.propertyApi;\nexport const store = suite.store;\n")),Object(o.b)("p",null,"How will ",Object(o.b)("inlineCode",{parentName:"p"},"MyPropertyDecoratorFluentApiClass")," look like for the end-user to be able to do the following?"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"class X {\n  @P.optional.default(50) value: number\n}\n")),Object(o.b)("h2",{id:"building-the-api"},"Building the API"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"import { FluentMethodPlugin, FluentPropertyPlugin, DecorPropertyApi, PropertySchema } from '@pebula/decorate/fluent';\n\nexport class MyPropertyDecoratorSchemaConfig extends PropertySchema {\n  defaultValue?: any;\n  optional?: boolean\n}\n\nexport class MyPropertyDecoratorFluentApiClass extends DecorPropertyApi<MyPropertyDecoratorSchemaConfig> {\n  // IGNORE THE CLASS BODY, THESE ARE THE PLUGINS AND WE WILL VISIT THEM NEXT SECTION\n  @FluentPropertyPlugin()\n  get optional(): this {\n    this.$$context.schema.optional = true;\n    return this;\n  }\n\n  @FluentMethodPlugin()\n  default(value: any): this {\n    this.$$context.schema.defaultValue = value;\n    return this;\n  }\n\n  // Override the base class schema factory, teach it how to instantiate a new property schema configuration object.\n  static schemaFactory(args: PropertyDecoratorArgs): TomPropertySchemaConfig {\n    return new TomPropertySchemaConfig(args.key as string);\n  }\n}\n")),Object(o.b)("p",null,"We define the schema configuration class, which extend ",Object(o.b)("inlineCode",{parentName:"p"},"PropertySchema")," (more on this later...)",Object(o.b)("br",{parentName:"p"}),"\n","Then we define the API class which extends ",Object(o.b)("inlineCode",{parentName:"p"},"DecorPropertyApi")," of our schema configuration class."),Object(o.b)("p",null,"The base classes we extend are mandatory and we must extend the one relevant to the class we extend."),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Decorator"),Object(o.b)("th",{parentName:"tr",align:null},"Schema Config"),Object(o.b)("th",{parentName:"tr",align:null},"Fluent API Class"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"Class"),Object(o.b)("td",{parentName:"tr",align:null},"ClassSchema"),Object(o.b)("td",{parentName:"tr",align:null},"DecorClassApi")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"Property"),Object(o.b)("td",{parentName:"tr",align:null},"PropertySchema"),Object(o.b)("td",{parentName:"tr",align:null},"DecorPropertyApi")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"Method"),Object(o.b)("td",{parentName:"tr",align:null},"MethodSchema"),Object(o.b)("td",{parentName:"tr",align:null},"DecorMethodApi")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"Parameter"),Object(o.b)("td",{parentName:"tr",align:null},"ParameterSchema"),Object(o.b)("td",{parentName:"tr",align:null},"DecorParameterApi")))),Object(o.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},"Don't waste time on these types, the library provides helper to make this easy.",Object(o.b)("br",{parentName:"p"}),"\n","We will cover them soon"))),Object(o.b)("p",null,"If you're looking at this code and thinking, this is not really extensible you're right!",Object(o.b)("br",{parentName:"p"}),"\n","This is a simple example to ease you in."),Object(o.b)("p",null,"On the next page we'll review how to compose an API class from small plugin chunks (mixins) which make the API class empty from any code."),Object(o.b)("h3",{id:"custom-class-decorator-api"},"Custom Class Decorator API"),Object(o.b)("p",null,"If we also implement a custom class decorator API we need to reflect it's schema configuration so our plugins will know how the class schema looks like."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"import { DecorPropertyApi, PropertySchema } from '@pebula/decorate/fluent';\nimport { MyClassDecoratorSchemaConfig } from './some-where';\n\n                                                                                                        // Type info on the class schema config\nexport class MyPropertyDecoratorFluentApiClass extends DecorPropertyApi<MyPropertyDecoratorSchemaConfig, MyClassDecoratorSchemaConfig> {\n}\n")),Object(o.b)("h2",{id:"plugins"},"Plugins"),Object(o.b)("p",null,"Plugins are instructions we add to the API, by so extending the API.",Object(o.b)("br",{parentName:"p"}),"\n","A plugin provides logic that will run once it is called, allowing the plugin to add the metadata required."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},"class X {\n  @P.optional.default(50) value: number\n}\n")),Object(o.b)("p",null,"In the example above, ",Object(o.b)("inlineCode",{parentName:"p"},"P")," is the decorator, ",Object(o.b)("inlineCode",{parentName:"p"},"optional")," and ",Object(o.b)("inlineCode",{parentName:"p"},"default")," are the plugins."),Object(o.b)("p",null,"There are 2 types of fluent API plugins:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"FluentPropertyPlugin")," - A property plugin (get accessor) which does not require input (",Object(o.b)("inlineCode",{parentName:"li"},"optional")," above)"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"FluentMethodPlugin")," - A method plugin which requires input (",Object(o.b)("inlineCode",{parentName:"li"},"default")," above, getting 50 as input)")),Object(o.b)("p",null,"And a general API plugin:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"MethodPlugin")," - A method plugin")),Object(o.b)("p",null,"Do not confuse the fluent property/method plugin with the fluent API suite property and method APIs.\nThe fluent API suite sets the decorator type. A property decorator can only decorate properties, etc...",Object(o.b)("br",{parentName:"p"}),"\n","The fluent property/method plugin instruct the type of member on the API."),Object(o.b)("div",{className:"admonition admonition-info alert alert--info"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},"The different between ",Object(o.b)("inlineCode",{parentName:"p"},"FluentMethodPlugin")," amd ",Object(o.b)("inlineCode",{parentName:"p"},"MethodPlugin")," is that ",Object(o.b)("inlineCode",{parentName:"p"},"FluentMethodPlugin")," must return the same type (design time) & value (runtime) of the context it was called from (this)."),Object(o.b)("p",{parentName:"div"},Object(o.b)("inlineCode",{parentName:"p"},"MethodPlugin")," can return any type and matching value it desires, possibly breaking the fluent API chain."))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Fluent")," is highly extensible, allowing plugins to be added from multiple locations in both libraries and ad-hoc application.",Object(o.b)("br",{parentName:"p"}),"\n","You can add features on demand, allowing clear separation when developing new plugins."),Object(o.b)("h2",{id:"design-time-and-runtime"},"Design Time and Runtime"),Object(o.b)("p",null,"The library is type safe and must keep design time data accurate to provide a solid user experience."),Object(o.b)("p",null,"In ",Object(o.b)("strong",{parentName:"p"},"fluent"),", the design time is as important as the runtime"),Object(o.b)("p",null,"Because ",Object(o.b)("strong",{parentName:"p"},"fluent")," is plugin based and can be extended from any location it also provide the tools to extend the type system along side the runtime."),Object(o.b)("p",null,"The design time is generated as part of building the runtime process and requires an additional 3-line effort of pairing it via type augmentation.  "))}s.isMDXComponent=!0},92:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=r.a.createContext({}),s=function(e){var t=r.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},b=function(e){var t=s(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),b=s(n),d=a,m=b["".concat(i,".").concat(d)]||b[d]||u[d]||o;return n?r.a.createElement(m,l(l({ref:t},p),{},{components:n})):r.a.createElement(m,l({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);