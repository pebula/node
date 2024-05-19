"use strict";(self.webpackChunknode=self.webpackChunknode||[]).push([[289],{144:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>a,metadata:()=>d,toc:()=>c});var r=t(4848),i=t(8453),o=t(6640);const a={id:"introduction",title:"Introduction",sidebar_label:"1. Introduction"},s=void 0,d={id:"getting-started/introduction",title:"Introduction",description:"Decorate is a decorator management tool for metadata driven libraries / applications.",source:"@site/docs/getting-started/introduction.md",sourceDirName:"getting-started",slug:"/getting-started/introduction",permalink:"/node/docs-decorate/docs/getting-started/introduction",draft:!1,unlisted:!1,editUrl:"https://github.com/pebula/node/tree/main/apps/docs/decorate/docs/docs/getting-started/introduction.md",tags:[],version:"current",frontMatter:{id:"introduction",title:"Introduction",sidebar_label:"1. Introduction"},sidebar:"sidebar",next:{title:"2. Installation",permalink:"/node/docs-decorate/docs/getting-started/installation"}},l={},c=[{value:"Background",id:"background",level:2},{value:"Library Structure",id:"library-structure",level:2},{value:"Decorate",id:"decorate",level:3},{value:"Decorate Fluent",id:"decorate-fluent",level:3}];function h(e){const n={admonition:"admonition",br:"br",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Decorate"})," is a decorator management tool for metadata driven libraries / applications."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Decorate"})," provides a unified framework for decorator management, life-cycle flow and storage.",(0,r.jsx)(n.br,{}),"\n","It also provide the infrastructure to build metadata driven ",(0,r.jsx)(n.strong,{children:"fluent API decorator workflows"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"The end result is an clear and self-explaining decorator API:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"class X {\n  @P.optional.default(50).min(5).max(5000).not.equal(999) value: number\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Decorate"})," enables this in a type-safe manner, with full intellisense support!"]}),"\n",(0,r.jsx)(n.h2,{id:"background",children:"Background"}),"\n",(0,r.jsx)(n.p,{children:"Decorators are mostly used for 2 scenarios:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"Mutating the decorated target"}),"\n",(0,r.jsx)(n.li,{children:"Collecting metadata on the decorated target"}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"We'll focus on the 2nd scenario, metadata."}),"\n",(0,r.jsx)(n.p,{children:"When building metadata driven applications, we collect metadata about classes / objects which we can then use\nto automate workflows, perform operations and in general drive an application."}),"\n",(0,r.jsxs)(n.p,{children:["For example, an ",(0,r.jsx)(n.code,{children:"express"})," application is given a mapping of predefined routes to their handlers.",(0,r.jsx)(n.br,{}),"\n","These mappings are metadata and the express engine is using it to drive incoming request to their designated handlers."]}),"\n",(0,r.jsx)(n.p,{children:"Traditionally this was done manually:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"app.get('/orders/:id', (req, res, next) => { /* do something */ });\n"})}),"\n",(0,r.jsx)(n.p,{children:"With modern TypeScript it can be done like this:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"@Controller('orders')\nclass OrdersController {\n  @Get(':id')\n  async getOrder(id: number) { /* do something */ }\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["This is where ",(0,r.jsx)(n.strong,{children:"Decorate"})," comes in.",(0,r.jsx)(n.br,{}),"\n","It provides the infrastructure to easily:"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Store and retrieve metadata per decorated target (e.g. ",(0,r.jsx)(n.code,{children:"OrdersController"})," above)"]}),"\n",(0,r.jsx)(n.li,{children:"Implement custom logic when a decorator is used (invoked)"}),"\n",(0,r.jsx)(n.li,{children:"Build type-safe decorator API the helps the user drive the metadata definition process"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"library-structure",children:"Library Structure"}),"\n",(0,r.jsx)(n.p,{children:"The library contains 2 packages:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"@pebula/decorate"}),(0,r.jsx)(n.br,{}),"\n","The core library, provide the tools for decorator management, life-cycle flow and storage."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"@pebula/decorate/fluent"}),(0,r.jsx)(n.br,{}),"\n","An extension library, provide the tools for building extensible, fluent API decorators"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"decorate",children:"Decorate"}),"\n",(0,r.jsxs)(n.p,{children:["The core library is where metadata is created, organized and stored.",(0,r.jsx)(n.br,{}),"\n","It is where decorators are created and where we build build the logic of how we create the metadata."]}),"\n",(0,r.jsx)(n.p,{children:"If your goal is to build a metadata driven application where decorators perform their classic rule as functions use the core library.\nIt will abstract the metadata management, decorator factory and other mundane processes and let you focus on the logic of your application."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"@Controller('orders')\nclass OrdersController {\n  @Get(':id')\n  async getOrder(id: number) { /* do something */ }\n}\n"})}),"\n",(0,r.jsx)(o.jd,{to:"docs/decorate/introduction",children:"Click to read more about the core library..."}),"\n",(0,r.jsx)(n.h3,{id:"decorate-fluent",children:"Decorate Fluent"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.strong,{children:"fluent"})," extensions is built on top of the core library.",(0,r.jsx)(n.br,{}),"\n","It provides a plugin infrastructure to build fluent API decorators where the process of defining metadata is self explaining, easy and automatically routed by the type system."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"@Controller('orders')\n  .authenticated\n  .authorize('admin', 'warehouse')\nclass OrdersController {\n  @Get(':id')\n    .authorize('admin')\n    .openApi('Get and order by the ID')\n  async getOrder(id: number) { /* do something */ }\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["In ",(0,r.jsx)(n.strong,{children:"fluent"})," a plugin is used to extend the decorator API.",(0,r.jsx)(n.br,{}),"\n","The extension is done in 2 areas, the ",(0,r.jsx)(n.strong,{children:"design time type system"})," and for the ",(0,r.jsx)(n.strong,{children:"runtime"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["The plugin can be a ",(0,r.jsx)(n.strong,{children:"get accessor"})," (",(0,r.jsx)(n.code,{children:"authenticated"})," above) or a method with input params (",(0,r.jsx)(n.code,{children:"authorize"})," above)."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Fluent"})," is highly extensible, allowing plugins to be added from multiple locations in both libraries and ad-hoc application.",(0,r.jsx)(n.br,{}),"\n","You can add features on demand, allowing clear separation when developing new plugins."]}),"\n",(0,r.jsxs)(n.admonition,{type:"info",children:[(0,r.jsx)(n.p,{children:"The fluent example above is presented to emphasize the different between the 2 libraries so it is similar to the example above it.\nIt might not be the best fit to describe an MVC controller based API and it is completely up to your preferences."}),(0,r.jsx)(n.p,{children:"In general, the fluent API approach is a best fit for class schema definitions."}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-typescript",children:"class X {\n  @P.optional.default(50).min(5).max(5000).not.equal(999) value: number\n}\n"})})]}),"\n",(0,r.jsx)(o.jd,{to:"docs/decorate-fluent/introduction",children:"Click to read more about the decorator fluent library..."})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},6640:(e,n,t)=>{t.d(n,{jd:()=>a});t(6540);var r=t(6025),i=(t(4586),t(8774)),o=t(4848);t(1765);function a(e){var n=e.to;return(0,o.jsx)(i.A,{to:(0,r.A)(n),children:e.children})}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>s});var r=t(6540);const i={},o=r.createContext(i);function a(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);