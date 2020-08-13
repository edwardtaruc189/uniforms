(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{176:function(e,n,r){"use strict";r.r(n),r.d(n,"frontMatter",(function(){return o})),r.d(n,"metadata",(function(){return c})),r.d(n,"rightToc",(function(){return m})),r.d(n,"default",(function(){return s}));var t=r(2),a=r(11),i=(r(0),r(213)),o={id:"api-bridges",title:"Bridges"},c={id:"api-bridges",isDocsHomePage:!1,title:"Bridges",description:"To make use of any schema, uniforms have to create a bridge of it - a unified schema mapper.",source:"@site/../docs/api-bridges.md",permalink:"/docs/api-bridges",sidebar:"docs",previous:{title:"Fields",permalink:"/docs/api-fields"},next:{title:"Context data",permalink:"/docs/api-context-data"}},m=[{value:"<code>GraphQLBridge</code>",id:"graphqlbridge",children:[]},{value:"<code>JSONSchemaBridge</code>",id:"jsonschemabridge",children:[]},{value:"<code>SimpleSchema2Bridge</code>",id:"simpleschema2bridge",children:[]},{value:"<code>SimpleSchemaBridge</code>",id:"simpleschemabridge",children:[]}],l={rightToc:m};function s(e){var n=e.components,r=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(t.a)({},l,r,{components:n,mdxType:"MDXLayout"}),Object(i.b)("p",null,"To make use of any schema, uniforms have to create a ",Object(i.b)("em",{parentName:"p"},"bridge")," of it - a unified schema mapper."),Object(i.b)("p",{align:"center"},Object(i.b)("img",{src:"/img/bridge-concept.svg"})),Object(i.b)("p",null,"Currently available bridges:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"GraphQLBridge")," in ",Object(i.b)("inlineCode",{parentName:"li"},"uniforms-bridge-graphql")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"JSONSchemaBridge")," in ",Object(i.b)("inlineCode",{parentName:"li"},"uniforms-bridge-json-schema")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"SimpleSchema2Bridge")," in ",Object(i.b)("inlineCode",{parentName:"li"},"uniforms-bridge-simple-schema-2")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"SimpleSchemaBridge")," in ",Object(i.b)("inlineCode",{parentName:"li"},"uniforms-bridge-simple-schema"))),Object(i.b)("h2",{id:"graphqlbridge"},Object(i.b)("inlineCode",{parentName:"h2"},"GraphQLBridge")),Object(i.b)("pre",null,Object(i.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"import { GraphQLBridge } from 'uniforms-bridge-graphql';\nimport { buildASTSchema } from 'graphql';\nimport { parse } from 'graphql';\n\nconst schema = `\n    type Author {\n        id:        String!\n        firstName: String\n        lastName:  String\n    }\n\n    type Post {\n        id:     Int!\n        author: Author!\n        title:  String\n        votes:  Int\n    }\n\n    # This is required by buildASTSchema\n    type Query { anything: ID }\n`;\n\nconst schemaType = buildASTSchema(parse(schema)).getType('Post');\nconst schemaData = {\n  id: {\n    allowedValues: [1, 2, 3]\n  },\n  title: {\n    options: [\n      { label: 1, value: 'a' },\n      { label: 2, value: 'b' }\n    ]\n  }\n};\n\nconst schemaValidator = model => {\n  const details = [];\n\n  if (!model.id) {\n    details.push({ name: 'id', message: 'ID is required!' });\n  }\n\n  // ...\n\n  if (details.length) {\n    throw { details };\n  }\n};\n\nconst bridge = new GraphQLBridge(schemaType, schemaValidator, schemaData);\n")),Object(i.b)("h2",{id:"jsonschemabridge"},Object(i.b)("inlineCode",{parentName:"h2"},"JSONSchemaBridge")),Object(i.b)("pre",null,Object(i.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"import Ajv from 'ajv';\nimport { JSONSchemaBridge } from 'uniforms-bridge-json-schema';\n\nconst ajv = new Ajv({ allErrors: true, useDefaults: true });\n\nconst schema = {\n  title: 'Person',\n  type: 'object',\n  properties: {\n    firstName: { type: 'string' },\n    lastName: { type: 'string' },\n    age: {\n      description: 'Age in years',\n      type: 'integer',\n      minimum: 0\n    }\n  },\n  required: ['firstName', 'lastName']\n};\n\nfunction createValidator(schema: object) {\n  const validator = ajv.compile(schema);\n\n  return (model: object) => {\n    validator(model);\n    return validator.errors?.length ? { details: validator.errors } : null;\n  };\n}\n\nconst schemaValidator = createValidator(schema);\n\nconst bridge = new JSONSchemaBridge(schema, schemaValidator);\n")),Object(i.b)("h2",{id:"simpleschema2bridge"},Object(i.b)("inlineCode",{parentName:"h2"},"SimpleSchema2Bridge")),Object(i.b)("pre",null,Object(i.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"import SimpleSchema from 'simpl-schema';\nimport SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';\n\nconst PersonSchema = new SimpleSchema({\n  // ...\n\n  aboutMe: {\n    type: String,\n    uniforms: MyText, // Component...\n    uniforms: {\n      // ...or object...\n      component: MyText, // ...with component...\n      propA: 1 // ...and/or extra props.\n    }\n  }\n});\n\nconst bridge = new SimpleSchema2Bridge(PersonSchema);\n")),Object(i.b)("h2",{id:"simpleschemabridge"},Object(i.b)("inlineCode",{parentName:"h2"},"SimpleSchemaBridge")),Object(i.b)("pre",null,Object(i.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"import SimpleSchemaBridge from 'uniforms-bridge-simple-schema';\nimport { SimpleSchema } from 'aldeed:simple-schema';\n\nconst PersonSchema = new SimpleSchema({\n  // ...\n\n  aboutMe: {\n    type: String,\n    uniforms: MyText, // Component...\n    uniforms: {\n      // ...or object...\n      component: MyText, // ...with component...\n      propA: 1 // ...and/or extra props.\n    }\n  }\n});\n\nconst bridge = new SimpleSchemaBridge(PersonSchema);\n")))}s.isMDXComponent=!0},213:function(e,n,r){"use strict";r.d(n,"a",(function(){return p})),r.d(n,"b",(function(){return u}));var t=r(0),a=r.n(t);function i(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function o(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function c(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?o(Object(r),!0).forEach((function(n){i(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function m(e,n){if(null==e)return{};var r,t,a=function(e,n){if(null==e)return{};var r,t,a={},i=Object.keys(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||(a[r]=e[r]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=a.a.createContext({}),s=function(e){var n=a.a.useContext(l),r=n;return e&&(r="function"==typeof e?e(n):c(c({},n),e)),r},p=function(e){var n=s(e.components);return a.a.createElement(l.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},b=a.a.forwardRef((function(e,n){var r=e.components,t=e.mdxType,i=e.originalType,o=e.parentName,l=m(e,["components","mdxType","originalType","parentName"]),p=s(r),b=t,u=p["".concat(o,".").concat(b)]||p[b]||d[b]||i;return r?a.a.createElement(u,c(c({ref:n},l),{},{components:r})):a.a.createElement(u,c({ref:n},l))}));function u(e,n){var r=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var i=r.length,o=new Array(i);o[0]=b;var c={};for(var m in n)hasOwnProperty.call(n,m)&&(c[m]=n[m]);c.originalType=e,c.mdxType="string"==typeof e?e:t,o[1]=c;for(var l=2;l<i;l++)o[l]=r[l];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"}}]);