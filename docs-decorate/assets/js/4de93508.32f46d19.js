"use strict";(self.webpackChunknode=self.webpackChunknode||[]).push([[373],{8189:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>p,frontMatter:()=>s,metadata:()=>c,toc:()=>d});var r=t(4848),a=t(8453),i=t(1386),o=t(9635);t(6640);const s={id:"composing-decorator-api-class",title:"Decorator API Class Mixins",sidebar_label:"4. Decorator API Class Mixins"},l=void 0,c={id:"decorate-fluent/composing-decorator-api-class",title:"Decorator API Class Mixins",description:"In the previous page we create one big decorator API class with all of our plugins inside.",source:"@site/docs/decorate-fluent/composing-decorator-api-class.md",sourceDirName:"decorate-fluent",slug:"/decorate-fluent/composing-decorator-api-class",permalink:"/node/docs-decorate/docs/decorate-fluent/composing-decorator-api-class",draft:!1,unlisted:!1,editUrl:"https://github.com/pebula/node/tree/main/apps/docs/decorate/docs/docs/decorate-fluent/composing-decorator-api-class.md",tags:[],version:"current",frontMatter:{id:"composing-decorator-api-class",title:"Decorator API Class Mixins",sidebar_label:"4. Decorator API Class Mixins"},sidebar:"sidebar",previous:{title:"3. Decorator API Class",permalink:"/node/docs-decorate/docs/decorate-fluent/decorator-api-class"},next:{title:"5. Real Life Example",permalink:"/node/docs-decorate/docs/decorate-fluent/example"}},u={},d=[{value:"Mixins",id:"mixins",level:2},{value:"Decorator API Composition",id:"decorator-api-composition",level:2}];function h(e){const n={admonition:"admonition",br:"br",code:"code",em:"em",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.p,{children:["In the previous page we create one big decorator API class with all of our plugins inside.",(0,r.jsx)(n.br,{}),"\n","This is not extensible enough, we want to be able to populate our API with predefined plugins which we can share, install etc..."]}),"\n",(0,r.jsx)(n.p,{children:"This is exactly what the library is designed for!"}),"\n",(0,r.jsx)(n.h2,{id:"mixins",children:"Mixins"}),"\n",(0,r.jsx)(n.p,{children:"A Mixin is small encapsulated logical container which implement a specific behavior which can be mixed into another class."}),"\n",(0,r.jsxs)(n.p,{children:["With mixins we want to be able to write plugins in small, encapsulated and reuseable classes or better yet download them as a ",(0,r.jsx)(n.code,{children:"node_module"})," package"]}),"\n",(0,r.jsxs)(n.p,{children:["We then import them and mix them onto our main ",(0,r.jsx)(n.strong,{children:"Fluent Decorator API"})," class adding their behavior to our API."]}),"\n",(0,r.jsxs)(n.admonition,{title:"Mixin 101",type:"info",children:[(0,r.jsxs)(n.p,{children:["JavaScript does not allow multiple inheritance, a class may only extend from a single class.",(0,r.jsx)(n.br,{}),"\n","To workaround this limitation we use Mixins."]}),(0,r.jsx)(n.p,{children:"Mixins are classes which are not extends but merged into a host class extending their functionality (methods, accessors) onto the host.\nSimply put, copying all of the property descriptors (static and prototype) onto the host class."}),(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"There is one constraint with Mixins"}),", they are treated as abstract classes, never initialized nor their constructor invoked"]}),(0,r.jsxs)(n.p,{children:["Read more about mixins in the ",(0,r.jsx)("a",{href:"https://www.typescriptlang.org/docs/handbook/mixins.html",target:"_blank",children:"TypeScript Documentation for Mixins"})]})]}),"\n",(0,r.jsxs)(n.p,{children:["The library provides all of the tools to handle mixins, including handling of the combined type of all mixins, through the namespaces ",(0,r.jsx)(n.code,{children:"ApiMixin"})," & ",(0,r.jsx)(n.code,{children:"SchemaMixin"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"decorator-api-composition",children:"Decorator API Composition"}),"\n",(0,r.jsxs)(n.p,{children:["Going back to our property class decorator API ",(0,r.jsx)(n.code,{children:"MyPropertyDecoratorFluentApiClass"}),", let's re-write it to use mixin plugins instead of coding\nthem in the body"]}),"\n",(0,r.jsxs)(i.A,{defaultValue:"api",values:[{label:"Decorator API",value:"api"},{label:"./optional.ts",value:"optional"},{label:"./default.ts",value:"default"}],children:[(0,r.jsx)(o.A,{value:"api",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"import { PropertyDecoratorArgs } from '@pebula/decorate';\nimport { SchemaMixin, ApiMixin } from '@pebula/decorate/fluent';\n\nimport { OptionalSchemaConfig, OptionalPluginApi } from './options';\nimport { DefaultSchemaConfig, DefaultPluginApi } from './default';\n\nexport class MyPropertyDecoratorSchemaConfig extends SchemaMixin.Property().With(OptionalSchemaConfig, DefaultSchemaConfig) { }\n\nexport class MyPropertyDecoratorFluentApiClass extends ApiMixin.Property<MyPropertyDecoratorSchemaConfig>().With(OptionalPluginApi, DefaultPluginApi) {\n  static schemaFactory(args: PropertyDecoratorArgs): MyPropertyDecoratorSchemaConfig {\n    return new MyPropertyDecoratorSchemaConfig(args.key as string);\n  }\n}\n"})})}),(0,r.jsx)(o.A,{value:"optional",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",metastring:'title="/optional.ts"',children:"import { FluentMethodPlugin, FluentPropertyPlugin, ApiMixin } from '@pebula/decorate/fluent';\n\nexport class OptionalSchemaConfig {\n  optional?: boolean\n}\n\nexport abstract class OptionalPluginApi extends ApiMixin.MixinBase<OptionalSchemaConfig> {\n  @FluentPropertyPlugin()\n  get optional(): this {\n    this.$$context.schema.optional = true;\n    return this;\n  }\n}\n\n"})})}),(0,r.jsx)(o.A,{value:"default",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",metastring:'title="/default.ts"',children:"import { FluentMethodPlugin, FluentPropertyPlugin, ApiMixin } from '@pebula/decorate/fluent';\n\nexport class DefaultSchemaConfig {\n  defaultValue?: any;\n}\n\nexport abstract class DefaultPluginApi extends ApiMixin.MixinBase<DefaultSchemaConfig> {\n  @FluentMethodPlugin()\n  default(value: any): this {\n    this.$$context.schema.defaultValue = value;\n    return this;\n  }\n\n}\n"})})})]}),"\n",(0,r.jsx)(n.p,{children:"Couple of points:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Plugins ",(0,r.jsx)(n.strong,{children:"do not"})," extend the same class the main ",(0,r.jsx)(n.em,{children:"Fluent Decorator API"})," class does (e.g. ",(0,r.jsx)(n.code,{children:"DecorPropertyApi"}),").",(0,r.jsx)(n.br,{}),"\n","Instead, they extend a designated mixin base class, ",(0,r.jsx)(n.code,{children:"ApiMixin.MixinBase"}),", following the template type used as their schema configuration object.",(0,r.jsx)(n.br,{}),"\n","Extending from ",(0,r.jsx)(n.code,{children:"MixinBase"})," is mandatory, the framework will not accept mixins that does not originate from ",(0,r.jsx)(n.code,{children:"MixinBase"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["The main ",(0,r.jsx)(n.em,{children:"Fluent Decorator API"})," class and ",(0,r.jsx)(n.strong,{children:"Schema Configuration"})," class now have a ",(0,r.jsx)(n.strong,{children:"different extend expression"})]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.admonition,{type:"note",children:(0,r.jsxs)(n.p,{children:["We've forced one plugin for each ",(0,r.jsx)(n.code,{children:"optional"})," and ",(0,r.jsx)(n.code,{children:"default"}),".",(0,r.jsx)(n.br,{}),"\n","In real life plugins usually group several members which share the same logical idea."]})}),"\n",(0,r.jsxs)(n.admonition,{type:"caution",children:[(0,r.jsxs)(n.p,{children:["On this page we address the composition of a ",(0,r.jsx)(n.strong,{children:"Fluent Decorator API"})," class through a base class mixin.",(0,r.jsx)(n.br,{}),"\n","That is, we create a new base class and mix in all of our mixins into the new base class, we then declare a class which ",(0,r.jsx)(n.strong,{children:"extend"})," the new mixed in base class."]}),(0,r.jsx)(n.p,{children:"This is the classic approach to mixins."}),(0,r.jsxs)(n.p,{children:["There is another mixin scenario where a ",(0,r.jsx)(n.strong,{children:"Fluent Decorator API"})," class already exists and we want to extend it after the fact.",(0,r.jsx)(n.br,{}),"\n","This is bit more advanced as it requires using typescript augmentation and a slightly different mixin behavior."]}),(0,r.jsxs)(n.p,{children:["For example, a node module you've installed which uses the ",(0,r.jsx)(n.strong,{children:"Fluent"})," library and you would like to extend it...."]}),(0,r.jsx)(n.p,{children:"We'll discuss this topic in a later phase"})]})]})}function p(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},6640:(e,n,t)=>{t.d(n,{jd:()=>o});t(6540);var r=t(6025),a=(t(4586),t(8774)),i=t(4848);t(1765);function o(e){var n=e.to;return(0,i.jsx)(a.A,{to:(0,r.A)(n),children:e.children})}},9635:(e,n,t)=>{t.d(n,{A:()=>o});t(6540);var r=t(4164);const a={tabItem:"tabItem_Ymn6"};var i=t(4848);function o(e){var n=e.children,t=e.hidden,o=e.className;return(0,i.jsx)("div",{role:"tabpanel",className:(0,r.A)(a.tabItem,o),hidden:t,children:n})}},1386:(e,n,t)=>{t.d(n,{A:()=>w});var r=t(6540),a=t(4164),i=t(3104),o=t(6347),s=t(205),l=t(7485),c=t(1682),u=t(9466);function d(e){var n,t;return null!=(n=null==(t=r.Children.toArray(e).filter((function(e){return"\n"!==e})).map((function(e){if(!e||(0,r.isValidElement)(e)&&((n=e.props)&&"object"==typeof n&&"value"in n))return e;var n;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})))?void 0:t.filter(Boolean))?n:[]}function h(e){var n=e.values,t=e.children;return(0,r.useMemo)((function(){var e=null!=n?n:function(e){return d(e).map((function(e){var n=e.props;return{value:n.value,label:n.label,attributes:n.attributes,default:n.default}}))}(t);return function(e){var n=(0,c.X)(e,(function(e,n){return e.value===n.value}));if(n.length>0)throw new Error('Docusaurus error: Duplicate values "'+n.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[n,t])}function p(e){var n=e.value;return e.tabValues.some((function(e){return e.value===n}))}function m(e){var n=e.queryString,t=void 0!==n&&n,a=e.groupId,i=(0,o.W6)(),s=function(e){var n=e.queryString,t=void 0!==n&&n,r=e.groupId;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=r?r:null}({queryString:t,groupId:a});return[(0,l.aZ)(s),(0,r.useCallback)((function(e){if(s){var n=new URLSearchParams(i.location.search);n.set(s,e),i.replace(Object.assign({},i.location,{search:n.toString()}))}}),[s,i])]}function f(e){var n,t,a,i,o=e.defaultValue,l=e.queryString,c=void 0!==l&&l,d=e.groupId,f=h(e),x=(0,r.useState)((function(){return function(e){var n,t=e.defaultValue,r=e.tabValues;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:r}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+t+'" but none of its children has the corresponding value. Available values are: '+r.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return t}var a=null!=(n=r.find((function(e){return e.default})))?n:r[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:o,tabValues:f})})),g=x[0],b=x[1],v=m({queryString:c,groupId:d}),j=v[0],y=v[1],w=(n=function(e){return e?"docusaurus.tab."+e:null}({groupId:d}.groupId),t=(0,u.Dv)(n),a=t[0],i=t[1],[a,(0,r.useCallback)((function(e){n&&i.set(e)}),[n,i])]),A=w[0],P=w[1],I=function(){var e=null!=j?j:A;return p({value:e,tabValues:f})?e:null}();return(0,s.A)((function(){I&&b(I)}),[I]),{selectedValue:g,selectValue:(0,r.useCallback)((function(e){if(!p({value:e,tabValues:f}))throw new Error("Can't select invalid tab value="+e);b(e),y(e),P(e)}),[y,P,f]),tabValues:f}}var x=t(2303);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var b=t(4848);function v(e){var n=e.className,t=e.block,r=e.selectedValue,o=e.selectValue,s=e.tabValues,l=[],c=(0,i.a_)().blockElementScrollPositionUntilNextRender,u=function(e){var n=e.currentTarget,t=l.indexOf(n),a=s[t].value;a!==r&&(c(n),o(a))},d=function(e){var n,t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":var r,a=l.indexOf(e.currentTarget)+1;t=null!=(r=l[a])?r:l[0];break;case"ArrowLeft":var i,o=l.indexOf(e.currentTarget)-1;t=null!=(i=l[o])?i:l[l.length-1]}null==(n=t)||n.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":t},n),children:s.map((function(e){var n=e.value,t=e.label,i=e.attributes;return(0,b.jsx)("li",Object.assign({role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:function(e){return l.push(e)},onKeyDown:d,onClick:u},i,{className:(0,a.A)("tabs__item",g.tabItem,null==i?void 0:i.className,{"tabs__item--active":r===n}),children:null!=t?t:n}),n)}))})}function j(e){var n=e.lazy,t=e.children,a=e.selectedValue,i=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){var o=i.find((function(e){return e.props.value===a}));return o?(0,r.cloneElement)(o,{className:"margin-top--md"}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:i.map((function(e,n){return(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==a})}))})}function y(e){var n=f(e);return(0,b.jsxs)("div",{className:(0,a.A)("tabs-container",g.tabList),children:[(0,b.jsx)(v,Object.assign({},n,e)),(0,b.jsx)(j,Object.assign({},n,e))]})}function w(e){var n=(0,x.A)();return(0,b.jsx)(y,Object.assign({},e,{children:d(e.children)}),String(n))}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>s});var r=t(6540);const a={},i=r.createContext(a);function o(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);