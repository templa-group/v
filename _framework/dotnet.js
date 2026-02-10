//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"c2435c3e0f46de784341ac3ed62863ce77e117b4",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "TemplaGroup.Web",
  "resources": {
    "hash": "sha256-6uzMiipPw5vKy6+pUBjidlzXLn9o6Bm7nPLJY8aSBhs=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.69poregybn.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.q5rqv3xrhm.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.2mv1pqdd2n.wasm",
        "integrity": "sha256-tjie09uavTiX1TnkP9OL+OcnxCOs44ff5Dgws1rnAnc=",
        "cache": "force-cache"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt.dat",
        "name": "icudt.oh1zvcfom8.dat",
        "integrity": "sha256-tO5O5YzMTVSaKBboxAqezOQL9ewmupzV2JrB5Rkc8a4=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.j8lpl2s77b.wasm",
        "integrity": "sha256-wzRukJqBoTl/PAS/dQVMwXd/A2xE+Q95UM1xYhfmvmI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.zznlyd9wgx.wasm",
        "integrity": "sha256-QU0rNli4Xf74GT4/GYoo4vyty+f1zU/dQH2eSAzv+eQ=",
        "cache": "force-cache"
      }
    ],
    "assembly": [
      {
        "virtualPath": "Blazor.Extensions.Canvas.JS.wasm",
        "name": "Blazor.Extensions.Canvas.JS.iokb7a5y98.wasm",
        "integrity": "sha256-ctyeKHsvFswpiKQJpTUUWdSrDGr4UNirukOrWYnwW78=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Blazor.Extensions.Canvas.wasm",
        "name": "Blazor.Extensions.Canvas.45bjdsigtk.wasm",
        "integrity": "sha256-2AOrAB5tgoiK9wMMmwiE/pKPAtTjzgFudxSl6g4dt9s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BlazorDownloadFile.wasm",
        "name": "BlazorDownloadFile.ct05c4bfyq.wasm",
        "integrity": "sha256-YB8HlaKSU6hGhkiMwSSlwRa4MDljnOAAmxBFTAqQWes=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Blazored.FluentValidation.wasm",
        "name": "Blazored.FluentValidation.x0xsecpmtx.wasm",
        "integrity": "sha256-MSQuUWmw/uBMui2/n4kdEKi0h5j0G+EuO1sM6KK6ltM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Blazored.LocalStorage.wasm",
        "name": "Blazored.LocalStorage.12n6dz54qr.wasm",
        "integrity": "sha256-OaMAAd5n7ORfyur5e3QIyEVKJ76MKIvwbg7/icnnYcU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BouncyCastle.Cryptography.wasm",
        "name": "BouncyCastle.Cryptography.6qnbenkd0k.wasm",
        "integrity": "sha256-IqnVnhA0e0WF9/Ufx8/JIbwvVOGRIsbVT0pJuf86K70=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ClosedXML.wasm",
        "name": "ClosedXML.6d8ybop3kc.wasm",
        "integrity": "sha256-Jga3CUuNfwvpwnsHZxpWURvivrlrEqnUo9XR5EOLYGc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ClosedXML.Parser.wasm",
        "name": "ClosedXML.Parser.kcd8ka7nog.wasm",
        "integrity": "sha256-bN619zkNwVyqGT2tFn5NMXPDIo3OUVaRYMG/tXRtn+A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "DocumentFormat.OpenXml.wasm",
        "name": "DocumentFormat.OpenXml.cnsfjef601.wasm",
        "integrity": "sha256-OGbd3GR6zlbfGBnwx2pWFKJ8C1TH5aodZsSwSfv77bw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "DocumentFormat.OpenXml.Framework.wasm",
        "name": "DocumentFormat.OpenXml.Framework.jmsgheld7m.wasm",
        "integrity": "sha256-6y0ZpvnY/VABbQgCFyD++WQFrA3Zw7CjRwPRpSU7Sw8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ExcelNumberFormat.wasm",
        "name": "ExcelNumberFormat.zkc9yronjy.wasm",
        "integrity": "sha256-DWrWJf+NGbjj12iqpO+Ufl4YS0bkW1yz6JwjocU15wY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "FluentValidation.wasm",
        "name": "FluentValidation.a26tmul8eq.wasm",
        "integrity": "sha256-Dt7DBDag97mASqcSTSWerTCmGMiE8QnbGYMRbfGmqvQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Havit.Blazor.Components.Web.wasm",
        "name": "Havit.Blazor.Components.Web.ftof5qtdxk.wasm",
        "integrity": "sha256-YwhfcJJum9xUBfW0BeTAEGJIgCx1304mzSTZTIeYiqU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Havit.Blazor.Components.Web.Bootstrap.wasm",
        "name": "Havit.Blazor.Components.Web.Bootstrap.noz5ir5b1a.wasm",
        "integrity": "sha256-GQ7+9/crqiGILrkMd1+ApzclmuYxgZaenNPKb95XCJg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Havit.Core.wasm",
        "name": "Havit.Core.4qyda8ko3l.wasm",
        "integrity": "sha256-DJuJL20B6ScSb6jls77CtQnhKiDNygSFkNe+SRzeY5Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.barcodes.wasm",
        "name": "itext.barcodes.krmk9ilev7.wasm",
        "integrity": "sha256-wE6MKtg6rP3ngHNzaVBRAmB5D/93y8XH3+SVbGAEyoo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.bouncy-castle-connector.wasm",
        "name": "itext.bouncy-castle-connector.ekfkk5wm8j.wasm",
        "integrity": "sha256-ztMzZIB8BCMBYgFPT8ihq6nGt/eo0EL1PMq6LL6Dolw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.forms.wasm",
        "name": "itext.forms.6xv36uu3cd.wasm",
        "integrity": "sha256-WmKKQ1nr9t09a/Rg382dJ8itfsukHhwRYLYmg7ecD/k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.io.wasm",
        "name": "itext.io.i15se22plk.wasm",
        "integrity": "sha256-eoG4Q44Z1gaW8FbLd3QeWr94445rKD0jvAjRVBvC6iA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.kernel.wasm",
        "name": "itext.kernel.7pkxr3b04j.wasm",
        "integrity": "sha256-9YG+r4UzvPKBjsk7qpZ6sEN+RsfEOWfTFdrBSek33Z0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.layout.wasm",
        "name": "itext.layout.e5mbzapctp.wasm",
        "integrity": "sha256-HsCnY5shqdvk22B6fOXeB/UVfCHu4+dH9ACSlkpnc54=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.pdfa.wasm",
        "name": "itext.pdfa.hhe84zblae.wasm",
        "integrity": "sha256-qyTMDT/LrzXOvyVQBvryLN6R3ChsuFXjP6EDXbhHwak=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.pdfua.wasm",
        "name": "itext.pdfua.kjwgpox1rf.wasm",
        "integrity": "sha256-wHHytXFI22IIj2QzQ3cIheCusaJsAWdJ94t3yF2qx8s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.sign.wasm",
        "name": "itext.sign.ap35o7megt.wasm",
        "integrity": "sha256-Aupjt6XAE0yeZpdakxKlnvyfvX3eH9afwoH8pxZ4AOs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.styledxmlparser.wasm",
        "name": "itext.styledxmlparser.zv5d34nx7w.wasm",
        "integrity": "sha256-D4Joqxuxaa4gNsh5CIHd1O948QyOidpemXFdR56LXgI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.svg.wasm",
        "name": "itext.svg.paka06fpxb.wasm",
        "integrity": "sha256-QY3KcG9kzqY4CG3nrphBWehW8/P15oc17XgGRpvePDY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.bouncy-castle-adapter.wasm",
        "name": "itext.bouncy-castle-adapter.2y676al523.wasm",
        "integrity": "sha256-FiOFUzty9djcwplPjDmHfJthQP1bZ9aXt5ghe9Ae7Eo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.commons.wasm",
        "name": "itext.commons.r7wq6zq46n.wasm",
        "integrity": "sha256-aQjckEyo48P6IOCoTZl6uHRtEZHvxSUKREczpEXw84M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.html2pdf.wasm",
        "name": "itext.html2pdf.y9359j6ce3.wasm",
        "integrity": "sha256-1tQDtw5UiHtJRcfpT0ydnMH91UM5cBiyfHUS8R4IeJ4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Authentication.Abstractions.wasm",
        "name": "Microsoft.AspNetCore.Authentication.Abstractions.teru10q8m9.wasm",
        "integrity": "sha256-u9iMOIltdEH1f+auTSi7mcb4SBt2memdjfBRiDl2cNE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Authentication.Core.wasm",
        "name": "Microsoft.AspNetCore.Authentication.Core.l492rjm8e2.wasm",
        "integrity": "sha256-S96sUCfsiAOsFNAIXVIoQxD2c9vDi2/CgduV5nEHYOs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Authorization.wasm",
        "name": "Microsoft.AspNetCore.Authorization.w8oi6191z0.wasm",
        "integrity": "sha256-wHol1gYsnimRhtsiPvHK2Ou1iDtdh79Qz1kEFAFGQTQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.bnm6dydgt2.wasm",
        "integrity": "sha256-J30oY9YtLNcG2XYnMrXoLsFES7CuFEM/X6tV6a+M7aU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Authorization.wasm",
        "name": "Microsoft.AspNetCore.Components.Authorization.k6gm8k9c6a.wasm",
        "integrity": "sha256-bGPSP/p5paBQFfND52j5RdXPShRKUubjCwJZVqQqAh0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.DataAnnotations.Validation.wasm",
        "name": "Microsoft.AspNetCore.Components.DataAnnotations.Validation.elz03823ys.wasm",
        "integrity": "sha256-Mpd98aRLb9cK/TLwAqYub55BwBvzDAyJs18h1O7jIqk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.q5whxxbesu.wasm",
        "integrity": "sha256-DtIaAxnZGwg2srHQFXVjXHRVUjDGckJbtJa8QkW2xrU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.weol5f2w2h.wasm",
        "integrity": "sha256-2E+bHyTCqJEZy7+Ycrb8bDZR6f1H128uu7DVSWzV9k0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.9zgk16s1mb.wasm",
        "integrity": "sha256-C/Sxppv2BLPTLapfnFy3j2zdfe07iYPVTc4MjMFqr4E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Cryptography.Internal.wasm",
        "name": "Microsoft.AspNetCore.Cryptography.Internal.8551i0trzc.wasm",
        "integrity": "sha256-TLLmP2AYJbtN1r4jkqPEReslZfP/+hZN84JGwVwdw/w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.DataProtection.wasm",
        "name": "Microsoft.AspNetCore.DataProtection.ys04bshj89.wasm",
        "integrity": "sha256-7ndOXDg8pCLF2jK1wBCfaRPWFmVKKiwRFpsCGx8jho8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.DataProtection.Abstractions.wasm",
        "name": "Microsoft.AspNetCore.DataProtection.Abstractions.t6w8xzjp3y.wasm",
        "integrity": "sha256-Cw6KOd+hfDeq/5Ic3WC3D0R/jcmdOhwjpOg58SpptvU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.wasm",
        "name": "Microsoft.AspNetCore.Http.f0vd9tuzrq.wasm",
        "integrity": "sha256-P7u++4zIBAR6s/X8yOsyscat1H9SsWsnAnBNrm4OxlA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.Abstractions.wasm",
        "name": "Microsoft.AspNetCore.Http.Abstractions.5jy9omvvsv.wasm",
        "integrity": "sha256-7wgz1ZHwXmXV8y00xn+jT4BGeuCQQbVYGQl+PNvBfnQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.Extensions.wasm",
        "name": "Microsoft.AspNetCore.Http.Extensions.57zig84vjd.wasm",
        "integrity": "sha256-sbIJEHnGL6std1HkIJ83mfNTk5yznrGRZbaacPDI5w4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.Features.wasm",
        "name": "Microsoft.AspNetCore.Http.Features.pqxjsc5k5q.wasm",
        "integrity": "sha256-bzIPAVp+XhD63CRn9cVTB4tJRU+oDEAuwFYoHytMhUk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Metadata.wasm",
        "name": "Microsoft.AspNetCore.Metadata.3r3zqbthjz.wasm",
        "integrity": "sha256-QYzxgbZC9Dq7j0jsCLrsG4Sby1M3tOj5spGdG/iXu+A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.WebUtilities.wasm",
        "name": "Microsoft.AspNetCore.WebUtilities.3iepfijnwt.wasm",
        "integrity": "sha256-VQM0rTyQ42zNsi2Mfz/XlOZsi4F4HQ5RrZnGIJaRhjI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.DotNet.PlatformAbstractions.wasm",
        "name": "Microsoft.DotNet.PlatformAbstractions.l5f1k5rpem.wasm",
        "integrity": "sha256-+bp3smw6HF4P5NLzNAbp7j/Fzp163jJn8MhPIgaJpu0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.islleo5tb2.wasm",
        "integrity": "sha256-kh/h7Ot+MhEaovr62aW6ceoECJFiMMBhPys9BPzuuG0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.0lwh9y8dte.wasm",
        "integrity": "sha256-NPAzdv7uVEV2AXdi6QA3M6eRIEug1ft/2LNbzZh8O00=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Binder.wasm",
        "name": "Microsoft.Extensions.Configuration.Binder.glikdfh4j6.wasm",
        "integrity": "sha256-JHSfkCzHtR0jCfn6AGqoHEFHrxF3X/3ctxeCggfLQLw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.0ggmgj2vay.wasm",
        "integrity": "sha256-wBiOHkd/E/89OI1k25jtFh60j87vpkrZKuH7dB45/Xo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.gjczytiryp.wasm",
        "integrity": "sha256-xP8kRU+zBWbJzvrGq1jzVr/yImPdh6I02pek4swvMh8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.bm6362xy7c.wasm",
        "integrity": "sha256-Q+ItCMfmSa81Zw20w8Mmz6zT1W4bs/dxUwWFo6XNgMg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyModel.wasm",
        "name": "Microsoft.Extensions.DependencyModel.zdp1aopd0u.wasm",
        "integrity": "sha256-x7DaGuO1ymR33gWsMyg1G10IlzKBMmnPMFaA7S3T+l0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.wasm",
        "name": "Microsoft.Extensions.Diagnostics.cook70eu9j.wasm",
        "integrity": "sha256-7IBVcXX/waosOaegaC8xzkWm4ECU0iys9RBzXbPsTKc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.Abstractions.wasm",
        "name": "Microsoft.Extensions.Diagnostics.Abstractions.7ngihc9qna.wasm",
        "integrity": "sha256-w5WJ6U2mJJkNzWnWL9OWC+9RVT6HjWGeDNpfdIOf/0k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Abstractions.wasm",
        "name": "Microsoft.Extensions.FileProviders.Abstractions.y27tabajob.wasm",
        "integrity": "sha256-5oC81oYici7QRvdII/DoJ5A4ujg5Af3QdbAEUdPTfQU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Hosting.Abstractions.wasm",
        "name": "Microsoft.Extensions.Hosting.Abstractions.s21dxqlq6v.wasm",
        "integrity": "sha256-TICT8MhobQfeuWtQlDx4UnTwwyEHZ7yXMgFC3AiHRjA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Http.wasm",
        "name": "Microsoft.Extensions.Http.tqvcbbud9x.wasm",
        "integrity": "sha256-S71docim63CO1RBA2Ze4z+/rRNt8KN27n/rEFxJqPy0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Http.Polly.wasm",
        "name": "Microsoft.Extensions.Http.Polly.wm1typofnf.wasm",
        "integrity": "sha256-eKw3i+ZFdxCu9HZ90G+XEBuepRgP+idawTjVgdu4TUo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.wasm",
        "name": "Microsoft.Extensions.Localization.xcslyy3nju.wasm",
        "integrity": "sha256-L2P/tLhZ6FSR1KG27vIE/jer8JBjOAPRMf7D9eFEUNs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.Abstractions.wasm",
        "name": "Microsoft.Extensions.Localization.Abstractions.i8jj5qmkq0.wasm",
        "integrity": "sha256-IhWVlPM+pewfxZ7IAoBGHBX45KJcmJ+lmwv0ChWAbJg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.pg1opeeijo.wasm",
        "integrity": "sha256-l9GSQOmhpmL7QTgaMyKXoaREGsgO3HEmmklnwYV5K9c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.vlsx557n2v.wasm",
        "integrity": "sha256-7WdTB11cGv6S7/4bT26N/5CZpTRPoUwMDGHdNu/6ypY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Configuration.wasm",
        "name": "Microsoft.Extensions.Logging.Configuration.97y7ln5z8w.wasm",
        "integrity": "sha256-5amqC47Un597HeB4ucTByX1lCe8sTdr7yi+2EOZBbcU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.ObjectPool.wasm",
        "name": "Microsoft.Extensions.ObjectPool.xhqcekhyre.wasm",
        "integrity": "sha256-JT/c72wU6RhbwA4gfnbJbOs+CGhbNuc/N02z4r+qQxA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.pga1qabqe8.wasm",
        "integrity": "sha256-Od17UAqglms4wiK7s1U89mvfTMrPvv5Q4aj76oArjnM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.ConfigurationExtensions.wasm",
        "name": "Microsoft.Extensions.Options.ConfigurationExtensions.3hnxonkz4a.wasm",
        "integrity": "sha256-6TaAMIhFjljYy3HOvOO3QN1MchUuDGHuraLRU2k+DNY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.mrli483c1v.wasm",
        "integrity": "sha256-shIOdniiJMMzDt9FlKzwC6KMRINNYL/9TH+Sp02KfkE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Validation.wasm",
        "name": "Microsoft.Extensions.Validation.9giqrw9cz9.wasm",
        "integrity": "sha256-FxV7TbDFBS7RXAV4/5soqWaZCeyEcXyIMR6uyiioecU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.74k74h5ocu.wasm",
        "integrity": "sha256-aeZZVWnJzwrSoXteUOkzwOVpy8HhvoflABp4hg10hV8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.ueym9qigbo.wasm",
        "integrity": "sha256-tsi5TRL5JoQsBTLJxLYo6bYRcvD2TccDiqLCDidLIXU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Net.Http.Headers.wasm",
        "name": "Microsoft.Net.Http.Headers.vhfw8f9f40.wasm",
        "integrity": "sha256-jfXK+cfJd/PteHB+5Bay/NDY9b9VLvVw6G/Bm262Lpo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Newtonsoft.Json.wasm",
        "name": "Newtonsoft.Json.jcjjiqe038.wasm",
        "integrity": "sha256-s8KVuknfxWl1cuDvQM/OnpBfnpM1rxzvzq21S1cF36U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ObjectsComparer.wasm",
        "name": "ObjectsComparer.mkcua83g4z.wasm",
        "integrity": "sha256-2srTiwySDPHQSgkfJbGC314bg1l6XNv7k9BSrtSH34U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Polly.wasm",
        "name": "Polly.edmxorbv1n.wasm",
        "integrity": "sha256-fjy1ix52+QqFaLZHRRfrWeTC3HzOC2RidJ1mm0syTbI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Polly.Core.wasm",
        "name": "Polly.Core.fevunzwumh.wasm",
        "integrity": "sha256-d13/POilQPI2HTBa5WjTCbZcWUsr8L2VBTNQdPN65vo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Polly.Extensions.Http.wasm",
        "name": "Polly.Extensions.Http.aamf4ift6v.wasm",
        "integrity": "sha256-bqX9l2dLJ0m0IilNsXvbO14i9Lx0oDeudAGIsS3kEAw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "RBush.wasm",
        "name": "RBush.048ali807d.wasm",
        "integrity": "sha256-cHsLmPL/ZYfNtaqW793aQui9cR4N7JXjHm+xggcoz7w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SixLabors.Fonts.wasm",
        "name": "SixLabors.Fonts.1ntl3xbxha.wasm",
        "integrity": "sha256-TYAwAMga8iYHgcD5+CMUwDAmCjtNUbzJJP6/e+Xtl5w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Packaging.wasm",
        "name": "System.IO.Packaging.0f9cehj3yy.wasm",
        "integrity": "sha256-rFyH3444dx4tr1BVh/Qb3ONc/0B0rmaIGNpgSv+GX/Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Pkcs.wasm",
        "name": "System.Security.Cryptography.Pkcs.8ub6nrvy5w.wasm",
        "integrity": "sha256-cLTdoCxqEGUNdffmKBbfCnMciXz+r7rGJAjl6e49v5Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Xml.wasm",
        "name": "System.Security.Cryptography.Xml.8nvfaryw4t.wasm",
        "integrity": "sha256-9AObrbGnZXFpiWZ3ulIcX7a00LnrZaigxvNxav3hFRE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Tavenem.Blazor.IndexedDB.wasm",
        "name": "Tavenem.Blazor.IndexedDB.xso27rslfk.wasm",
        "integrity": "sha256-EZ10nOqYD7MtxN94HB3WlSFcFfs5o7lzlQuNAEgbLAw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Tavenem.DataStore.wasm",
        "name": "Tavenem.DataStore.d21jns0ond.wasm",
        "integrity": "sha256-JfPlUqZhG+oggVae4pr/yWCRUcHmzEwrG4/68kuFLe4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.9lypvjip1n.wasm",
        "integrity": "sha256-o3m4q2DkrKmV7YaXwBJztFnqpFnRKmPRfTTHHUCnfiE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Registry.wasm",
        "name": "Microsoft.Win32.Registry.ijl8qztr56.wasm",
        "integrity": "sha256-DnU3VAZAooMh1FqK3H2aKcZpo9cTJZeP2Wum0+qzGZw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.AppContext.wasm",
        "name": "System.AppContext.zvss971z4c.wasm",
        "integrity": "sha256-P3a7wW5jWd1uAvIkiKkzwcS2t9jGdUi5NVH1DM8n7IM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Buffers.wasm",
        "name": "System.Buffers.euln0m9xp9.wasm",
        "integrity": "sha256-qkka44gOIEuAOJz/GQ/02HinJw60dZ1pfRONQxZvyPU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.xha0f0y9gk.wasm",
        "integrity": "sha256-JQQhIjmwjS9lVcKRTHlUE5OMQoBBxt7UVecuVcUeh5Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.e3y9zpejpe.wasm",
        "integrity": "sha256-JkTr+KcEx1/K0HUQsZN4fNA3j8M+NDx4dbxKn9sryjo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.ywhixhp162.wasm",
        "integrity": "sha256-zl/LKwXLE8X9//Ma9XsYGt8DiE4g9nU/xkJpW8z6EJA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.a0w9t9qdh6.wasm",
        "integrity": "sha256-thRIjY1TaxqSfaBmRgS1vUGJNXFkjedPxIWRaiDa4O4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.8oabvwvevs.wasm",
        "integrity": "sha256-OIYPot0n2JHrB5AW+QPq+f+JJFyjE+Lj/NkUiwZXXfA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.8dp12ve3vt.wasm",
        "integrity": "sha256-VAtB1HMg1qKCaSnyjFQnDQC1rS3T3+TBa8Jfn0Z74lc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.d4c8augzby.wasm",
        "integrity": "sha256-o84DEkIHO0qFOYQanQphucmJdclOwRIK1StX7IfmkIk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.cpgggzhwz0.wasm",
        "integrity": "sha256-kEQVZQJI5xcu6sqlUKSDZfx4CQlPDLPRGKxtlWjhEG8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.36gpd97ysv.wasm",
        "integrity": "sha256-5QA7+HkNwa6PHdzov3+8HYI+1xfkhcyzMm30jPvgeXE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.t294wnhjyh.wasm",
        "integrity": "sha256-C01fgTR3yirxGW7SNeM8Dgxxroo3zvfYxoeFQDoL8GQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.bamyaitb9a.wasm",
        "integrity": "sha256-UwfbT2oa0WofVVRyYeOKmo0tU1P3xoyDzdL50wqb7Oc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Debug.wasm",
        "name": "System.Diagnostics.Debug.0zarydf1oq.wasm",
        "integrity": "sha256-tKk6jUokW4T1khdEu5wfxAzKZ+uWy+1QxcZUrNUaiHM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.9dkyahvfkz.wasm",
        "integrity": "sha256-Y4Zpk2CpueOr1/JtAYHNKU5BGiECiZ7XBCsfh1AKksQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.FileVersionInfo.wasm",
        "name": "System.Diagnostics.FileVersionInfo.c1mkh4u3ms.wasm",
        "integrity": "sha256-kI3BV8M3qQpZXWGzm8fgvxu608Kfm1iV1jYmgDjIvjA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.v06ltxveqi.wasm",
        "integrity": "sha256-QR2uV/dp/iLZR0XaQiSXCtCbUdg7XtCVihv5Ji3XgZc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tools.wasm",
        "name": "System.Diagnostics.Tools.d1ym7jj8km.wasm",
        "integrity": "sha256-L+fV2kx9AJCVWgc77p3OX6nX1ptnC0fXZ7RGsSI1GXg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.dfu2l3idwe.wasm",
        "integrity": "sha256-d3jTYBSklGzEXlGTuQqzvxZ2PE0KrOOg6KkaAlsFCT0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.zw7h690ks1.wasm",
        "integrity": "sha256-U8xCwStnDMw/FbqoLwXgjgZ1qwoqmQl6Dy4F3BlhEtg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.8wgi7x9zvd.wasm",
        "integrity": "sha256-+P6iv9BqBaSzIMcl/QoNjmkXV39NyvncqPXZ1Ss7398=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.1cuz9n0w3t.wasm",
        "integrity": "sha256-rxbswzSEZF/flxNprTzaoWomY7PGaonsy9B2H+IX4Cs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.Brotli.wasm",
        "name": "System.IO.Compression.Brotli.b5g155e8r5.wasm",
        "integrity": "sha256-Ab+VtfS/5LPGApVr1uyjEtu08ydgJoekz9pc1sI7ANI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.gccgcwhkxe.wasm",
        "integrity": "sha256-gEGmO64bPH/c6OeYWHL1vG/EvRK2XC4FY4DVDRcNR5Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Primitives.wasm",
        "name": "System.IO.FileSystem.Primitives.u097hlyrsn.wasm",
        "integrity": "sha256-ktFuvqN7bWj+qaSYf8WNwxQmZEQhCGmw71HZuT7b1qM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.wasm",
        "name": "System.IO.FileSystem.bwef5sfrms.wasm",
        "integrity": "sha256-1UHS7sMiOAvkF4EU1eM5+S5CtVM5ve+6fgaYAZcRTgU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.8ecvghl4gq.wasm",
        "integrity": "sha256-gJSiexEhA2dWxt0L69ePbcrJItEf04Ihy43JniiSeVU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.uesbjrom4p.wasm",
        "integrity": "sha256-lqOZUCblCqg4QqGZwoRXNi7wT9Ud6blTONZm0ewjTZU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.wasm",
        "name": "System.IO.vkjyj673d6.wasm",
        "integrity": "sha256-YW33Z6F2mQ7kof99ImSW4bHXNIcNn9jAbi23487LvDU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.cal3g3bsvx.wasm",
        "integrity": "sha256-hDqUbGUi5KEd6VRj9mM+6HUYXD4w4rAuR/UGeDjTd+Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Parallel.wasm",
        "name": "System.Linq.Parallel.jjtup1xsap.wasm",
        "integrity": "sha256-D15vql7ye6UiTFTqpMQOYkzeQK19/Qxyrr9AQq01mxE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.uqyb8g3fnt.wasm",
        "integrity": "sha256-przdnjwofPslvGk0JNg0F4ThGCq8QKwV5ItyNEvtetA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.9dlubnc0uo.wasm",
        "integrity": "sha256-U9F45pCGaaik+IqN8namNKq1clLF8OM3O7wLZzGybFI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.mth5gp439o.wasm",
        "integrity": "sha256-ev1HUhu4X5FRbn+v5BmQ5wHqmL0stQK4KdKGOtIvN9M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.k829574fx6.wasm",
        "integrity": "sha256-lBSM8royhAFqr+/vMsDNXNi+PdR1u62GJd63UGtJzU8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Mail.wasm",
        "name": "System.Net.Mail.v6qyz81t9i.wasm",
        "integrity": "sha256-6dMz8coQPD/D8Erpi8GD/eTBf91fbbtBLrztarwrsCU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.fi1nf9h43c.wasm",
        "integrity": "sha256-mVXThPE95heboCKdU0IeFgrVustAZO9ADuYM67Z7tfQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.77qnzpnnfo.wasm",
        "integrity": "sha256-neQiSFBkzBq25HHElggs4An6aqRuFhW+R23apU2qf2Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.szbak3d78r.wasm",
        "integrity": "sha256-OGvDhUbIEWNdDZvf91dT9Xyq2OAtGD7DLKlTYGpi6SA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.wasm",
        "name": "System.Net.WebSockets.lu0tjhgio7.wasm",
        "integrity": "sha256-c//5CcChHpXU/XnifDGd+NVkm5vQ+0Fk2BEObcT/ojA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Numerics.Vectors.wasm",
        "name": "System.Numerics.Vectors.wqlxbobg42.wasm",
        "integrity": "sha256-qBg5HJ7/39KC+N0a7nV2VaWqh5rSaltlfM7DrEDRuIw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.ty59j5a4sk.wasm",
        "integrity": "sha256-i7JxkzF4UlqV5eeXUDtUxoXuQiiqtMZOGeDnvVK2VWQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.dufhh3fvbj.wasm",
        "integrity": "sha256-dbcCjdGU1gdIjFzvd/M7aKKAv0quHxNOOZ5oufpIw3U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.eebrqnnbs4.wasm",
        "integrity": "sha256-drhlI+pM3oR/wUsLS/UeaayEM46fe1AsxQz9Ny+TAn0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.zfknlrczic.wasm",
        "integrity": "sha256-wTdsmSlGVtSMMdG8eU8qH8tD8O2n571AXTLgk3aG57g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.ffvu6crlqb.wasm",
        "integrity": "sha256-ZZ8Yl+tzEDXUuAnCPVKMYQ3olBU48bipKbHLrw78TnI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.u1f06yqgqz.wasm",
        "integrity": "sha256-MnoV33rJKyM4ob2m+B4jDhQln2wUkc36gzI6zNKR+ps=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.ev451akeka.wasm",
        "integrity": "sha256-6nC46TP09lwxOW3257Tm8Gx/5+hbeV5sxsMPguiRDLY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.nsfubnmzhb.wasm",
        "integrity": "sha256-d3K/0sOH7IpBeQB9qj98KMmsPZy9QPcDIJxaT7Gw7LE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.wasm",
        "name": "System.Reflection.k4kgzsdjbl.wasm",
        "integrity": "sha256-5EzYAG+nFWloK1igGbF/3lxwK/eA2pkdvBFF6DbfT3Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.ResourceManager.wasm",
        "name": "System.Resources.ResourceManager.la0hyppw0u.wasm",
        "integrity": "sha256-vRGm+/DaDTsXZR6BOi3pkzx26snUF5wHC25KmCjVhgM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.wasm",
        "name": "System.Runtime.CompilerServices.Unsafe.wjkxqr2ie3.wasm",
        "integrity": "sha256-TCxaAiGzItx62UVCTIl675Smx0zM9f8ehZOfZKI5ykU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Extensions.wasm",
        "name": "System.Runtime.Extensions.5yk6vg2fwn.wasm",
        "integrity": "sha256-jU55z/qsQBwPnB1Y/czol3vMK58LF2cx4S497rPsbDs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "name": "System.Runtime.InteropServices.RuntimeInformation.l5uyvtahci.wasm",
        "integrity": "sha256-KcDEpUTmJsdWVtYY4NzBArXvXkHZH2AtULw0DF6JViU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.o1vjih35vm.wasm",
        "integrity": "sha256-FDbE/TJNfGuhOSqcbZB8AV/qI4Ekq76gJTOgodr7DN0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Intrinsics.wasm",
        "name": "System.Runtime.Intrinsics.o54en22xin.wasm",
        "integrity": "sha256-jCsvq7HXDt45TBGaUpkH3ewhjFYVhKFKtDBYtK7UxvU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Loader.wasm",
        "name": "System.Runtime.Loader.hjromt5q6r.wasm",
        "integrity": "sha256-bdsZmHLmEUxoLD670amIQtBz07SIZmAHZ5eeCx6uyqY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.76u2w1ho9p.wasm",
        "integrity": "sha256-wSaMq4/EhZr4ve5mDTzWpYoFMunY5d2SwQC543DuUpY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.48vts9n5zi.wasm",
        "integrity": "sha256-VFN/kxicT6xoKtxEHMjklFGKpwnGSmS9nmiQJgRB2ks=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.27ubrrlrze.wasm",
        "integrity": "sha256-Yjvs2vFgJeyqsc0npj6g3TrI39pcVst96dmYPsR0j3w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.7kjuaqmlaj.wasm",
        "integrity": "sha256-h1B3AwGQjm8ccDVbqRepcNt0gdhgwENjrfEFrsrYUnE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.3eipjdgv2t.wasm",
        "integrity": "sha256-WzB0cMPofOBtkn903MrWzagOjGwK1P/389yeOcb/9Co=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.xmw7yibeg0.wasm",
        "integrity": "sha256-+brpNzCMJYR1eHLsUTJuICcriT36CH6Cct01Bp0UU9c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.4tflxndtfe.wasm",
        "integrity": "sha256-uC82aCwDznrQVS7m2l6JEr+gKl5BU8auffmPG7XUv/4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Cng.wasm",
        "name": "System.Security.Cryptography.Cng.fvjgkccj7i.wasm",
        "integrity": "sha256-m4w+/LtwGLZHSDGqsfM+MLtr2uBchwsk4xXkeiTP1n4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.wbfeed0tcj.wasm",
        "integrity": "sha256-5FhfVmCd1yfD3zPW8GF+2y3VNiDQKL9JU5iiG2Kp5xQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Encoding.wasm",
        "name": "System.Security.Cryptography.Encoding.sv805rkymq.wasm",
        "integrity": "sha256-+F3f0dLGZMNz4Jc9YHUDDEnGtLl4UN3l4cYsCIbXya4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Primitives.wasm",
        "name": "System.Security.Cryptography.Primitives.pj0y906qaa.wasm",
        "integrity": "sha256-RcB9aIz6g14bXZhHcfMIfTexRmK80hGEUPb5BUSJFVI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.X509Certificates.wasm",
        "name": "System.Security.Cryptography.X509Certificates.3wh6wmarzl.wasm",
        "integrity": "sha256-7cfesT3O/CuGKielSKTfY+GLxO5itKJdiVohD/RXkoc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.ibaheow3gg.wasm",
        "integrity": "sha256-fjx/r8sxeJc5Sl92jlUO0mbFYz/DDhSSSNbSqVv/p8c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.eysjghdtjd.wasm",
        "integrity": "sha256-quJac8XURofOdKuv2VTQ7cGQLymf5yvFc2EyCLqeeMc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.CodePages.wasm",
        "name": "System.Text.Encoding.CodePages.r4t4yuzdt2.wasm",
        "integrity": "sha256-hYl4L9y1Mqn5fQ4z97o13+Qx/8ahpU0y6YZcNo47d4o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.gwksaqyl68.wasm",
        "integrity": "sha256-MFV1rWqnq/S/AtEdCoyvydacYIxU2Sajb1ETJ+dT8Bk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.7sytmjxfuz.wasm",
        "integrity": "sha256-VyekJRt3HydAEYekv+YKV70hxt6/Y6zZqDqy06IFGGw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.mg592i87v1.wasm",
        "integrity": "sha256-GnKX3EhLwnKxLxKq79uocO5gEpIpSlwfHFlwlJU69i4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.w595j4fvqh.wasm",
        "integrity": "sha256-XA8huOKOSoSIXZlo1UR6TKmujXPjINJWJj255r1W6PI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.tfz7qfohxa.wasm",
        "integrity": "sha256-KWU0MznzZZ05tT2gJ9mWSn5It74eoitr/2zF8qTxkzE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.wyz7oid040.wasm",
        "integrity": "sha256-2CE04w7fxXY+ZqS4qL5mNnw/pyIAbgPRFghlKx4kFEM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.ysq4rzz6yg.wasm",
        "integrity": "sha256-sndSZhomaMgZJSV8YYnGu9JTyssQJWIyipDAPAgJbwQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.azvzbgdjdb.wasm",
        "integrity": "sha256-pkepRWKXWuxVlCYbRa7kuXBhefDpCQNzuk8yaZAmeBg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.gw18htm123.wasm",
        "integrity": "sha256-oKCFPxbJmB4N740vSfh6aSW9DwD8E+iInzbreWfFrs8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.deed694j9w.wasm",
        "integrity": "sha256-JRSnUKU4RCZCvwQXVaK87jabHPSnQK1daxG24xvCico=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.nl6nizwsnn.wasm",
        "integrity": "sha256-1cBZqmuUjNvLzkR5l/k6i4+9R/yG7M+gs4J7lQIqh8k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TemplaGroup.Chart.wasm",
        "name": "TemplaGroup.Chart.j9o3ano4eg.wasm",
        "integrity": "sha256-adxHSxd2rSiHwMlGm8ONsC0E1rMC2Y+cfkMRWxM8Ins=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TemplaGroup.Core.wasm",
        "name": "TemplaGroup.Core.j1j0tah6sh.wasm",
        "integrity": "sha256-Z5XHnvnGaE4+0I62gayCbhHIjY/XWi5FECBA20uolX0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TemplaGroup.Logging.wasm",
        "name": "TemplaGroup.Logging.g01anr51hq.wasm",
        "integrity": "sha256-YInpgWyyBTLGrsbeBgVRD8e4NZAZw5HFXSYiU5QuItI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TemplaGroup.Resources.wasm",
        "name": "TemplaGroup.Resources.w4pg7n9s5a.wasm",
        "integrity": "sha256-QJZ3HgD2RjF+1UCWAx3zcBPPA8x6IFq+/0i0qNFE3TQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TemplaGroup.Shared.wasm",
        "name": "TemplaGroup.Shared.pq7kyldnf7.wasm",
        "integrity": "sha256-McqLlRgE2OF5mqle4LDEGaae2a7vZd6qjdXtnGeyQV4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TemplaGroup.Web.wasm",
        "name": "TemplaGroup.Web.n5f38knsr5.wasm",
        "integrity": "sha256-hUhTg5W1d9iOxR8mEOU2fGudxIwv3TYfhGU8c2jUPUA=",
        "cache": "force-cache"
      }
    ],
    "satelliteResources": {
      "cs": [
        {
          "virtualPath": "Havit.Blazor.Components.Web.Bootstrap.resources.wasm",
          "name": "Havit.Blazor.Components.Web.Bootstrap.resources.zkl1hpu90i.wasm",
          "integrity": "sha256-fQfFWmLK/t+rSKoLk5B7zwVu/vt9qkiwT3RsPJMuQP0=",
          "cache": "force-cache"
        }
      ],
      "de": [
        {
          "virtualPath": "Havit.Blazor.Components.Web.Bootstrap.resources.wasm",
          "name": "Havit.Blazor.Components.Web.Bootstrap.resources.ssjkojldsf.wasm",
          "integrity": "sha256-xIoyrtsZA/SvTeh2f7UV/F+HTvsbussomJwwsa3QJbk=",
          "cache": "force-cache"
        }
      ],
      "it-IT": [
        {
          "virtualPath": "Havit.Blazor.Components.Web.Bootstrap.resources.wasm",
          "name": "Havit.Blazor.Components.Web.Bootstrap.resources.ruf641wbn1.wasm",
          "integrity": "sha256-PYJQu559/iTU+1hlP0UKBW27QvgVaDkbuSkCE56AvBQ=",
          "cache": "force-cache"
        }
      ],
      "zh-CN": [
        {
          "virtualPath": "Havit.Blazor.Components.Web.Bootstrap.resources.wasm",
          "name": "Havit.Blazor.Components.Web.Bootstrap.resources.mpommta9hx.wasm",
          "integrity": "sha256-mnD0v2T96RtPNxXdmMgMACkqaxssjjouexxRo6q7waM=",
          "cache": "force-cache"
        }
      ],
      "es-MX": [
        {
          "virtualPath": "TemplaGroup.Resources.resources.wasm",
          "name": "TemplaGroup.Resources.resources.mv2v1v0clf.wasm",
          "integrity": "sha256-Up212l/ZG5MaVGX1jb6fgi8JTcLHfb0PyYN3fHFGvFM=",
          "cache": "force-cache"
        }
      ]
    },
    "libraryInitializers": [
      {
        "name": "_content/Havit.Blazor.Components.Web.Bootstrap/Havit.Blazor.Components.Web.Bootstrap.vc0uwiskkt.lib.module.js"
      }
    ],
    "modulesAfterRuntimeReady": [
      {
        "name": "../_content/Havit.Blazor.Components.Web.Bootstrap/Havit.Blazor.Components.Web.Bootstrap.vc0uwiskkt.lib.module.js"
      }
    ]
  },
  "debugLevel": 0,
  "linkerEnabled": true,
  "appsettings": [
    "../appsettings.Hybrid.json",
    "../appsettings.json",
    "../appsettings.Local.json",
    "../appsettings.Remote.json"
  ],
  "globalizationMode": "all",
  "extensions": {
    "blazor": {}
  },
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.AspNetCore.Components.Routing.RegexConstraintSupport": false,
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.GC.Server": true,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true,
        "System.Threading.Thread.EnableAutoreleasePool": false,
        "Microsoft.AspNetCore.Components.Endpoints.NavigationManager.DisableThrowNavigationException": false
      }
    }
  }
}/*json-end*/);export{gt as default,ft as dotnet,mt as exit};
