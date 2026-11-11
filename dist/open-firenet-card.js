function t(t,e,i,n){var s,o=arguments.length,a=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,n);else for(var r=t.length-1;r>=0;r--)(s=t[r])&&(a=(o<3?s(a):o>3?s(e,i,a):s(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),s=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new o(i,t,n)},r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,n))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,m=_.trustedTypes,f=m?m.emptyScript:"",g=_.reactiveElementPolyfillSupport,b=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&l(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:s}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const o=n?.call(this);s?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,n)=>{if(i)t.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of n){const n=document.createElement("style"),s=e.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=i.cssText,t.appendChild(n)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=n;const o=s.fromAttribute(e,t.type);this[n]=o??this._$Ej?.get(n)??o,this._$Em=null}}requestUpdate(t,e,i,n=!1,s){if(void 0!==t){const o=this.constructor;if(!1===n&&(s=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??v)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,g?.({ReactiveElement:x}),(_.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,k=t=>t,A=w.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,M=`<${P}>`,O=document,N=()=>O.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,I=Array.isArray,H="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,q=/-->/g,z=/>/g,R=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,D=/"/g,F=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),W=new WeakMap,V=O.createTreeWalker(O,129);function G(t,e){if(!I(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,n=[];let s,o=2===e?"<svg>":3===e?"<math>":"",a=U;for(let e=0;e<i;e++){const i=t[e];let r,c,l=-1,d=0;for(;d<i.length&&(a.lastIndex=d,c=a.exec(i),null!==c);)d=a.lastIndex,a===U?"!--"===c[1]?a=q:void 0!==c[1]?a=z:void 0!==c[2]?(F.test(c[2])&&(s=RegExp("</"+c[2],"g")),a=R):void 0!==c[3]&&(a=R):a===R?">"===c[0]?(a=s??U,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,r=c[1],a=void 0===c[3]?R:'"'===c[3]?D:j):a===D||a===j?a=R:a===q||a===z?a=U:(a=R,s=void 0);const h=a===R&&t[e+1].startsWith("/>")?" ":"";o+=a===U?i+M:l>=0?(n.push(r),i.slice(0,l)+S+i.slice(l)+C+h):i+C+(-2===l?e:h)}return[G(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class Z{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,o=0;const a=t.length-1,r=this.parts,[c,l]=J(t,e);if(this.el=Z.createElement(c,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=V.nextNode())&&r.length<a;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(S)){const e=l[o++],i=n.getAttribute(t).split(C),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:s,name:a[2],strings:i,ctor:"."===a[1]?et:"?"===a[1]?it:"@"===a[1]?nt:tt}),n.removeAttribute(t)}else t.startsWith(C)&&(r.push({type:6,index:s}),n.removeAttribute(t));if(F.test(n.tagName)){const t=n.textContent.split(C),e=t.length-1;if(e>0){n.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],N()),V.nextNode(),r.push({type:2,index:++s});n.append(t[e],N())}}}else if(8===n.nodeType)if(n.data===P)r.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(C,t+1));)r.push({type:7,index:s}),t+=C.length-1}s++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,n){if(e===B)return e;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const o=T(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,n)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??O).importNode(e,!0);V.currentNode=n;let s=V.nextNode(),o=0,a=0,r=i[0];for(;void 0!==r;){if(o===r.index){let e;2===r.type?e=new Y(s,s.nextSibling,this,t):1===r.type?e=new r.ctor(s,r.name,r.strings,this,t):6===r.type&&(e=new st(s,this,t)),this._$AV.push(e),r=i[++a]}o!==r?.index&&(s=V.nextNode(),o++)}return V.currentNode=O,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),T(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>I(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new X(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Z(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new Y(this.O(N()),this.O(N()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,s){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,n){const s=this.strings;let o=!1;if(void 0===s)t=Q(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const n=t;let a,r;for(t=s[0],a=0;a<s.length-1;a++)r=Q(this,n[i+a],e,a),r===B&&(r=this._$AH[a]),o||=!T(r)||r!==this._$AH[a],r===K?t=K:t!==K&&(t+=(r??"")+s[a+1]),this._$AH[a]=r}o&&!n&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class nt extends tt{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??K)===B)return;const i=this._$AH,n=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==K&&(i===K||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(Z,Y),(w.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;class rt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let s=n._$litPart$;if(void 0===s){const t=i?.renderBefore??null;n._$litPart$=s=new Y(e.insertBefore(N(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}rt._$litElement$=!0,rt.finalized=!0,at.litElementHydrateSupport?.({LitElement:rt});const ct=at.litElementPolyfillSupport;ct?.({LitElement:rt}),(at.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},ht=(t=dt,e,i)=>{const{kind:n,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,s,t,!0,i)},init(e){return void 0!==e&&this.C(n,void 0,t,e),e}}}if("setter"===n){const{name:n}=i;return function(i){const s=this[n];e.call(this,i),this.requestUpdate(n,s,t,!0,i)}}throw Error("Unsupported decorator location: "+n)};function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}const _t=["status","climate","temperatures","fans","consumption","mechanics","bridge","schedule"],mt=_t.filter(t=>"status"!==t),ft="open_firenet",gt=_t,bt=["climate","temperatures","consumption"],yt={off:{labelKey:"state.off",icon:"mdi:power",tone:"off",burning:!1},standby:{labelKey:"state.standby",icon:"mdi:sleep",tone:"idle",burning:!1},ignition:{labelKey:"state.ignition",icon:"mdi:fire",tone:"active",burning:!0},flame_start:{labelKey:"state.flame_start",icon:"mdi:fire",tone:"active",burning:!0},heating:{labelKey:"state.heating",icon:"mdi:fire",tone:"active",burning:!0},cleaning:{labelKey:"state.cleaning",icon:"mdi:auto-fix",tone:"busy",burning:!1},burn_off:{labelKey:"state.burn_off",icon:"mdi:fire-off",tone:"idle",burning:!1},splitlog:{labelKey:"state.splitlog",icon:"mdi:fire",tone:"active",burning:!0},splitlog_check:{labelKey:"state.splitlog_check",icon:"mdi:fire",tone:"active",burning:!0},splitlog_refuel:{labelKey:"state.splitlog_refuel",icon:"mdi:fire-alert",tone:"busy",burning:!0},splitlog_no_refuel:{labelKey:"state.splitlog_no_refuel",icon:"mdi:fire-off",tone:"idle",burning:!1},unknown:{labelKey:"state.unknown",icon:"mdi:help-circle-outline",tone:"idle",burning:!1}},vt={labelKey:"state.unknown",icon:"mdi:help-circle-outline",tone:"idle",burning:!1},$t={manual:"preset.manual",auto:"preset.auto",comfort:"preset.comfort"},xt=["auto","1","2","3","4","5"],wt={"card.default_title":"Pellet stove","error.config_missing":"open-firenet-card: configuration is missing","error.no_entities":'No Open Firenet entity found. Make sure the integration is installed, or set the "entity" option.',"error.entity_not_found":'Entity "{entity}" was not found. Check the "entity" option of the card.',"badge.connected":"Connected","badge.offline":"Offline","badge.flame":"Flame","badge.hopper_open":"Hopper open","badge.error":"Error","section.status":"Stove status","section.climate":"Heating","section.temperatures":"Temperatures","section.fans":"Fans","section.consumption":"Consumption & maintenance","section.mechanics":"Mechanics","section.bridge":"Bridge","section.schedule":"Schedule & protection","caption.ambient":"Ambient","caption.target":"Target","caption.mode":"Mode","caption.power":"Power","caption.power_set":"(set {value} %)","caption.combustion":"Combustion chamber","caption.board":"Mainboard","caption.pellets":"Pellets consumed","caption.operating_hours":"Operating hours","caption.service":"Maintenance","caption.service_remaining":"remaining {value} kg","caption.draft":"Flue draft","caption.auger":"Auger","caption.flaps":"Air flaps","caption.flaps_target":"Air flaps (target {value} %)","caption.wifi":"Wi-Fi · {quality}","caption.uptime":"Uptime","caption.link":"Stove link","caption.trim":"Convection trim","caption.enabled":"Enabled","caption.disabled":"Disabled","caption.running":"Running","caption.stopped":"Stopped","caption.fan_on":"On","caption.fan_off":"Off","button.start":"Start","button.stop":"Stop","aria.enable":"Enable","aria.disable":"Disable","aria.decrease_target":"Decrease the target temperature","aria.increase_target":"Increase the target temperature","switch.heating_schedule":"Heating schedule","switch.frost_protection":"Frost protection","preset.manual":"Manual","preset.auto":"Auto","preset.comfort":"Comfort","quality.excellent":"Excellent","quality.good":"Good","quality.fair":"Fair","quality.weak":"Weak","quality.very_weak":"Very weak","quality.none":"—","duration.days":"d","duration.hours":"h","duration.minutes":"min","state.off":"Off","state.standby":"Standby","state.ignition":"Ignition","state.flame_start":"Flame start","state.heating":"Heating","state.cleaning":"Cleaning","state.burn_off":"Burn off","state.splitlog":"Split log","state.splitlog_check":"Split log check","state.splitlog_refuel":"Refuel the log","state.splitlog_no_refuel":"Split log — no refuel","state.unknown":"Unknown","editor.anchor":"Anchor entity","editor.anchor_hint":"By default the card finds every entity of the same device.","editor.title":"Title (optional)","editor.title_placeholder":"Pellet stove","editor.show_controls":"Show controls","editor.sections":"Displayed sections","editor.section.status":"Stove status","editor.section.climate":"Heating (on/off, target, mode, power)","editor.section.temperatures":"Temperatures","editor.section.fans":"MultiAir fans","editor.section.consumption":"Consumption & maintenance","editor.section.mechanics":"Mechanics (draft, auger, flaps)","editor.section.bridge":"Bridge (Wi-Fi, uptime, link)","editor.section.schedule":"Schedule & frost protection","editor.expanded_sections":"Expanded by default","editor.expanded_sections_hint":"The other sections start collapsed; click a section header to expand it."},kt={"card.default_title":"Poêle à granulés","error.config_missing":"open-firenet-card : configuration manquante","error.no_entities":"Aucune entité Open Firenet trouvée. Vérifiez que l'intégration est installée ou renseignez l'option « entity ».","error.entity_not_found":"L'entité « {entity} » est introuvable. Vérifiez l'option « entity » de la carte.","badge.connected":"Connecté","badge.offline":"Hors ligne","badge.flame":"Flamme","badge.hopper_open":"Couvercle ouvert","badge.error":"Erreur","section.status":"Statut du poêle","section.climate":"Chauffage","section.temperatures":"Températures","section.fans":"Ventilateurs","section.consumption":"Consommation & entretien","section.mechanics":"Mécanique","section.bridge":"Passerelle","section.schedule":"Planning & protection","caption.ambient":"Ambiante","caption.target":"Consigne","caption.mode":"Mode","caption.power":"Puissance","caption.power_set":"(réglée {value} %)","caption.combustion":"Chambre de combustion","caption.board":"Carte mère","caption.pellets":"Granulés consommés","caption.operating_hours":"Heures de fonctionnement","caption.service":"Entretien","caption.service_remaining":"reste {value} kg","caption.draft":"Tirage","caption.auger":"Vis sans fin","caption.flaps":"Volets d'air","caption.flaps_target":"Volets (cible {value} %)","caption.wifi":"Wi-Fi · {quality}","caption.uptime":"Passerelle","caption.link":"Liaison poêle","caption.trim":"Trim convection","caption.enabled":"Activé","caption.disabled":"Désactivé","caption.running":"En marche","caption.stopped":"À l'arrêt","caption.fan_on":"Marche","caption.fan_off":"Arrêt","button.start":"Démarrer","button.stop":"Arrêter","aria.enable":"Activer","aria.disable":"Désactiver","aria.decrease_target":"Diminuer la consigne","aria.increase_target":"Augmenter la consigne","switch.heating_schedule":"Chauffage programmé","switch.frost_protection":"Hors-gel","preset.manual":"Manuel","preset.auto":"Auto","preset.comfort":"Confort","quality.excellent":"Excellent","quality.good":"Bon","quality.fair":"Moyen","quality.weak":"Faible","quality.very_weak":"Très faible","quality.none":"—","duration.days":"j","duration.hours":"h","duration.minutes":"min","state.off":"Éteint","state.standby":"Veille","state.ignition":"Allumage","state.flame_start":"Démarrage flamme","state.heating":"En chauffe","state.cleaning":"Nettoyage","state.burn_off":"Extinction","state.splitlog":"Bûche","state.splitlog_check":"Contrôle bûche","state.splitlog_refuel":"Recharger la bûche","state.splitlog_no_refuel":"Bûche — pas de rechargement","state.unknown":"Inconnu","editor.anchor":"Entité ancre","editor.anchor_hint":"Par défaut, la carte retrouve toutes les entités du même appareil.","editor.title":"Titre (optionnel)","editor.title_placeholder":"Poêle à granulés","editor.show_controls":"Afficher les contrôles","editor.sections":"Sections affichées","editor.section.status":"Statut du poêle","editor.section.climate":"Chauffage (marche/arrêt, consigne, mode, puissance)","editor.section.temperatures":"Températures","editor.section.fans":"Ventilateurs MultiAir","editor.section.consumption":"Consommation & entretien","editor.section.mechanics":"Mécanique (tirage, vis, volets)","editor.section.bridge":"Passerelle (Wi-Fi, uptime, liaison)","editor.section.schedule":"Planning & protection hors-gel","editor.expanded_sections":"Ouvertes par défaut","editor.expanded_sections_hint":"Les autres sections sont repliées ; cliquez sur l'en-tête d'une section pour la déplier."},At={"card.default_title":"Estufa de Pellets","error.config_missing":"open-firenet-card: configuración faltante","error.no_entities":"No se ha encontrado ninguna entidad Open Firenet. Compruebe que la integración esté instalada o configure la opción « entity ».","error.entity_not_found":"La entidad « {entity} » no se encuentra. Compruebe la opción « entity » de la tarjeta.","badge.connected":"Conectado","badge.offline":"Desconectado","badge.flame":"Llama","badge.hopper_open":"Tapa abierta","badge.error":"Error","section.status":"Estado de la estufa","section.climate":"Calefacción","section.temperatures":"Temperaturas","section.fans":"Ventiladores","section.consumption":"Consumo y mantenimiento","section.mechanics":"Mecánica","section.bridge":"Pasarela","section.schedule":"Programación y protección","caption.ambient":"Ambiente","caption.target":"Consigna","caption.mode":"Modo","caption.power":"Potencia","caption.power_set":"(configurado {value} %)","caption.combustion":"Cámara de combustión","caption.board":"Placa base","caption.pellets":"Pellets consumidos","caption.operating_hours":"Horas de funcionamiento","caption.service":"Mantenimiento","caption.service_remaining":"quedan {value} kg","caption.draft":"Tiro","caption.auger":"Tornillo sin fin","caption.flaps":"Compuertas de aire","caption.flaps_target":"Compuertas (objetivo {value} %)","caption.wifi":"Wi-Fi · {quality}","caption.uptime":"Pasarela","caption.link":"Enlace de la estufa","caption.trim":"Ajuste de convección","caption.enabled":"Activado","caption.disabled":"Desactivado","caption.running":"En marcha","caption.stopped":"Detenido","caption.fan_on":"Marcha","caption.fan_off":"Parada","button.start":"Iniciar","button.stop":"Detener","aria.enable":"Activar","aria.disable":"Desactivar","aria.decrease_target":"Disminuir la consigna","aria.increase_target":"Aumentar la consigna","switch.heating_schedule":"Calefacción programada","switch.frost_protection":"Antihielo","preset.manual":"Manual","preset.auto":"Auto","preset.comfort":"Confort","quality.excellent":"Excelente","quality.good":"Bueno","quality.fair":"Regular","quality.weak":"Débil","quality.very_weak":"Muy débil","quality.none":"—","duration.days":"d","duration.hours":"h","duration.minutes":"min","state.off":"Apagado","state.standby":"En espera","state.ignition":"Encendido","state.flame_start":"Inicio de llama","state.heating":"Calentando","state.cleaning":"Limpieza","state.burn_off":"Extinción","state.splitlog":"Leña","state.splitlog_check":"Control de leña","state.splitlog_refuel":"Recargar leña","state.splitlog_no_refuel":"Leña — sin recarga","state.unknown":"Desconocido","editor.anchor":"Entidad ancla","editor.anchor_hint":"Por defecto, la tarjeta encuentra todas las entidades del mismo dispositivo.","editor.title":"Título (opcional)","editor.title_placeholder":"Estufa de pellets","editor.show_controls":"Mostrar controles","editor.sections":"Secciones mostradas","editor.section.status":"Estado de la estufa","editor.section.climate":"Calefacción (encendido/apagado, consigna, modo, potencia)","editor.section.temperatures":"Temperaturas","editor.section.fans":"Ventiladores MultiAir","editor.section.consumption":"Consumo y mantenimiento","editor.section.mechanics":"Mecánica (tiro, tornillo, compuertas)","editor.section.bridge":"Pasarela (Wi-Fi, tiempo de actividad, enlace)","editor.section.schedule":"Programación y protección antihielo","editor.expanded_sections":"Abiertas por defecto","editor.expanded_sections_hint":"Las demás secciones están contraídas; haz clic en el encabezado de una sección para desplegarla."},Et=["en","fr","es"],St={en:wt,fr:kt,es:At},Ct={en:{days:wt["duration.days"],hours:wt["duration.hours"],minutes:wt["duration.minutes"]},fr:{days:kt["duration.days"],hours:kt["duration.hours"],minutes:kt["duration.minutes"]},es:{days:At["duration.days"],hours:At["duration.hours"],minutes:At["duration.minutes"]}};function Pt(t,e){const i=String(e||t?.locale?.language||t?.language||"en").toLowerCase().split("-")[0];return Et.includes(i)?i:"en"}function Mt(t,e,i){let n=(St[t]??wt)[e]??wt[e]??e;if(i)for(const[t,e]of Object.entries(i))n=n.split(`{${t}}`).join(String(e));return n}const Ot={status:"editor.section.status",climate:"editor.section.climate",temperatures:"editor.section.temperatures",fans:"editor.section.fans",consumption:"editor.section.consumption",mechanics:"editor.section.mechanics",bridge:"editor.section.bridge",schedule:"editor.section.schedule"};let Nt=class extends rt{constructor(){super(...arguments),this._datalistId=`ofn-entities-${Math.random().toString(36).slice(2,8)}`}setConfig(t){this._config=t}get _lang(){return Pt(this.hass,this._config?.language)}_t(t){return Mt(this._lang,t)}_nameFor(t){const e=this.hass?.states[t];if(e&&this.hass&&"function"==typeof this.hass.formatEntityName){const t=this.hass.formatEntityName(e);if(t)return t}return e?.attributes.friendly_name??t}get _anchorOptions(){const t=this.hass;return t?.entities?Object.keys(t.entities).filter(e=>t.entities[e].platform===ft&&t.states[e]).map(t=>({id:t,name:this._nameFor(t)})).sort((t,e)=>t.name.localeCompare(e.name)):[]}_update(t){if(!this._config)return;const e={...this._config,...t};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}get _selectedSections(){const t=this._config?.sections;return t&&t.length?t:[..._t]}_toggleSection(t,e){const i=this._selectedSections,n=e?[...new Set([...i,t])]:i.filter(e=>e!==t);this._update({sections:n})}get _expandedSections(){const t=this._config?.expanded_sections;return t||[...bt]}_toggleExpanded(t,e){const i=this._expandedSections,n=e?[...new Set([...i,t])]:i.filter(e=>e!==t);this._update({expanded_sections:n})}render(){if(!this._config)return K;const t=this._anchorOptions;return L`
      <div class="form">
        <div class="field">
          <label class="title">${this._t("editor.anchor")}</label>
          <input
            type="text"
            list=${this._datalistId}
            .value=${this._config.entity??""}
            placeholder="climate.open_firenet"
            @change=${t=>this._update({entity:t.target.value||void 0})}
          />
          <datalist id=${this._datalistId}>
            ${t.map(t=>L`<option value=${t.id}>${t.name}</option>`)}
          </datalist>
          <span class="hint">${this._t("editor.anchor_hint")}</span>
        </div>

        <div class="field">
          <label class="title">${this._t("editor.title")}</label>
          <input
            type="text"
            .value=${this._config.title??""}
            placeholder=${this._t("editor.title_placeholder")}
            @input=${t=>this._update({title:t.target.value})}
          />
        </div>

        <div class="switch-row">
          <input
            id="show-controls"
            type="checkbox"
            .checked=${!1!==this._config.show_controls}
            @change=${t=>this._update({show_controls:t.target.checked})}
          />
          <label for="show-controls">${this._t("editor.show_controls")}</label>
        </div>

        <div class="field">
          <label class="title">${this._t("editor.sections")}</label>
          ${_t.map(t=>L`<div class="checkbox-row">
              <input
                id=${`section-${t}`}
                type="checkbox"
                .checked=${this._selectedSections.includes(t)}
                @change=${e=>this._toggleSection(t,e.target.checked)}
              />
              <label for=${`section-${t}`}>${this._t(Ot[t])}</label>
            </div>`)}
        </div>

        <div class="field">
          <label class="title">${this._t("editor.expanded_sections")}</label>
          ${mt.map(t=>L`<div class="checkbox-row">
              <input
                id=${`expanded-${t}`}
                type="checkbox"
                .checked=${this._expandedSections.includes(t)}
                @change=${e=>this._toggleExpanded(t,e.target.checked)}
              />
              <label for=${`expanded-${t}`}>${this._t(Ot[t])}</label>
            </div>`)}
          <span class="hint">${this._t("editor.expanded_sections_hint")}</span>
        </div>
      </div>
    `}};Nt.styles=a`
    .form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    label.title {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--secondary-text-color);
    }
    input[type='text'] {
      font: inherit;
      padding: 10px 12px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.2));
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }
    .switch-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 0;
    }
    .checkbox-row input {
      accent-color: var(--primary-color);
      width: 18px;
      height: 18px;
    }
    .hint {
      font-size: 0.78rem;
      color: var(--secondary-text-color);
    }
  `,t([pt({attribute:!1})],Nt.prototype,"hass",void 0),t([ut()],Nt.prototype,"_config",void 0),Nt=t([lt("open-firenet-card-editor")],Nt);const Tt={climate:{domain:"climate",key:"open_firenet"},stove_state:{domain:"sensor",key:"stove_state"},connected:{domain:"binary_sensor",key:"connected"},burning:{domain:"binary_sensor",key:"burning"},problem:{domain:"binary_sensor",key:"problem"},hopper_lid:{domain:"binary_sensor",key:"hopper_lid"},room_temperature:{domain:"sensor",key:"room_temperature"},combustion_temperature:{domain:"sensor",key:"combustion_temperature"},board_temperature:{domain:"sensor",key:"board_temperature"},pellets_total_kg:{domain:"sensor",key:"pellets_total_kg"},pellet_hours:{domain:"sensor",key:"pellet_hours"},service_countdown_kg:{domain:"sensor",key:"service_countdown_kg"},fan_speed_rpm:{domain:"sensor",key:"fan_speed_rpm"},auger_speed_rpm:{domain:"sensor",key:"auger_speed_rpm"},power_actual_percent:{domain:"sensor",key:"power_actual_percent"},air_flaps_percent:{domain:"sensor",key:"air_flaps_percent"},air_flaps_target_percent:{domain:"sensor",key:"air_flaps_target_percent"},wifi_rssi:{domain:"sensor",key:"wifi_rssi"},uptime_seconds:{domain:"sensor",key:"uptime_seconds"},heating_power:{domain:"number",key:"heating_power"},setback_temperature:{domain:"number",key:"setback_temperature"},frost_protection_temperature:{domain:"number",key:"frost_protection_temperature"},room_temperature_offset:{domain:"number",key:"room_temperature_offset"},bake_target_temperature:{domain:"number",key:"bake_target_temperature"},multiair_1:{domain:"fan",key:"multiair_1"},multiair_2:{domain:"fan",key:"multiair_2"},multiair_1_area:{domain:"number",key:"multiair_1_area"},multiair_2_area:{domain:"number",key:"multiair_2_area"},heating_schedule:{domain:"switch",key:"heating_schedule"},frost_protection:{domain:"switch",key:"frost_protection"}};function It(t,e){if(e.entity)return e.entity;const i=t.entities??{};for(const[t,e]of Object.entries(i))if(e.platform===ft&&t.startsWith("climate."))return t;return t.states["climate.open_firenet"]?"climate.open_firenet":void 0}function Ht(t,e){const i={},n=It(t,e),s=function(t,e){const i=t.entities??{},n=e?i[e]?.device_id??void 0:void 0;if(n){const t=Object.keys(i).filter(t=>i[t].device_id===n);if(t.length)return t}const s=Object.keys(i).filter(t=>i[t].platform===ft);return s.length?s:Object.keys(t.states).filter(t=>{const e=t.split(".")[1]??"";return e===ft||e.startsWith(`${ft}_`)})}(t,n),o=new Set(s),a=t.entities??{},r=new Map;for(const t of s){const e=a[t],i=e?.translation_key;i&&r.set(`${t.split(".")[0]}.${i}`,t)}for(const[t,n]of Object.entries(Tt)){const a=e[t];if("string"==typeof a&&a){i[t]=a;continue}const c=r.get(`${n.domain}.${n.key}`);if(c){i[t]=c;continue}const l=`.${ft}_${n.key}`,d=s.find(t=>o.has(t)&&t.endsWith(l));if(d)i[t]=d;else if(n.key===ft){const e=`${n.domain}.${ft}`;o.has(e)&&(i[t]=e)}}if(!i.climate){const t=n&&n.startsWith("climate.")&&o.has(n)?n:s.find(t=>o.has(t)&&t.startsWith("climate."));t&&(i.climate=t)}return i}function Ut(t){if(!t)return null;const e=t.state;if(""===e||"unknown"===e||"unavailable"===e)return null;const i=Number(e);return Number.isFinite(i)?i:null}function qt(t){return!!t&&"unknown"!==t.state&&"unavailable"!==t.state}function zt(t){return"on"===t?.state}function Rt(t,e=1,i){return null!==t&&Number.isFinite(t)?t.toLocaleString(i,{minimumFractionDigits:0,maximumFractionDigits:e}):"—"}const jt=a`
  :host {
    display: block;
  }

  ha-card {
    overflow: hidden;
  }

  .card {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .section + .section {
    border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    padding-top: 14px;
  }

  .section-title {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
  }

  /* ---------- collapsible sections ---------- */
  .section-header {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .section-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 1;
    min-width: 0;
    padding: 0;
    margin: 0;
    background: none;
    border: none;
    border-radius: 0;
    color: inherit;
    cursor: pointer;
    text-align: left;
    justify-content: flex-start;
  }

  .section-summary {
    flex: none;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--primary-text-color);
    white-space: nowrap;
  }

  .section-summary.clickable:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }

  .section-toggle:hover {
    background: none;
  }

  .section-toggle .chevron {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
    flex: none;
    transition: transform 0.15s ease;
  }

  .section-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* ---------- header ---------- */
  .header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .header-title {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .header-title .name {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-title .model {
    font-size: 0.85rem;
    color: var(--secondary-text-color);
  }

  .badges {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
    color: var(--secondary-text-color);
  }

  .badge ha-icon {
    --mdc-icon-size: 15px;
  }

  .badge.ok {
    color: var(--success-color, #43a047);
  }

  .badge.alarm {
    background: color-mix(in srgb, var(--error-color, #db4437) 16%, transparent);
    color: var(--error-color, #db4437);
  }

  .badge.warn {
    background: color-mix(in srgb, var(--warning-color, #ffa600) 20%, transparent);
    color: var(--warning-color, #ffa600);
  }

  /* ---------- status ---------- */
  .status {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .state-chip {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 14px;
    border-radius: 14px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
  }

  .state-chip ha-icon {
    --mdc-icon-size: 26px;
  }

  .state-chip .label {
    font-size: 1.05rem;
    font-weight: 600;
  }

  .tone-active {
    color: var(--state-climate-heat-color, #ff6d00);
    background: color-mix(in srgb, var(--state-climate-heat-color, #ff6d00) 14%, transparent);
  }

  .tone-busy {
    color: var(--info-color, #039be5);
    background: color-mix(in srgb, var(--info-color, #039be5) 14%, transparent);
  }

  .tone-error {
    color: var(--error-color, #db4437);
    background: color-mix(in srgb, var(--error-color, #db4437) 14%, transparent);
  }

  .tone-idle,
  .tone-off {
    color: var(--secondary-text-color);
  }

  .flame ha-icon {
    animation: flicker 1.6s ease-in-out infinite;
  }

  @keyframes flicker {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.12);
      opacity: 0.82;
    }
  }

  .temps {
    display: flex;
    gap: 18px;
    margin-left: auto;
    flex-wrap: wrap;
  }

  .temp {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .temp .value {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1;
    color: var(--primary-text-color);
  }

  .temp .caption {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
    margin-top: 2px;
  }

  /* ---------- generic tiles ---------- */
  .tiles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 10px;
  }

  .tile {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }

  .tile ha-icon {
    --mdc-icon-size: 22px;
    color: var(--secondary-text-color);
    flex: none;
  }

  .tile .body {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .tile .value {
    font-size: 1.02rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .tile .caption {
    font-size: 0.74rem;
    color: var(--secondary-text-color);
  }

  /* ---------- icon accents (per domain) ---------- */
  .tile ha-icon.tone-heat {
    color: var(--state-climate-heat-color, #ff6d00);
  }

  .tile ha-icon.tone-warm {
    color: var(--warning-color, #ffa000);
  }

  .tile ha-icon.tone-teal {
    color: var(--teal-color, #00897b);
  }

  .tile ha-icon.tone-cool {
    color: var(--info-color, #039be5);
  }

  .tile ha-icon.tone-link {
    color: var(--success-color, #43a047);
  }

  .tile ha-icon.tone-alarm {
    color: var(--error-color, #db4437);
  }

  .tile ha-icon.tone-schedule {
    color: var(--purple-color, #8e24aa);
  }

  .tile ha-icon.tone-frost {
    color: var(--light-blue-color, #29b6f6);
  }

  /* ---------- clickable values (open the more-info dialog) ---------- */
  .clickable {
    cursor: pointer;
  }

  .tile.clickable:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.08));
  }

  .state-chip.clickable:hover {
    filter: brightness(0.96);
  }

  .temp.clickable:hover .value {
    text-decoration: underline;
  }

  .slider-row.clickable:hover .caption {
    color: var(--primary-text-color);
  }

  .clickable:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  /* ---------- controls ---------- */
  .row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .row.wrap {
    flex-wrap: wrap;
  }

  .spacer {
    flex: 1;
  }

  button {
    font: inherit;
    color: var(--primary-text-color);
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
    border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    border-radius: 10px;
    padding: 8px 12px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: background 0.15s ease;
  }

  button:hover {
    background: var(--divider-color, rgba(0, 0, 0, 0.1));
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  button ha-icon {
    --mdc-icon-size: 20px;
  }

  button.primary {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: transparent;
  }

  button.primary:hover {
    background: var(--primary-color);
    filter: brightness(1.08);
  }

  button.icon {
    min-width: 40px;
    padding: 8px;
  }

  button.segment {
    border-radius: 10px;
    font-size: 0.85rem;
    padding: 6px 12px;
  }

  button.segment.selected {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: transparent;
  }

  .temp-adjust {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .temp-adjust .consigne {
    font-size: 1.5rem;
    font-weight: 600;
    min-width: 4.5ch;
    text-align: center;
  }

  input[type='range'] {
    width: 100%;
    accent-color: var(--primary-color);
  }

  .slider-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .slider-row .caption {
    display: flex;
    justify-content: space-between;
    font-size: 0.78rem;
    color: var(--secondary-text-color);
  }

  /* ---------- fan ---------- */
  .fan {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }

  .fan-head {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .fan-head .name {
    font-weight: 600;
  }

  .spin ha-icon {
    animation: spin 2.2s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* ---------- progress ---------- */
  .progress {
    height: 6px;
    border-radius: 3px;
    background: var(--divider-color, rgba(0, 0, 0, 0.12));
    overflow: hidden;
  }

  .progress > span {
    display: block;
    height: 100%;
    border-radius: 3px;
    background: var(--primary-color);
    transition: width 0.3s ease;
  }

  .progress > span.warn {
    background: var(--warning-color, #ffa600);
  }

  .progress > span.danger {
    background: var(--error-color, #db4437);
  }

  /* ---------- signals ---------- */
  .bars {
    display: inline-flex;
    align-items: flex-end;
    gap: 2px;
    height: 14px;
  }

  .bars i {
    width: 4px;
    border-radius: 1px;
    background: var(--divider-color, rgba(0, 0, 0, 0.2));
  }

  .bars i.on {
    background: var(--primary-color);
  }

  .bars.tone-ok i.on {
    background: var(--success-color, #43a047);
  }

  .bars.tone-fair i.on {
    background: var(--warning-color, #ffa600);
  }

  .bars.tone-weak i.on {
    background: var(--error-color, #db4437);
  }

  .bars i:nth-child(1) {
    height: 4px;
  }
  .bars i:nth-child(2) {
    height: 7px;
  }
  .bars i:nth-child(3) {
    height: 10px;
  }
  .bars i:nth-child(4) {
    height: 14px;
  }

  .muted {
    color: var(--secondary-text-color);
  }

  .error-text {
    color: var(--error-color, #db4437);
    font-size: 0.9rem;
  }

  /* Honour the OS "reduce motion" preference: keep the layout, drop the loops. */
  @media (prefers-reduced-motion: reduce) {
    .flame ha-icon,
    .spin ha-icon {
      animation: none;
    }

    .section-toggle .chevron,
    .progress > span {
      transition: none;
    }
  }
`,Dt=["multiair_1","multiair_2"],Ft={status:"section.status",climate:"section.climate",temperatures:"section.temperatures",fans:"section.fans",consumption:"section.consumption",mechanics:"section.mechanics",bridge:"section.bridge",schedule:"section.schedule"};let Lt=class extends rt{constructor(){super(...arguments),this._sectionOverrides=new Map}static async getConfigElement(){return document.createElement("open-firenet-card-editor")}static getStubConfig(t,e=[],i=[]){const n=[...e,...i],s=e=>t?.entities?.[e]?.platform===ft;return{entity:n.find(t=>t.startsWith("climate.")&&s(t))??n.find(t=>s(t))??(s("climate.open_firenet")?"climate.open_firenet":void 0)??"climate.open_firenet",show_controls:!0}}setConfig(t){if(!t)throw new Error(Mt(Pt(this.hass),"error.config_missing"));this._config={show_controls:!0,...t},this._cache=void 0}getCardSize(){if(!this._config)return 6;let t=2;for(const e of this._sections)t+="status"===e||this._isExpanded(e)?3:1;return t}getGridOptions(){return{columns:12,rows:"auto",min_columns:6}}connectedCallback(){super.connectedCallback(),this._requestStatesContext()}disconnectedCallback(){this._unsubscribe?.(),this._unsubscribe=void 0,super.disconnectedCallback()}_requestStatesContext(){const t=new CustomEvent("context-request",{bubbles:!0,composed:!0});t.context="states",t.subscribe=!0,t.callback=(t,e)=>{this._unsubscribe=e,this._states=t},this.dispatchEvent(t)}shouldUpdate(t){if(t.has("_config")||t.has("_sectionOverrides"))return!0;if(!this.hass)return!1;if(!this._states)return t.has("hass")||t.has("_states");const e=!this._static||this._static.entities!==this.hass.entities||this._static.devices!==this.hass.devices||this._static.language!==this.hass.language||this._static.locale!==this.hass.locale;return e&&(this._static={entities:this.hass.entities,devices:this.hass.devices,language:this.hass.language,locale:this.hass.locale}),e||t.has("_states")}get _stateMap(){return this._states??this.hass?.states??{}}get _lang(){return Pt(this.hass,this._config?.language)}_t(t,e){return Mt(this._lang,t,e)}get entities(){const t=this._config,e=this.hass?.entities,i=this.hass?.devices,n=this._stateMap,s=this._cache;if(s&&s.config===t&&s.entities===e&&s.devices===i&&s.states===n)return s.result;const o=Ht(this.hass,t);return this._cache={config:t,entities:e,devices:i,states:n,result:o},o}get _controls(){return!1!==this._config.show_controls}_serviceInterval(){const t=Number(this._config.service_interval);return Number.isFinite(t)&&t>0?t:1500}get _sections(){const t=this._config.sections;return t&&t.length?t.filter(t=>_t.includes(t)):[...gt]}get _expandedDefaults(){const t=this._config.expanded_sections??bt;return new Set(t.filter(t=>_t.includes(t)))}_isExpanded(t){return this._sectionOverrides.get(t)??this._expandedDefaults.has(t)}_toggleSection(t){const e=new Map(this._sectionOverrides);e.set(t,!this._isExpanded(t)),this._sectionOverrides=e}_entity(t){const e=this.entities[t];return e?this._stateMap[e]:void 0}_device(){const t=It(this.hass,this._config),e=t?this.hass.entities?.[t]?.device_id:void 0;return e?this.hass.devices?.[e]:void 0}_presetLabel(t){const e=$t[t];return e?this._t(e):t}_stateLabel(t,e){if(t&&"function"==typeof this.hass.formatEntityState){const e=this.hass.formatEntityState(t);if(e)return e}return this._t(e)}_entityName(t,e){if(t&&"function"==typeof this.hass.formatEntityName){const e=this.hass.formatEntityName(t);if(e)return e}return t?.attributes.friendly_name??e}_call(t,e,i){this.hass.callService(t,e,i)}_moreInfo(t){t&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}_onClickableKey(t,e){e&&("Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._moreInfo(e)))}_setHvac(t){const e=this.entities.climate;e&&this._call("climate","set_hvac_mode",{entity_id:e,hvac_mode:t?"heat":"off"})}_adjustTemp(t){const e=this._entity("climate"),i=this.entities.climate;if(!e||!i)return;const n=Number(e.attributes.target_temp_step??1),s=Number(e.attributes.min_temp??14),o=Number(e.attributes.max_temp??28),a=Number(e.attributes.temperature??s),r=Math.min(o,Math.max(s,a+t*n));this._call("climate","set_temperature",{entity_id:i,temperature:r})}_setPreset(t){const e=this.entities.climate;e&&this._call("climate","set_preset_mode",{entity_id:e,preset_mode:t})}_setNumber(t,e){const i=this.entities[t];i&&this._call("number","set_value",{entity_id:i,value:e})}_toggleSwitch(t,e){const i=this.entities[t];i&&this._call("switch",e?"turn_on":"turn_off",{entity_id:i})}_toggleFan(t,e){const i=this.entities[t];i&&this._call("fan",e?"turn_on":"turn_off",{entity_id:i})}_setFanPreset(t,e){const i=this.entities[t];i&&this._call("fan","set_preset_mode",{entity_id:i,preset_mode:e})}render(){if(!this.hass||!this._config)return K;const t=this._renderError();return L`
      <ha-card>
        <div class="card">
          ${this._renderHeader()}
          ${t??this._sections.map(t=>this._renderSection(t))}
        </div>
      </ha-card>
    `}_renderError(){const t=this._config.entity;if(t&&!this.hass.states[t]&&!this.hass.entities?.[t])return L`<div class="error-text">
        ${this._t("error.entity_not_found",{entity:t})}
      </div>`;const e=It(this.hass,this._config);return!(!e||!this.hass.states[e]&&!this.hass.entities?.[e])||0!==Object.keys(this.entities).length?null:L`<div class="error-text">${this._t("error.no_entities")}</div>`}_renderSection(t){const e=this._renderSectionBody(t);if(e===K)return K;if("status"===t)return L`<div class="section">${e}</div>`;const i=this._isExpanded(t),n=i?null:this._sectionSummary(t);return L`
      <div class="section collapsible ${i?"expanded":"collapsed"}">
        <div class="section-header">
          <button
            class="section-toggle"
            aria-expanded=${String(i)}
            @click=${()=>this._toggleSection(t)}
          >
            <ha-icon
              class="chevron"
              icon=${i?"mdi:chevron-down":"mdi:chevron-right"}
            ></ha-icon>
            <span class="section-title">${this._t(Ft[t])}</span>
          </button>
          ${n?L`<span
                class="section-summary ${n.entityId?"clickable":""}"
                role=${n.entityId?"button":K}
                tabindex=${n.entityId?"0":K}
                @click=${n.entityId?()=>this._moreInfo(n.entityId):K}
                @keydown=${n.entityId?t=>this._onClickableKey(t,n.entityId):K}
                >${n.text}</span
              >`:K}
        </div>
        ${i?e:K}
      </div>
    `}_sectionSummary(t){switch(t){case"climate":{const t=this._entity("climate")?.attributes.temperature;return"number"!=typeof t?null:{text:`${Rt(t,1,this._lang)}°C`,entityId:this.entities.climate}}case"temperatures":{const t=this._entity("climate")?.attributes.current_temperature??Ut(this._entity("room_temperature"));return null==t?null:{text:`${Rt(t,1,this._lang)}°C`,entityId:this.entities.room_temperature??this.entities.climate}}case"fans":{const t=Dt.map(t=>this._entity(t)).filter(t=>!!t);if(!t.length)return null;const e=t.filter(t=>"on"===t.state).length;return{text:`${e}/${t.length}`,entityId:this.entities.multiair_1}}case"consumption":{const t=this._entity("pellets_total_kg");return qt(t)?{text:`${Rt(Ut(t),0,this._lang)} kg`,entityId:this.entities.pellets_total_kg}:null}case"mechanics":{const t=this._entity("fan_speed_rpm");return qt(t)?{text:`${Rt(Ut(t),0,this._lang)} rpm`,entityId:this.entities.fan_speed_rpm}:null}case"bridge":{const t=this._entity("wifi_rssi");if(qt(t))return{text:`${Rt(Ut(t),0,this._lang)} dBm`,entityId:this.entities.wifi_rssi};const e=this._entity("connected");return e?{text:this._t(zt(e)?"badge.connected":"badge.offline"),entityId:this.entities.connected}:null}case"schedule":{const t=this._entity("heating_schedule");return t?{text:this._t("on"===t.state?"caption.enabled":"caption.disabled"),entityId:this.entities.heating_schedule}:null}default:return null}}_renderSectionBody(t){switch(t){case"status":return this._renderStatus();case"climate":return this._renderClimate();case"temperatures":return this._renderTemperatures();case"fans":return this._renderFans();case"consumption":return this._renderConsumption();case"mechanics":return this._renderMechanics();case"bridge":return this._renderBridge();case"schedule":return this._renderSchedule();default:return K}}_renderHeader(){const t=this._device(),e=this._config.title||t?.name_by_user||t?.name||this._t("card.default_title"),i=t?.model,n=this._entity("connected"),s=this._entity("burning"),o=this._entity("problem"),a=this._entity("hopper_lid");return L`
      <div class="header">
        <ha-icon
          icon="mdi:fire"
          style="color: var(--state-climate-heat-color, #ff6d00); --mdc-icon-size: 28px"
        ></ha-icon>
        <div class="header-title">
          <span class="name">${e}</span>
          ${i?L`<span class="model">${i}</span>`:K}
        </div>
        <div class="badges">
          ${n?L`<span class="badge ${zt(n)?"ok":"alarm"}">
                <ha-icon icon=${zt(n)?"mdi:lan-connect":"mdi:lan-disconnect"}></ha-icon>
                ${this._t(zt(n)?"badge.connected":"badge.offline")}
              </span>`:K}
          ${zt(s)?L`<span class="badge ok">
                <ha-icon icon="mdi:fire"></ha-icon>${this._t("badge.flame")}
              </span>`:K}
          ${zt(a)?L`<span class="badge warn">
                <ha-icon icon="mdi:tray-arrow-up"></ha-icon>${this._t("badge.hopper_open")}
              </span>`:K}
          ${zt(o)?L`<span class="badge alarm">
                <ha-icon icon="mdi:alert"></ha-icon>${this._t("badge.error")}
              </span>`:K}
        </div>
      </div>
    `}_renderStatus(){const t=this._entity("stove_state"),e=this._entity("climate");if(!t&&!e)return K;const i=(n=t?.state,n&&n in yt?yt[n]:vt);var n;const s=e?.attributes.current_temperature??Ut(this._entity("room_temperature")),o=e?.attributes.temperature??null,a=this.entities.room_temperature??this.entities.climate,r=this.entities.climate,c=this.entities.stove_state;return L`
      <div class="status">
        ${t?L`<span
              class="state-chip tone-${i.tone} ${i.burning?"flame":""} clickable"
              role="button"
              tabindex="0"
              @click=${()=>this._moreInfo(c)}
              @keydown=${t=>this._onClickableKey(t,c)}
            >
              <ha-icon icon=${i.icon}></ha-icon>
              <span class="label">${this._stateLabel(t,i.labelKey)}</span>
            </span>`:K}
        <div class="temps">
          <div
            class="temp clickable"
            role="button"
            tabindex="0"
            @click=${()=>this._moreInfo(a)}
            @keydown=${t=>this._onClickableKey(t,a)}
          >
            <span class="value">${Rt(s,1,this._lang)}°C</span>
            <span class="caption">${this._t("caption.ambient")}</span>
          </div>
          ${null!==o?L`<div
                class="temp clickable"
                role="button"
                tabindex="0"
                @click=${()=>this._moreInfo(r)}
                @keydown=${t=>this._onClickableKey(t,r)}
              >
                <span class="value">${Rt(o,1,this._lang)}°C</span>
                <span class="caption">${this._t("caption.target")}</span>
              </div>`:K}
        </div>
      </div>
    `}_renderClimate(){const t=this._entity("climate");if(!t)return K;const e="heat"===t.state,i=t.attributes.temperature??null,n=t.attributes.preset_mode??null,s=t.attributes.preset_modes??["manual","auto","comfort"];return L`
      <div class="section-body">
        <div class="row wrap">
          ${this._controls?L`<button class=${e?"":"primary"} @click=${()=>this._setHvac(!e)}>
                <ha-icon icon="mdi:power"></ha-icon>
                ${this._t(e?"button.stop":"button.start")}
              </button>`:L`<span class="muted"
                >${this._t(e?"caption.running":"caption.stopped")}</span
              >`}
          <div class="temp-adjust">
            ${this._controls?L`<button
                  class="icon"
                  aria-label=${this._t("aria.decrease_target")}
                  @click=${()=>this._adjustTemp(-1)}
                >
                  <ha-icon icon="mdi:minus" aria-hidden="true"></ha-icon>
                </button>`:K}
            <span class="consigne">${Rt(i,1,this._lang)}°C</span>
            ${this._controls?L`<button
                  class="icon"
                  aria-label=${this._t("aria.increase_target")}
                  @click=${()=>this._adjustTemp(1)}
                >
                  <ha-icon icon="mdi:plus" aria-hidden="true"></ha-icon>
                </button>`:K}
          </div>
        </div>
        <div class="row wrap">
          <span class="muted">${this._t("caption.mode")}</span>
          ${this._controls?s.map(t=>L`<button
                  class="segment ${n===t?"selected":""}"
                  @click=${()=>this._setPreset(t)}
                >
                  ${this._presetLabel(t)}
                </button>`):L`<span>${n?this._presetLabel(n):"—"}</span>`}
        </div>
        ${this._renderPower()}
      </div>
    `}_renderPower(){const t=this._entity("heating_power"),e=this._entity("power_actual_percent");if(!t&&!e)return K;const i=Ut(t),n=Ut(e),s=n??i,o=Number(t?.attributes.min??30),a=Number(t?.attributes.max??100),r=Number(t?.attributes.step??5),c=i??o;return L`
      <div class="slider-row">
        ${this._controls&&t?L`<input
              type="range"
              min=${o}
              max=${a}
              step=${r}
              .value=${String(c)}
              @change=${t=>this._setNumber("heating_power",Number(t.target.value))}
            />`:L`<div class="progress">
              <span style="width: ${s??0}%"></span>
            </div>`}
        <div class="caption">
          <span>${this._t("caption.power")}</span>
          <span>
            ${Rt(s,0,this._lang)} %${null!==n&&null!==i&&n!==i?L` <span class="muted"
                  >${this._t("caption.power_set",{value:Rt(i,0,this._lang)})}</span
                >`:K}
          </span>
        </div>
      </div>
    `}_renderTemperatures(){const t=[],e=this._entity("room_temperature"),i=this._entity("combustion_temperature"),n=this._entity("board_temperature");return qt(e)&&t.push(this._tile("mdi:home-thermometer",`${Rt(Ut(e),1,this._lang)} °C`,this._t("caption.ambient"),this.entities.room_temperature,"warm")),qt(i)&&t.push(this._tile("mdi:fire",`${Rt(Ut(i),0,this._lang)} °C`,this._t("caption.combustion"),this.entities.combustion_temperature,"heat")),qt(n)&&t.push(this._tile("mdi:chip",`${Rt(Ut(n),0,this._lang)} °C`,this._t("caption.board"),this.entities.board_temperature,"warm")),t.length?L`<div class="tiles">${t}</div>`:K}_renderFans(){const t=Dt.map(t=>({role:t,entity:this._entity(t)})).filter(t=>t.entity);return t.length?L`<div class="section-body">
      ${t.map(t=>this._renderFan(t.role,t.entity))}
    </div>`:K}_renderFan(t,e){const i="on"===e.state,n=e.attributes.preset_mode??"auto",s="multiair_1"===t?"multiair_1_area":"multiair_2_area",o=this._entity(s),a=Ut(o);return L`
      <div class="fan">
        <div class="fan-head">
          <ha-icon class=${i?"spin":""} icon="mdi:fan"></ha-icon>
          <span class="name">${this._entityName(e,t)}</span>
          <span class="spacer"></span>
          ${this._controls?L`<button
                class="icon"
                aria-label=${`${this._entityName(e,t)} — ${this._t(i?"aria.disable":"aria.enable")}`}
                @click=${()=>this._toggleFan(t,!i)}
              >
                <ha-icon
                  icon=${i?"mdi:toggle-switch":"mdi:toggle-switch-off-outline"}
                  aria-hidden="true"
                ></ha-icon>
              </button>`:L`<span class="muted"
                >${this._t(i?"caption.fan_on":"caption.fan_off")}</span
              >`}
        </div>
        ${i?L`<div class="row wrap">
              ${xt.map(e=>L`<button
                  class="segment ${n===e?"selected":""}"
                  @click=${()=>this._setFanPreset(t,e)}
                >
                  ${"auto"===e?this._t("preset.auto"):e}
                </button>`)}
            </div>`:K}
        ${o&&this._controls?L`<div class="slider-row">
              <input
                type="range"
                min=${Number(o.attributes.min??-30)}
                max=${Number(o.attributes.max??30)}
                step=${Number(o.attributes.step??5)}
                .value=${String(a??0)}
                @change=${t=>this._setNumber(s,Number(t.target.value))}
              />
              <div class="caption">
                <span>${this._t("caption.trim")}</span>
                <span
                  >${null!==a&&a>0?"+":""}${Rt(a,0,this._lang)}
                  %</span
                >
              </div>
            </div>`:K}
      </div>
    `}_renderConsumption(){const t=this._entity("pellets_total_kg"),e=this._entity("pellet_hours"),i=this._entity("service_countdown_kg"),n=[];qt(t)&&n.push(this._tile("mdi:fire-circle",`${Rt(Ut(t),0,this._lang)} kg`,this._t("caption.pellets"),this.entities.pellets_total_kg,"heat")),qt(e)&&n.push(this._tile("mdi:clock-outline",`${Rt(Ut(e),0,this._lang)} h`,this._t("caption.operating_hours"),this.entities.pellet_hours,"teal"));let s=K;if(qt(i)){const t=Ut(i),e=this._serviceInterval(),n=(a=e,null===(o=t)||!Number.isFinite(o)||a<=0?null:Math.max(0,Math.min(100,o/a*100))),r=function(t){return null===t?"ok":t<10?"danger":t<25?"warn":"ok"}(n);s=L`
        <div
          class="slider-row clickable"
          role="button"
          tabindex="0"
          @click=${()=>this._moreInfo(this.entities.service_countdown_kg)}
          @keydown=${t=>this._onClickableKey(t,this.entities.service_countdown_kg)}
        >
          <div class="progress">
            <span class="${"ok"===r?"":r}" style="width: ${n??0}%"></span>
          </div>
          <div class="caption">
            <span>${this._t("caption.service")}</span>
            <span
              >${this._t("caption.service_remaining",{value:Rt(t,0,this._lang)})}</span
            >
          </div>
        </div>
      `}var o,a;return n.length||s!==K?L`<div class="section-body">
      ${n.length?L`<div class="tiles">${n}</div>`:K} ${s}
    </div>`:K}_renderMechanics(){const t=[],e=this._entity("fan_speed_rpm"),i=this._entity("auger_speed_rpm"),n=this._entity("air_flaps_percent"),s=this._entity("air_flaps_target_percent");if(qt(e)&&t.push(this._tile("mdi:fan",`${Rt(Ut(e),0,this._lang)} rpm`,this._t("caption.draft"),this.entities.fan_speed_rpm,"cool")),qt(i)&&t.push(this._tile("mdi:screw-machine-flat-top",`${Rt(Ut(i),0,this._lang)} rpm`,this._t("caption.auger"),this.entities.auger_speed_rpm,"cool")),qt(n)){const e=Ut(s),i=null!==e?this._t("caption.flaps_target",{value:Rt(e,0,this._lang)}):this._t("caption.flaps");t.push(this._tile("mdi:air-filter",`${Rt(Ut(n),0,this._lang)} %`,i,this.entities.air_flaps_percent,"cool"))}return t.length?L`<div class="tiles">${t}</div>`:K}_renderBridge(){const t=[],e=this._entity("wifi_rssi"),i=this._entity("uptime_seconds"),n=this._entity("connected");if(qt(e)){const i=Ut(e),n=function(t){return null===t?{key:"quality.none",level:0}:t>=-50?{key:"quality.excellent",level:4}:t>=-60?{key:"quality.good",level:3}:t>=-70?{key:"quality.fair",level:2}:t>=-80?{key:"quality.weak",level:1}:{key:"quality.very_weak",level:0}}(i),s=this._t(n.key),o=n.level>=3?"ok":2===n.level?"fair":"weak",a=this.entities.wifi_rssi;t.push(L`<div
        class="tile clickable"
        role="button"
        tabindex="0"
        @click=${()=>this._moreInfo(a)}
        @keydown=${t=>this._onClickableKey(t,a)}
      >
        <span class="bars tone-${o}" title="${s}" aria-hidden="true">
          ${[1,2,3,4].map(t=>L`<i class="${t<=n.level?"on":""}"></i>`)}
        </span>
        <div class="body">
          <span class="value">${Rt(i,0,this._lang)} dBm</span>
          <span class="caption">${this._t("caption.wifi",{quality:s})}</span>
        </div>
      </div>`)}return qt(i)&&t.push(this._tile("mdi:timer-outline",function(t,e=Ct.en){if(null===t||!Number.isFinite(t)||t<0)return"—";const i=Math.floor(t/86400),n=Math.floor(t%86400/3600),s=Math.floor(t%3600/60);return i>0?`${i} ${e.days} ${n} ${e.hours}`:n>0?`${n} ${e.hours} ${s} ${e.minutes}`:`${s} ${e.minutes}`}(Ut(i),Ct[this._lang]),this._t("caption.uptime"),this.entities.uptime_seconds,"cool")),n&&t.push(this._tile(zt(n)?"mdi:lan-connect":"mdi:lan-disconnect",this._t(zt(n)?"badge.connected":"badge.offline"),this._t("caption.link"),this.entities.connected,zt(n)?"link":"alarm")),t.length?L`<div class="tiles">${t}</div>`:K}_renderSchedule(){const t=this._entity("heating_schedule"),e=this._entity("frost_protection");return t||e?L`<div class="tiles">
      ${this._renderSwitchRow("heating_schedule","switch.heating_schedule","mdi:calendar-clock","schedule")}
      ${this._renderSwitchRow("frost_protection","switch.frost_protection","mdi:snowflake","frost")}
    </div>`:K}_renderSwitchRow(t,e,i,n){const s=this._entity(t);if(!s)return K;const o="on"===s.state;return L`<div class="tile">
      <ha-icon class="tone-${n}" icon=${i}></ha-icon>
      <div class="body">
        <span class="value">${this._t(e)}</span>
        <span class="caption"
          >${this._t(o?"caption.enabled":"caption.disabled")}</span
        >
      </div>
      <span class="spacer"></span>
      <button
        class="icon"
        aria-label=${`${this._t(e)} — ${this._t(o?"aria.disable":"aria.enable")}`}
        ?disabled=${!this._controls}
        @click=${()=>this._toggleSwitch(t,!o)}
      >
        <ha-icon
          icon=${o?"mdi:toggle-switch":"mdi:toggle-switch-off-outline"}
          aria-hidden="true"
        ></ha-icon>
      </button>
    </div>`}_tile(t,e,i,n,s){return L`<div
      class="tile ${n?"clickable":""}"
      role=${n?"button":K}
      tabindex=${n?"0":K}
      @click=${n?()=>this._moreInfo(n):K}
      @keydown=${n?t=>this._onClickableKey(t,n):K}
    >
      <ha-icon class=${s?`tone-${s}`:K} icon=${t}></ha-icon>
      <div class="body">
        <span class="value">${e}</span>
        <span class="caption">${i}</span>
      </div>
    </div>`}};Lt.styles=jt,t([pt({attribute:!1})],Lt.prototype,"hass",void 0),t([ut()],Lt.prototype,"_config",void 0),t([ut()],Lt.prototype,"_states",void 0),t([ut()],Lt.prototype,"_sectionOverrides",void 0),Lt=t([lt("open-firenet-card")],Lt),window.customCards=window.customCards||[],window.customCards.push({type:"open-firenet-card",name:"Open Firenet",description:"RIKA pellet stove via the Open Firenet bridge",preview:!0,documentationURL:"https://github.com/openfirenet/open-firenet-card",getEntitySuggestion:(t,e)=>t?.entities?.[e]?.platform!==ft?null:e.startsWith("climate.")?{config:{type:"custom:open-firenet-card",entity:e}}:null}),console.info("%c OPEN-FIRENET-CARD %c v0.1.0 ","color:#fff;background:#ff6d00;font-weight:700;border-radius:4px 0 0 4px;","color:#ff6d00;background:transparent;font-weight:700;border-radius:0 4px 4px 0;");export{Lt as OpenFirenetCard};
