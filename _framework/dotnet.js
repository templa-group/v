//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"95017c711e6afc1085133d440e42b4bd78155701",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "TemplaGroup.Web",
  "resources": {
    "hash": "sha256-EWtZbYWOptx0SUFwyTuGfPYPxkkcGe7ZOmyi0g1jKT0=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.b6l13xorvf.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.v06hirbjsv.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.rw4kynp763.wasm",
        "hash": "sha256-JTxXd17wbrHKV/375moHFUFc3a/ofVTPPqSTk6KwNj0=",
        "cache": "force-cache"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt.dat",
        "name": "icudt.oh1zvcfom8.dat",
        "hash": "sha256-tO5O5YzMTVSaKBboxAqezOQL9ewmupzV2JrB5Rkc8a4=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.ifu2r65938.wasm",
        "hash": "sha256-cpYLCCatUtPPlBZ7JOGIfiZK/cK6pp6nbmPyyw5mHb0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.6r3rppgidi.wasm",
        "hash": "sha256-wojkTTDYQH5d44adufnqEaF/COye5rDhJmKQhaabTqY=",
        "cache": "force-cache"
      }
    ],
    "assembly": [
      {
        "virtualPath": "Blazor.Extensions.Canvas.JS.wasm",
        "name": "Blazor.Extensions.Canvas.JS.iokb7a5y98.wasm",
        "hash": "sha256-ctyeKHsvFswpiKQJpTUUWdSrDGr4UNirukOrWYnwW78=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Blazor.Extensions.Canvas.wasm",
        "name": "Blazor.Extensions.Canvas.45bjdsigtk.wasm",
        "hash": "sha256-2AOrAB5tgoiK9wMMmwiE/pKPAtTjzgFudxSl6g4dt9s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BlazorDownloadFile.wasm",
        "name": "BlazorDownloadFile.ct05c4bfyq.wasm",
        "hash": "sha256-YB8HlaKSU6hGhkiMwSSlwRa4MDljnOAAmxBFTAqQWes=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Blazored.FluentValidation.wasm",
        "name": "Blazored.FluentValidation.x0xsecpmtx.wasm",
        "hash": "sha256-MSQuUWmw/uBMui2/n4kdEKi0h5j0G+EuO1sM6KK6ltM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Blazored.LocalStorage.wasm",
        "name": "Blazored.LocalStorage.12n6dz54qr.wasm",
        "hash": "sha256-OaMAAd5n7ORfyur5e3QIyEVKJ76MKIvwbg7/icnnYcU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "BouncyCastle.Cryptography.wasm",
        "name": "BouncyCastle.Cryptography.6qnbenkd0k.wasm",
        "hash": "sha256-IqnVnhA0e0WF9/Ufx8/JIbwvVOGRIsbVT0pJuf86K70=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ClosedXML.wasm",
        "name": "ClosedXML.tis3xpyycb.wasm",
        "hash": "sha256-2+dYIXNW+2yeLJSW75Rx6bGDGMM2l4wIgxgwjUJji4A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ClosedXML.Parser.wasm",
        "name": "ClosedXML.Parser.kcd8ka7nog.wasm",
        "hash": "sha256-bN619zkNwVyqGT2tFn5NMXPDIo3OUVaRYMG/tXRtn+A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "DocumentFormat.OpenXml.wasm",
        "name": "DocumentFormat.OpenXml.cnsfjef601.wasm",
        "hash": "sha256-OGbd3GR6zlbfGBnwx2pWFKJ8C1TH5aodZsSwSfv77bw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "DocumentFormat.OpenXml.Framework.wasm",
        "name": "DocumentFormat.OpenXml.Framework.jmsgheld7m.wasm",
        "hash": "sha256-6y0ZpvnY/VABbQgCFyD++WQFrA3Zw7CjRwPRpSU7Sw8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ExcelNumberFormat.wasm",
        "name": "ExcelNumberFormat.zkc9yronjy.wasm",
        "hash": "sha256-DWrWJf+NGbjj12iqpO+Ufl4YS0bkW1yz6JwjocU15wY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "FastCloner.wasm",
        "name": "FastCloner.y26k66bn8h.wasm",
        "hash": "sha256-ymkhkGW4W1BUXya0TrFe3ar3Cr/2dyUMdEAguHrB9ik=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "FluentValidation.wasm",
        "name": "FluentValidation.a26tmul8eq.wasm",
        "hash": "sha256-Dt7DBDag97mASqcSTSWerTCmGMiE8QnbGYMRbfGmqvQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Havit.Blazor.Components.Web.wasm",
        "name": "Havit.Blazor.Components.Web.pmffh2oh2d.wasm",
        "hash": "sha256-H0oKyPiB/Wm68uRoq9skLY35Kltnc2sZLqKjrfIQ2uI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Havit.Blazor.Components.Web.Bootstrap.wasm",
        "name": "Havit.Blazor.Components.Web.Bootstrap.0xtmlvdzhk.wasm",
        "hash": "sha256-DB7k+hElVV2hcyxiMokXreG5A2MxVaeonMiEubMZYk4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Havit.Core.wasm",
        "name": "Havit.Core.3q85561q4k.wasm",
        "hash": "sha256-a0hJq9GiI8dzPjL4Y9qDf5iW/qwEQjfe+4vT7TX2GZE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.barcodes.wasm",
        "name": "itext.barcodes.wd1pftqv75.wasm",
        "hash": "sha256-RDZz4gJUuph+tmnj5LksYSaxY+L/RvNOuJ4hAwMCZr0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.bouncy-castle-connector.wasm",
        "name": "itext.bouncy-castle-connector.l5erbika4n.wasm",
        "hash": "sha256-l0xn7+999fWZp7T/zGoCoyEZW9IXluV+6B+NJS64w14=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.forms.wasm",
        "name": "itext.forms.aawxd8e3do.wasm",
        "hash": "sha256-TvGKn5ZxUXmnNPQsnY9G6k0vWcTZ0tdY3bf7Ivm7gGk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.io.wasm",
        "name": "itext.io.6evpdzqes0.wasm",
        "hash": "sha256-LiQ/S2xuRIlZeoOgvg6gnWussHHYXYwpuvDvyno3Yuo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.kernel.wasm",
        "name": "itext.kernel.p2cbqqwn0a.wasm",
        "hash": "sha256-4dOIyTKbDsd5vVFLeQCvxblUlGAHSj81j77TgDggvmU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.layout.wasm",
        "name": "itext.layout.ylw3alriof.wasm",
        "hash": "sha256-1rW95lHQ8rMcSpibgTRKhTgX1O3pJgoVz53egX/MAMM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.pdfa.wasm",
        "name": "itext.pdfa.xsa308krw8.wasm",
        "hash": "sha256-cXkV1iUTCyYgD+pe8e8T0Lnorbtu2TWwME/uMhSQUU8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.pdfua.wasm",
        "name": "itext.pdfua.yl2u9ixfpk.wasm",
        "hash": "sha256-tmmbJERrEMoV6T8coDIoDf6DIvtWT8oqP4uPLqaVn40=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.sign.wasm",
        "name": "itext.sign.cstgfsen79.wasm",
        "hash": "sha256-zPnLv+n/+Q88WHb1s2Bq99/RdT9D/0FeOtERbk8Xj40=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.styledxmlparser.wasm",
        "name": "itext.styledxmlparser.hamdt8v0sb.wasm",
        "hash": "sha256-Gf9gQf11qVFFgtJyoY7Tw/RbWlpjtLRMog+QPREKO9Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.svg.wasm",
        "name": "itext.svg.u5mh42uj5m.wasm",
        "hash": "sha256-cvYHt2/NwSlwrXBlRo9KqlmLSR5Ae4FxoGtX8TBeYTo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.bouncy-castle-adapter.wasm",
        "name": "itext.bouncy-castle-adapter.qrrq7hdw3d.wasm",
        "hash": "sha256-Fiq+O5biO20bm0lLYqutBimDRfpmAYXHzSROoFZwIck=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.commons.wasm",
        "name": "itext.commons.z9ylgo8fyl.wasm",
        "hash": "sha256-Oa/CdqMtZtybX3eFb6sddDL/2G3zrZAcwBUVpJCn3u0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "itext.html2pdf.wasm",
        "name": "itext.html2pdf.uvatvycbi1.wasm",
        "hash": "sha256-WqPwAqZ+xhoGTTPWVsrIsg7UxeDtwkgMYt0H4Nn4chE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Authentication.Abstractions.wasm",
        "name": "Microsoft.AspNetCore.Authentication.Abstractions.hx5ptdy1rp.wasm",
        "hash": "sha256-RduQTXY8PBZ/0ttbiHfeyQ8gVVDmZSc9RrCFoS4faRY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Authentication.Core.wasm",
        "name": "Microsoft.AspNetCore.Authentication.Core.m7cdq1kuvx.wasm",
        "hash": "sha256-Ej3Kz7PWzC0LR1jP/ZTPfBBcEL97ctTR3E16kbw0K6A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Authorization.wasm",
        "name": "Microsoft.AspNetCore.Authorization.tl5zercw8c.wasm",
        "hash": "sha256-IeFDfHsTH48R9S0ukN9cnq7umv+Pl7utNo/jbM/5QOE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.r1rlrjgi1u.wasm",
        "hash": "sha256-0dxHlnSrnmuSqmuD4sEcKd7N3nhyoouD73QVcBj6xEA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Authorization.wasm",
        "name": "Microsoft.AspNetCore.Components.Authorization.ckkijsh0vj.wasm",
        "hash": "sha256-nCvJDnP5LXx5Dia9CnB8hJl1CgWYrRXW4rEYymQwMoU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.DataAnnotations.Validation.wasm",
        "name": "Microsoft.AspNetCore.Components.DataAnnotations.Validation.elz03823ys.wasm",
        "hash": "sha256-Mpd98aRLb9cK/TLwAqYub55BwBvzDAyJs18h1O7jIqk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.5yvcad2ggy.wasm",
        "hash": "sha256-veqdvjtajegexk/g8FO3quJr0qLH5RGKw1vE1g180Kg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.dhj5nnh7k4.wasm",
        "hash": "sha256-4fSNOD0RioRkDsWcVNEb0e3oVonC+O6UDuMxOAlKJ0o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.rm5zjv4npx.wasm",
        "hash": "sha256-vSk1jfMB69mx9n0tSObZZ6WlFr7MJR1b72N4KAnRjAo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Cryptography.Internal.wasm",
        "name": "Microsoft.AspNetCore.Cryptography.Internal.oag4hxggph.wasm",
        "hash": "sha256-gADooXM3AetFEfHnD/MXCYFOEt7ZoqzYaNG54q+GujI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.DataProtection.wasm",
        "name": "Microsoft.AspNetCore.DataProtection.6y3bjhrpey.wasm",
        "hash": "sha256-vq+UjxjboUk9V4cCN03nw5Vu+NM8zy7xGSmnrbYzRhs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.DataProtection.Abstractions.wasm",
        "name": "Microsoft.AspNetCore.DataProtection.Abstractions.1swnq2ayfl.wasm",
        "hash": "sha256-TzhxXbLE+Xikc2uujnR51UWVKDznbcJMR5KGs5DYuzI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.wasm",
        "name": "Microsoft.AspNetCore.Http.p9d2re3uss.wasm",
        "hash": "sha256-U60ArLEBO8mIKix8vyo3A8I4ZiC0GaRzgena3lZ+Bv0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.Abstractions.wasm",
        "name": "Microsoft.AspNetCore.Http.Abstractions.78o76ke1hq.wasm",
        "hash": "sha256-mdMhHI7pKF/ZhgFfCAmzm28TWCT2NY5FnPpLLXzopP4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.Extensions.wasm",
        "name": "Microsoft.AspNetCore.Http.Extensions.xlrjq3z05d.wasm",
        "hash": "sha256-hYgQHi5p0LInW8upJmVxmV5ILQqBGV7CR5ye/YKr/4g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Http.Features.wasm",
        "name": "Microsoft.AspNetCore.Http.Features.8md4u7x7il.wasm",
        "hash": "sha256-ELgGhtk4OKjpNI3FKkRgfmkaYzg5jNtR7AaVd3qRiww=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Metadata.wasm",
        "name": "Microsoft.AspNetCore.Metadata.y7dnl79y3a.wasm",
        "hash": "sha256-UpzzxRBt/A3SImOi7qlz4YjRNENhFAQugJLtA6ksCjA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.AspNetCore.WebUtilities.wasm",
        "name": "Microsoft.AspNetCore.WebUtilities.61vbzv7rua.wasm",
        "hash": "sha256-2oBDmCIbeLcBHrpeQbFt9i0LV8H82JKfnxKwTJeJZRQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.DotNet.PlatformAbstractions.wasm",
        "name": "Microsoft.DotNet.PlatformAbstractions.l5f1k5rpem.wasm",
        "hash": "sha256-+bp3smw6HF4P5NLzNAbp7j/Fzp163jJn8MhPIgaJpu0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.0fgwttnl7o.wasm",
        "hash": "sha256-5GMg3mgGt3aJ47FusHty2WL1UatRz9UxJM6clHOwRr0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.h2e7n5tyug.wasm",
        "hash": "sha256-B8LwDjSm0vG3xVko2EAFl2QuvbCMXnBSN6jmumvL/XQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Binder.wasm",
        "name": "Microsoft.Extensions.Configuration.Binder.0nlejop4iw.wasm",
        "hash": "sha256-DEhEl1qbTQdkSBwurp00/MO8TUNWMbPjD6ZFJy5Ugro=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.2es17g9n0g.wasm",
        "hash": "sha256-BsOx5/6kd4n5mr4SK5Fwo33duZWjcGBTWY3o+YvXIZM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.pi4kjyytqy.wasm",
        "hash": "sha256-4W5eJPi9zKQATq2Z/fyE2rSmGV4Q8+Tg0UiUmK3gQmI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.4yqvwiccck.wasm",
        "hash": "sha256-LAI2093aaW0V9u4KpVhehtXwWbEPWyKgKbeQ0BOn40Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyModel.wasm",
        "name": "Microsoft.Extensions.DependencyModel.fa7upqmsip.wasm",
        "hash": "sha256-mb6ko8mTz9fceB7BegdOz0/9SqxLj1m5jApm1yJAxxE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.wasm",
        "name": "Microsoft.Extensions.Diagnostics.xu38wi6f6z.wasm",
        "hash": "sha256-d3JUDeib8eW2dvx0how0xu8NblCriVBz/d6qcfon/s8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.Abstractions.wasm",
        "name": "Microsoft.Extensions.Diagnostics.Abstractions.9gqo9c13ni.wasm",
        "hash": "sha256-6cRAoVRxjOVJVEfM69n5m2WxGMwVquKS41c0Car+ric=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Abstractions.wasm",
        "name": "Microsoft.Extensions.FileProviders.Abstractions.gd7em1tw7p.wasm",
        "hash": "sha256-1GawscWqxR5L+xqJIsj0Vnzuho+h4cm18jHD67zYJGo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Hosting.Abstractions.wasm",
        "name": "Microsoft.Extensions.Hosting.Abstractions.zjpg0bwnj9.wasm",
        "hash": "sha256-X7GB52hGhAkwJfzCqZTpZfY8ihp91PACXwGaRSGQuH8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Http.wasm",
        "name": "Microsoft.Extensions.Http.syouxdyjk0.wasm",
        "hash": "sha256-5M5Qg9b+6rUM+16CZc3/Qtc+Acv0Cw+OaFYKVR2tNxA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Http.Polly.wasm",
        "name": "Microsoft.Extensions.Http.Polly.26rw2is3dm.wasm",
        "hash": "sha256-dmTAQj0tPgmx/1SIDmwuqJQKiriR5nLIBY/JDGFfhKE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.wasm",
        "name": "Microsoft.Extensions.Localization.sxhvuspdhn.wasm",
        "hash": "sha256-cPVfX0ssGEK6Wi4Y8vRe3Vu6J3OwqvcCMhafUqLk5JU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.Abstractions.wasm",
        "name": "Microsoft.Extensions.Localization.Abstractions.arjfd5pjv8.wasm",
        "hash": "sha256-xsKzza97V0EOs00zSNwz8nWsayoh/5TsqygUmdx232w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.b7lhw6rrjo.wasm",
        "hash": "sha256-aRLV5gYygePgoaWN9gadmOBiVGIsJn0SG74YFjY6vcg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.vg6af2iu5g.wasm",
        "hash": "sha256-wWmjpx4iogCF6c994j8l7y1lK14ylGD4sCIz0lB6OYo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Configuration.wasm",
        "name": "Microsoft.Extensions.Logging.Configuration.464mdr49bf.wasm",
        "hash": "sha256-ZEjwlimGcsbT2f5vu9MjEv/i+Yl/TOdqLQhqM9QP3M8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.ObjectPool.wasm",
        "name": "Microsoft.Extensions.ObjectPool.xhqcekhyre.wasm",
        "hash": "sha256-JT/c72wU6RhbwA4gfnbJbOs+CGhbNuc/N02z4r+qQxA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.1c1zfd708r.wasm",
        "hash": "sha256-f9tuRAGZTdPwl6kycjOtS1VztxP0TlCEcGWRWFIQBvM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.ConfigurationExtensions.wasm",
        "name": "Microsoft.Extensions.Options.ConfigurationExtensions.a1ja0ceywn.wasm",
        "hash": "sha256-3o4quD42hUwENC7vH/dZK6hIEYGljJe6j2xbKhYYqdc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.q5s96c3wqa.wasm",
        "hash": "sha256-zpy3uRImDntIiYofEFTLS0CmYSzZrVk2NEmxx4sCeyY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Validation.wasm",
        "name": "Microsoft.Extensions.Validation.b4ulc8xjwb.wasm",
        "hash": "sha256-uwcUYgWgofVYLhVwHalWFxLx76b3orxn5ZfySl33JQg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.qjp8hh5xum.wasm",
        "hash": "sha256-Vlg2vbErY3QmOn/Bkgtfs1UNm+YfGfqDvmBWgzjIync=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.8im78pw29j.wasm",
        "hash": "sha256-sPnvBbe7Ep83/XgQDDaeNNoGkwoTGkNxCXc91yOgzAw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Net.Http.Headers.wasm",
        "name": "Microsoft.Net.Http.Headers.ik4xlq4z2s.wasm",
        "hash": "sha256-YnIHmUQ7LVQCYhv+T//Uz6U5mXPIg5aDNTtc91IRtGQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "ObjectsComparer.wasm",
        "name": "ObjectsComparer.mkcua83g4z.wasm",
        "hash": "sha256-2srTiwySDPHQSgkfJbGC314bg1l6XNv7k9BSrtSH34U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Polly.wasm",
        "name": "Polly.pos1ijmk3h.wasm",
        "hash": "sha256-eSXY+B0UR7o5vq1w0+MYQU84lXRsKRij1hP/2bsV86I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Polly.Core.wasm",
        "name": "Polly.Core.p5np8w023y.wasm",
        "hash": "sha256-g7b05Afb7sTHjuF9++DDwV7m4g6a1+mvThmhQvPS88U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Polly.Extensions.Http.wasm",
        "name": "Polly.Extensions.Http.aamf4ift6v.wasm",
        "hash": "sha256-bqX9l2dLJ0m0IilNsXvbO14i9Lx0oDeudAGIsS3kEAw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "RBush.wasm",
        "name": "RBush.048ali807d.wasm",
        "hash": "sha256-cHsLmPL/ZYfNtaqW793aQui9cR4N7JXjHm+xggcoz7w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SixLabors.Fonts.wasm",
        "name": "SixLabors.Fonts.1ntl3xbxha.wasm",
        "hash": "sha256-TYAwAMga8iYHgcD5+CMUwDAmCjtNUbzJJP6/e+Xtl5w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Packaging.wasm",
        "name": "System.IO.Packaging.0f9cehj3yy.wasm",
        "hash": "sha256-rFyH3444dx4tr1BVh/Qb3ONc/0B0rmaIGNpgSv+GX/Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Pkcs.wasm",
        "name": "System.Security.Cryptography.Pkcs.5p3ij5y7ha.wasm",
        "hash": "sha256-xxWKoaiw6kXejU2sO6J/NcYpaJSP9dGfKe8FIgZ/85Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Xml.wasm",
        "name": "System.Security.Cryptography.Xml.ryok9u6h5q.wasm",
        "hash": "sha256-YzxeRHuJ7JseDh8eDOQwFfB3VHaHsGpVg0riTmw0shk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Tavenem.Blazor.IndexedDB.wasm",
        "name": "Tavenem.Blazor.IndexedDB.xso27rslfk.wasm",
        "hash": "sha256-EZ10nOqYD7MtxN94HB3WlSFcFfs5o7lzlQuNAEgbLAw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Tavenem.DataStore.wasm",
        "name": "Tavenem.DataStore.d21jns0ond.wasm",
        "hash": "sha256-JfPlUqZhG+oggVae4pr/yWCRUcHmzEwrG4/68kuFLe4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Registry.wasm",
        "name": "Microsoft.Win32.Registry.vmmtnye35w.wasm",
        "hash": "sha256-1/Z+FZacE+N6HidoWeX4fMdN4yvFo59iADXT3fuQ9Yg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.AppContext.wasm",
        "name": "System.AppContext.jozxpglmzz.wasm",
        "hash": "sha256-HQSYNIvzigb7tPHuG8IOQlGp3xZYEaPSGBboRt8RgNM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Buffers.wasm",
        "name": "System.Buffers.pjm4uleil8.wasm",
        "hash": "sha256-Jf27kWlVTv9oLvx0KOyDGlFRl/JwlMC4wCWiFigSsWs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.zyvw5hq8tm.wasm",
        "hash": "sha256-Je2k6YuFU/ixB9bsgVpXdJtm9yErt+ibHYdQ4FTCH50=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.amcxah1rsr.wasm",
        "hash": "sha256-IrwEF2IFNjx+vDf+awWK5UN+/fanf+TP1ZLUgmYZVkk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.t3eeq9tduq.wasm",
        "hash": "sha256-6WwoN3Lw0jctbQrqBWmAz2udKQwz5mnKfMyXwUq9PxI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.2jbgtzhxfb.wasm",
        "hash": "sha256-XpdY68+jc68leuOBNn6etTQsnAj7DXVA+CwHENQkhFQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.yam911rzqr.wasm",
        "hash": "sha256-Ko5K8OaLBsVZkOO+59a0/4Fo6nA3hM9qweKLLYsZBcs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.jsmbepq705.wasm",
        "hash": "sha256-I3r4iNpLLV0rhGp+oi2Z0J4DAjZBOxADMK4mEQod3ag=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.hx9mgkmkwn.wasm",
        "hash": "sha256-xRtz/bMLfu9MScmHsqDj7ViV1FtBbs2W+3sPdwVUN7c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.wuq20u8ok6.wasm",
        "hash": "sha256-iFPU+CHMKImyd1V7403hSfBpeBJ4UxLJvDxE6I9I9PQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.cphsh41vl6.wasm",
        "hash": "sha256-oFm4vMv+Q9oyEejMC9gEG9e7ko8IcrpkPHiy/Dg8F3Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.jp18awuwwa.wasm",
        "hash": "sha256-p2Q+m8qOMuJG+RoSORUEkSZ/eg+6T56nc9cWQXPFAxk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.fgvsxkhk9e.wasm",
        "hash": "sha256-wdDqhclRBgqcOggXjniysmt9Pxxavq/Jz5ZbYd2gJB0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Debug.wasm",
        "name": "System.Diagnostics.Debug.k38ray8cnl.wasm",
        "hash": "sha256-wPPbAyJ/n7gF/K2SWe5W5yOfKq0N/xUYqroLwqglbXk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.fjmxuyezsy.wasm",
        "hash": "sha256-pcmzwNnhETX2nbzJdouKKJtB3iWljEBHTDZRV1iq6g4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.FileVersionInfo.wasm",
        "name": "System.Diagnostics.FileVersionInfo.ncma0vrbf8.wasm",
        "hash": "sha256-p9vTnEu+SW5MOlG7Yo12QDJSfNdLq5Buomq6OZND8gA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.bhm2lo6yuy.wasm",
        "hash": "sha256-sawPjyghv/jtsUB3G/pFkHcUXBAgROIKdRQBDvM/GWg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tools.wasm",
        "name": "System.Diagnostics.Tools.y9nb3hrudb.wasm",
        "hash": "sha256-lkF1ZwihBRkDPCHg9Ml9BotAHITUUV1jKioPsKtf2K4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.pnp4kj0q10.wasm",
        "hash": "sha256-5ZqBdHUg09k7R9ZzsXhnKR8wpc8qoqemEyet/+O2P2c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.zdy1vjjb18.wasm",
        "hash": "sha256-V/8xIPzPWD4O99F5+bm8dbM4nrDlMzxnV1DXQMnpHBI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.c6tmp1gjc8.wasm",
        "hash": "sha256-NFpXLgCTsyBU+AK+27QTsQQxyAoaLo/HDVh9RRvDIL4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.8ntolob6yz.wasm",
        "hash": "sha256-7I7bSNA9/zOxTku7Mkb1rykugyRAxyyOcS0JAlVBRp0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.Brotli.wasm",
        "name": "System.IO.Compression.Brotli.nwap56xa3c.wasm",
        "hash": "sha256-iW8Lhlr19ATcrLi/wLLeZYErzMECe18oVBpL+tc3amQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.f4tvpxeza6.wasm",
        "hash": "sha256-LyLObrnh3P4n2dl4j2TONpr5Qpm7PEWj7U9sw8S0UK0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.wasm",
        "name": "System.IO.FileSystem.0s5eswzbeb.wasm",
        "hash": "sha256-QN9dS2pNrgjtUxRL717Lmor+9zmBhxzHyzFWMhno3dk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.wy1lej9dp5.wasm",
        "hash": "sha256-OMd97FEzS/xzDNosogV8W+ueu6kzt3naeQqQzyn+3sI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.3u1qb93cts.wasm",
        "hash": "sha256-y2pBhi8uaWBZNm/BzRg1bVujpIE/SSPbhMhlyNPlglE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.nmp9r0lwlo.wasm",
        "hash": "sha256-/zQk7TQqgJ5unURFKu+l2IWEeEMSbNFsTuPDmLciV0Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Parallel.wasm",
        "name": "System.Linq.Parallel.c7hoijbez5.wasm",
        "hash": "sha256-GBvdq8YO6hYEYN2rdymTrx05H5jwdBBg4iNGI8zVIqU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.36izqv3qbz.wasm",
        "hash": "sha256-uyyUa4dxkjtXF9a3HavWP+nptVjzhvlvmKA3ebov6aQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.nwwp02aii1.wasm",
        "hash": "sha256-19q0mugD+5EpKFsbI8kcYbRKsEX0QX1hRmdxq29SJmw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.knmxoqbilg.wasm",
        "hash": "sha256-8OBeJF9COG5iDt7Ir7os0x+u7PbUa6SCbTAArdx9P2c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.r1zre13az9.wasm",
        "hash": "sha256-LwxY5ySuxwY1l06yVqWH3TCq8SwnZMixVExw23o2GJU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Mail.wasm",
        "name": "System.Net.Mail.gsjio8h36i.wasm",
        "hash": "sha256-sDwChEYQjrdXP2LbQeNUyQBN7ZFb1KWZg4XOYaGqV/g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.mfocia06t5.wasm",
        "hash": "sha256-skB3CGdUpoMtRV1TuuOvL3gUwQm8XIsI/MruQHqA86Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.vamo650jbz.wasm",
        "hash": "sha256-50D2TDyhmRR2WbEaAdOUfbehrvIcNYisS937S+3LdXw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.xwt04cejk3.wasm",
        "hash": "sha256-cWuotKcHKCBTxUCf2dLpk5jJOO2y3V9tj9e0BCUYJkw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.xo5spw2600.wasm",
        "hash": "sha256-Lxvjnw2DMHngXFGV/ayWSgG7cG5DSc7vvJZfq60a+UQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.wasm",
        "name": "System.Net.WebSockets.qgra98podb.wasm",
        "hash": "sha256-igK7d9+tIzAEa3MZ7YppuRYjNcQ4nJ4sv2fbn+3evcw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Numerics.Vectors.wasm",
        "name": "System.Numerics.Vectors.mxv2u2mtv4.wasm",
        "hash": "sha256-KtTfANchmOdmBsqqoLux2B8Q3r2b4vBNpntiiRUpb/Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.mw86kqqbvg.wasm",
        "hash": "sha256-lg7tlqwwJYNPjr0emTeTHI0G4EHVnhCN2yzl0v0y5Ik=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.632xromhr4.wasm",
        "hash": "sha256-LnysGEOSjTiDRjkY3+18S3a+hNBpssEbc33u3MdnkSA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.x1kzolgr6m.wasm",
        "hash": "sha256-RZyPg26BkYsuQaY3M7srToIGeCoQNFTMHeXsNKz/yyA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.ltvofhm2yy.wasm",
        "hash": "sha256-GeoYh2RGtCAluK/8QL9rYT4vHSDI/VONezJInl1Y4hA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.0y4n3ee858.wasm",
        "hash": "sha256-OMwj95BWcoy1JOM25RIkHg1pc81OyeFawxu/GmxIieA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.ResourceManager.wasm",
        "name": "System.Resources.ResourceManager.9hr4affkg0.wasm",
        "hash": "sha256-48WtQORRYle1yu7mKz0UK+B8bPrEFMKWdBSReowbgK0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.wasm",
        "name": "System.Runtime.CompilerServices.Unsafe.wcpi0i4qbx.wasm",
        "hash": "sha256-4JjqZOhbK+h0/CIQTGVqHAWAjiTF/q0vHcj07po/Jhc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Extensions.wasm",
        "name": "System.Runtime.Extensions.8tpy5mv29f.wasm",
        "hash": "sha256-LGSXhRDo+/sVzkiRyxtq6gMsIfEHM9JGLLIvlCCrsIk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "name": "System.Runtime.InteropServices.RuntimeInformation.puxzs0c4xu.wasm",
        "hash": "sha256-3w2SYeMOGTH3LZJTu8pr0JD5A6K5H8Rv40A/qv+1pgw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.lmgabhuvry.wasm",
        "hash": "sha256-Ux7ZCQDJwgiiqc9yw1zcxHt4M8q2lACLzq0a96XF5c0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Intrinsics.wasm",
        "name": "System.Runtime.Intrinsics.s7r1bj6e6d.wasm",
        "hash": "sha256-CDcRzpS/JRBVNCoMoMizeNY/2RLORlcXA2ofK4w5DIU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Loader.wasm",
        "name": "System.Runtime.Loader.7i20r5qyx9.wasm",
        "hash": "sha256-UaTF/sBHx3iQpQ9oPORd2zLI/0sqWWMHLreV7NJ5oRc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.7vexyrgl9c.wasm",
        "hash": "sha256-fUjc1GvHKouraV3HniJFktJ8Xzo3sQJq17qdmpa/0Uw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.su3ks5i51l.wasm",
        "hash": "sha256-fH9D9OCs40m2ANTpRZ4DnZIwSSwB7u4tIRPOCB/6Rro=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.d4a4e1vv1l.wasm",
        "hash": "sha256-PS7WNiCOki8AfApluCLGNqEmHfzpXQ29sFl92XHgz7g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.5uw8o7mqjp.wasm",
        "hash": "sha256-wzOzp6U6LpvPB+XLIhx1N6rWUpdGR+CWCvGJbcK0fWk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.58b7nw9dqs.wasm",
        "hash": "sha256-awQu64xQ38mgFGgUQn0D4YFsLezosAqJ8w0iuTYVbQQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.5k9jvqbruc.wasm",
        "hash": "sha256-27FOwlbC5V+bRL5H6dHGOn6bcm1w33ecxWeli5nhEbQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.zow7fvtzmn.wasm",
        "hash": "sha256-Q3z53vZ4KLIlXufVamjl8NHEsiTD1NrE8g25U7OM03U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Cng.wasm",
        "name": "System.Security.Cryptography.Cng.7arvzy524t.wasm",
        "hash": "sha256-3zaRf1bqUpVcl/K1ZNuurSDUA3gPezp2jXn1u4F5Zq4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.jdouuqu6ix.wasm",
        "hash": "sha256-57zKJMolMqpMluk02X77TtgkU6zgwoy5o1Xgjh6T8Eg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Encoding.wasm",
        "name": "System.Security.Cryptography.Encoding.lgjtcb871u.wasm",
        "hash": "sha256-xd9y6matSxEX/ltA2EtVqF6ftUr4pf5mQwk0AHexQ0g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Primitives.wasm",
        "name": "System.Security.Cryptography.Primitives.jqys76ad39.wasm",
        "hash": "sha256-JUJRo35GcL7lF3/qYfGd86xBSKAd764r4300DnxVhNU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.X509Certificates.wasm",
        "name": "System.Security.Cryptography.X509Certificates.dazcjr8gyc.wasm",
        "hash": "sha256-WwNCu56CULDMdlzIaqB5kkX64Pl+PgLtWFJmadya1f4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.ngr5eam1fp.wasm",
        "hash": "sha256-R/ChFpBrpZNzvMWufSkOrlM65RpPmSI6ufVw6uCii0E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.2vbrkvlp59.wasm",
        "hash": "sha256-znTH+jB8ezEkdSEyMWjfQWBPzLahNntzx2VTRWu1A5Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.CodePages.wasm",
        "name": "System.Text.Encoding.CodePages.nekrkfpejr.wasm",
        "hash": "sha256-8R8diWM059mEqoydOljSLRGJI0xC0nlp15raj1FXMVo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.67juxibjam.wasm",
        "hash": "sha256-snXpcZLDsroNavzS57HL8yJzA+BFlApGSscHtZD74mU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.xzqrkbekrc.wasm",
        "hash": "sha256-bUGEGNEzwMMBgQlalVJK3nE4XHnGTNpSOIBQShRpUS8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.7wbk0or8i3.wasm",
        "hash": "sha256-N4n0GBYjNckopJVRx2m7KaTVh/hVwVxdLMaRPluruEE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.64qkol0ahd.wasm",
        "hash": "sha256-yjJnwVqG4pqFnHXSvz3oTL2CYmyWTDHEnfjPDqOIOKg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.5o7ugg0r3g.wasm",
        "hash": "sha256-VZINw3QPX8glmyvqBhf8KmjES31GKJnQyo2GWTyYmqU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.pzw688hdq1.wasm",
        "hash": "sha256-e5txtle0V/jlZ+5laxHe+k2o2xewHh66AVpDrj8yXlc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.400l3mulw9.wasm",
        "hash": "sha256-vPEm2KqgXqruGwnz718iSgmDoB8Img7iH3FzO57b0Rg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.1nasu3g5qd.wasm",
        "hash": "sha256-3S5bruqkkHN4vjRvG0+unsxlzrO/rKCLUskDzJHJ9g0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TemplaGroup.Chart.wasm",
        "name": "TemplaGroup.Chart.887t47g7ou.wasm",
        "hash": "sha256-KHZF7tVrQfXOqwv1hdBXyJ0U/YVYKNywKuFHqa8YV24=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TemplaGroup.Core.wasm",
        "name": "TemplaGroup.Core.r9tb8b4uq9.wasm",
        "hash": "sha256-7zxg7bwRUJRdv6dcyaAgAFodppgUr4NCbaGp5kI1YPs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TemplaGroup.Logging.wasm",
        "name": "TemplaGroup.Logging.0lm3ukit7f.wasm",
        "hash": "sha256-7FwYzUBqnEmedpj79CmU5Ec5MXPX718WiluvaqRqeOA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TemplaGroup.Resources.wasm",
        "name": "TemplaGroup.Resources.jwuzy6t5mm.wasm",
        "hash": "sha256-zS5FMudTHhico2trLyHW4pxX+p1xEaFNzLtzUIoG/v0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TemplaGroup.Shared.wasm",
        "name": "TemplaGroup.Shared.vaj1nc9pgg.wasm",
        "hash": "sha256-9w569MT6nw9W6kI5Uy3fnkmdgx/R/eIN/dhudQcZSSw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "TemplaGroup.Web.wasm",
        "name": "TemplaGroup.Web.hjiom604ho.wasm",
        "hash": "sha256-3SFPHZktNCh8HXpcOus4YmbxqOhApqI77oaqjqWfito=",
        "cache": "force-cache"
      }
    ],
    "satelliteResources": {
      "cs": [
        {
          "virtualPath": "Havit.Blazor.Components.Web.Bootstrap.resources.wasm",
          "name": "Havit.Blazor.Components.Web.Bootstrap.resources.vb9wlh471q.wasm",
          "hash": "sha256-OxDvvSjG6fooiYaxTGie/81QJn5CzhrnzWWp6HAE7ak=",
          "cache": "force-cache"
        }
      ],
      "de": [
        {
          "virtualPath": "Havit.Blazor.Components.Web.Bootstrap.resources.wasm",
          "name": "Havit.Blazor.Components.Web.Bootstrap.resources.w6etxx0qu8.wasm",
          "hash": "sha256-6K2tqTC0cXuHAA34zRK/5vzTFVtHkg3uA3mpE4/2/P8=",
          "cache": "force-cache"
        }
      ],
      "it-IT": [
        {
          "virtualPath": "Havit.Blazor.Components.Web.Bootstrap.resources.wasm",
          "name": "Havit.Blazor.Components.Web.Bootstrap.resources.gmyd6lhwh7.wasm",
          "hash": "sha256-iDpYNAdOUt4WOku380vd9NYehgWwXRNjg5zyjJRAyBQ=",
          "cache": "force-cache"
        }
      ],
      "uk": [
        {
          "virtualPath": "Havit.Blazor.Components.Web.Bootstrap.resources.wasm",
          "name": "Havit.Blazor.Components.Web.Bootstrap.resources.tlad7jm2f6.wasm",
          "hash": "sha256-DxZqV6SXbyGHJ7mmm9u4ETZEobPhtpxNUonm/2Bkbp8=",
          "cache": "force-cache"
        }
      ],
      "zh-CN": [
        {
          "virtualPath": "Havit.Blazor.Components.Web.Bootstrap.resources.wasm",
          "name": "Havit.Blazor.Components.Web.Bootstrap.resources.jejguym49u.wasm",
          "hash": "sha256-xTOU/UrNeD/+OO45AJzfLPOaX/NZ8Zu4Kgs2FTGJous=",
          "cache": "force-cache"
        }
      ],
      "es-MX": [
        {
          "virtualPath": "TemplaGroup.Resources.resources.wasm",
          "name": "TemplaGroup.Resources.resources.c4ufgdcyul.wasm",
          "hash": "sha256-POrKwYVnox49HaeqPJfS4ZeHBBeG9Swkt4m+6v7+lrQ=",
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
