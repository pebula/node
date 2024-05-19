"use strict";(self.webpackChunkdocs_nesbus=self.webpackChunkdocs_nesbus||[]).push([[6084],{3097:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>c,contentTitle:()=>d,default:()=>p,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var r=n(6870),t=n(5569);const i={},d=void 0,o={id:"api-docs/nesbus.sbserveroptions",title:"nesbus.sbserveroptions",description:"Home &gt; @pebula/nesbus &gt; SbServerOptions",source:"@site/docs/api-docs/nesbus.sbserveroptions.md",sourceDirName:"api-docs",slug:"/api-docs/nesbus.sbserveroptions",permalink:"/node/nesbus/docs/api-docs/nesbus.sbserveroptions",draft:!1,unlisted:!1,editUrl:"https://github.com/pebula/node/tree/main/apps/docs/nesbus/docs/docs/api-docs/nesbus.sbserveroptions.md",tags:[],version:"current",frontMatter:{}},c={},l=[{value:"SbServerOptions interface",id:"sbserveroptions-interface",level:2},{value:"Properties",id:"properties",level:2}];function a(e){const s={a:"a",code:"code",em:"em",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"/node/nesbus/docs/api-docs/",children:"Home"})," > ",(0,r.jsx)(s.a,{href:"/node/nesbus/docs/api-docs/nesbus",children:"@pebula/nesbus"})," > ",(0,r.jsx)(s.a,{href:"/node/nesbus/docs/api-docs/nesbus.sbserveroptions",children:"SbServerOptions"})]}),"\n",(0,r.jsx)(s.h2,{id:"sbserveroptions-interface",children:"SbServerOptions interface"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:"Signature:"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-typescript",children:"export interface SbServerOptions \n"})}),"\n",(0,r.jsx)(s.h2,{id:"properties",children:"Properties"}),"\n",(0,r.jsxs)("table",{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:(0,r.jsx)(s.p,{children:"Property"})}),(0,r.jsx)("th",{children:(0,r.jsx)(s.p,{children:"Modifiers"})}),(0,r.jsx)("th",{children:(0,r.jsx)(s.p,{children:"Type"})}),(0,r.jsx)("th",{children:(0,r.jsx)(s.p,{children:"Description"})})]})}),(0,r.jsxs)("tbody",{children:[(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"/node/nesbus/docs/api-docs/nesbus.sbserveroptions.client",children:"client"})})}),(0,r.jsx)("td",{}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:"SbConnectionOptions<ServiceBusClientOptions>"})}),(0,r.jsx)("td",{})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"/node/nesbus/docs/api-docs/nesbus.sbserveroptions.logger",children:"logger?"})})}),(0,r.jsx)("td",{}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:"LoggerService"})}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.em,{children:"(Optional)"})})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"/node/nesbus/docs/api-docs/nesbus.sbserveroptions.management",children:"management?"})})}),(0,r.jsx)("td",{}),(0,r.jsx)("td",{children:(0,r.jsxs)(s.p,{children:["SbConnectionOptions<ServiceBusAdministrationClientOptions> & { defaults: ",(0,r.jsx)(s.a,{href:"/node/nesbus/docs/api-docs/nesbus.sbmanagementdefaultsadapter",children:"SbManagementDefaultsAdapter"}),"; }"]})}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.em,{children:"(Optional)"})})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"/node/nesbus/docs/api-docs/nesbus.sbserveroptions.name",children:"name?"})})}),(0,r.jsx)("td",{}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:"string"})}),(0,r.jsxs)("td",{children:[(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.em,{children:"(Optional)"})," A unique name given to this server which allow subscriber filter and other paring capabilities. When not set, the server is defined as the default server used for all events defined without filtering."]}),(0,r.jsx)(s.p,{children:"Additionally, the name is used to pair server & client together to allow sharing of resources (connections/senders/receivers). Since by default all names are empty, all servers & clients are shared."}),(0,r.jsx)(s.p,{children:"Note that the name most be unique across all running instances (runtime scoped, not NestJS application scope) This means that only one default (empty name) server is allowed."}),(0,r.jsx)(s.p,{children:"If a duplicate name is detected the process will throw."})]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.a,{href:"/node/nesbus/docs/api-docs/nesbus.sbserveroptions.registerhandlers",children:"registerHandlers?"})})}),(0,r.jsx)("td",{}),(0,r.jsx)("td",{children:(0,r.jsx)(s.p,{children:"'sequence' | 'parallel'"})}),(0,r.jsxs)("td",{children:[(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.em,{children:"(Optional)"})," How handlers are registers in service bus. - sequence: register one after the other - parallel: register all at once"]}),(0,r.jsx)(s.p,{children:"The default value is parallel"})]})]})]})]})]})}function p(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},5569:(e,s,n)=>{n.d(s,{R:()=>d,x:()=>o});var r=n(6326);const t={},i=r.createContext(t);function d(e){const s=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:d(e.components),r.createElement(i.Provider,{value:s},e.children)}}}]);