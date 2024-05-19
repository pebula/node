"use strict";(self.webpackChunkdocs_touchstone=self.webpackChunkdocs_touchstone||[]).push([[476],{8552:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>d});var s=t(6870),i=t(5569);const r={},o=void 0,c={id:"api-docs/touchstone.mixin_1",title:"touchstone.mixin_1",description:"Home &gt; @pebula/touchstone &gt; Mixin",source:"@site/docs/api-docs/touchstone.mixin_1.md",sourceDirName:"api-docs",slug:"/api-docs/touchstone.mixin_1",permalink:"/node/touchstone/docs/api-docs/touchstone.mixin_1",draft:!1,unlisted:!1,editUrl:"https://github.com/pebula/node/tree/main/apps/docs/touchstone/docs/docs/api-docs/touchstone.mixin_1.md",tags:[],version:"current",frontMatter:{}},a={},d=[{value:"Mixin() function",id:"mixin-function",level:2},{value:"Parameters",id:"parameters",level:2}];function l(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"/node/touchstone/docs/api-docs/",children:"Home"})," > ",(0,s.jsx)(n.a,{href:"/node/touchstone/docs/api-docs/touchstone",children:"@pebula/touchstone"})," > ",(0,s.jsx)(n.a,{href:"/node/touchstone/docs/api-docs/touchstone.mixin_1",children:"Mixin"})]}),"\n",(0,s.jsx)(n.h2,{id:"mixin-function",children:"Mixin() function"}),"\n",(0,s.jsx)(n.p,{children:"Class mixin factory used for design-time and run-time."}),"\n",(0,s.jsx)(n.p,{children:"When using mixin, multiple classes can be used to compose a single class that is returned with the composed functionally but also with the composed design time type."}),"\n",(0,s.jsx)(n.p,{children:"Since JS does not support multi-inheritance we need to copy all the class members, both levels, static and instance. This means that:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"There is NO prototype chain! - Mixin constructors DOES NOT run."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Loosing the prototype chain means we loose all of the reflected metadata (i.e. decorators) that exists on each mixin type including the proto-chain in each mixin type. To workaround this, we will also run special logic that manually aggregate the reflected metadata from all of the mixins and push it as reflected metadata of new class returned. This includes typescript design time metadata created when decorators are used and metadata produced by this library. If things overlap, the last mixin wins!"}),"\n",(0,s.jsx)(n.p,{children:"The return class comes fresh and clean with NO prototype chain (other then Object) and with the aggregated functionality of all mixins."}),"\n",(0,s.jsx)(n.p,{children:"You can then use this class directly or extend it."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"class MyClass extends Mixin(Jump, Walk, Eat) {\r\n}\n"})}),"\n",(0,s.jsx)(n.p,{children:"Since MyClass extends the mixed in class directly it will not include it as part of the prototype chain hence all reflected metadata will propagate to MyClass."}),"\n",(0,s.jsxs)(n.p,{children:["> Note that full metadata reflection of mixins is possible only when they are decorated with decorated create by ",(0,s.jsx)(n.code,{children:"DecoratorDomain"}),". If not, reflected metadata from properties (flat, no descriptors) is lost since we don't know the property names to query for."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Signature:"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"export function Mixin<T, S>(...mixins: Array<S & Abstract<T>>): Type<T> & S {\r\n  class __MixinClass {\r\n    constructor(...args: any[]) {\r\n      executeConstructors(__MixinClass, this, args);\r\n    }\r\n  }\r\n\r\n  const constructors: Set<(...args: any[]) => void> = new Set();\r\n\r\n  MixinFw.mixIntoClass(__MixinClass, mixins, mixin => {\r\n    handleConstructors(mixin, constructors);\r\n    DecoratedDomain.extendDecoratorMetadata(mixin, __MixinClass);\r\n  }) as any;\r\n\r\n  if (constructors.size > 0) {\r\n    __MixinClass[mixedInClassesConstructors] = constructors;\r\n  }\r\n\r\n  return __MixinClass as any;\r\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:(0,s.jsx)(n.p,{children:"Parameter"})}),(0,s.jsx)("th",{children:(0,s.jsx)(n.p,{children:"Type"})}),(0,s.jsx)("th",{children:(0,s.jsx)(n.p,{children:"Description"})})]})}),(0,s.jsx)("tbody",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:"mixins"})}),(0,s.jsx)("td",{children:(0,s.jsx)(n.p,{children:"Array<S & Abstract<T>>"})}),(0,s.jsx)("td",{})]})})]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Returns:"})}),"\n",(0,s.jsx)(n.p,{children:"Type<T> & S"})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},5569:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>c});var s=t(6326);const i={},r=s.createContext(i);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);