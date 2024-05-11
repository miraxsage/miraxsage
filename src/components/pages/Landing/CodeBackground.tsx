import { mix } from "@/utilities/colors";
import { Box, SxProps, alpha, useTheme } from "@mui/material";

export default function CodeBackground({ sx }: { sx?: SxProps; gradientOrientation?: "toBottom" | "toTop" }) {
    const theme = useTheme();
    const color = theme.palette.divider;
    return (
        <Box
            sx={{
                color,
                position: "absolute",
                top: 0,
                left: 0,
                whiteSpace: "pre",
                fontSize: "22px",
                userSelect: "none",
                background: `linear-gradient(180deg, ${alpha(mix(color, "#3ec9d2", 0.2), 0.3)}, ${alpha(color, 0)})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                ...sx,
            }}
        >
            {`var Rl=Symbol.for("react.element"),V8=Symbol.for("react.portal"),U8=Symbol.for("react.fragment"),H8=Symbol.for("react.strict_mode"),W8=Symbol.for("react.profiler"),K8=Symbol.for("react.provider"),
G8=Symbol.for("react.context"),Z8=Symbol.for("react.forward_ref"),q8=Symbol.for("react.suspense"),X8=Symbol.for("react.memo"),Y8=Symbol.for("react.lazy"),Tg=Symbol.iterator;function Q8(e){return e
===null||typeof e!="object"?null:(e=Tg&&e[Tg]||e["@@iterator"],typeof e=="function"?e:null)}var K3={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},
enqueueSetState:function(){}},G3=Object.assign,Z3={};function Gs(e,t,n){this.props=e,this.context=t,this.refs=Z3,this.updater=n||K3}Gs.prototype.isReactComponent={};Gs.prototype.setState=function
(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this
.updater.enqueueSetState(this,e,t,"setState")};Gs.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function q3(){}q3.prototype=Gs.prototype;function $h(e,t,
n){this.props=e,this.context=t,this.refs=Z3,this.updater=n||K3}var _h=$h.prototype=new q3;_h.constructor=$h;G3(_h,Gs.prototype);_h.isPureReactComponent=!0;var Pg=Array.isArray,X3=Object.prototype.
hasOwnProperty,Ih={current:null},Y3={key:!0,ref:!0,__self:!0,__source:!0};function Q3(e,t,n){var r,o={},i=null,s=null;if(t!=null)for(r in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(i=""+t.key),t)
X3.call(t,r)&&!Y3.hasOwnProperty(r)&&(o[r]=t[r]);var a=arguments.length-2;if(a===1)o.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];o.children=l}if(e&&e.defaultProps)
for(r in a=e.defaultProps,a)o[r]===void 0&&(o[r]=a[r]);return{$$typeof:Rl,type:e,key:i,ref:s,props:o,_owner:Ih.current}}function J8(e,t){return{$$typeof:Rl,type:e.type,key:t,ref:e.ref,props:e.pro
ps,_owner:e._owner}}function Nh(e){return typeof e=="object"&&e!==null&&e.$$typeof===Rl}function eS(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var kg=/+/g;
function $f(e,t){return typeof e=="object"&&e!==null&&e.key!=null?eS(""+e.key):t.toString(36)}function Tc(e,t,n,r,o){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var s=!1;if(e===null)
s=!0;else switch(i){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case Rl:case V8:s=!0}}if(s)return s=e,o=o(s),e=r===""?"."+$f(s,0):r,Pg(o)?(n="",e!=null&&(n=e.replace(kg,"
$&/")+"/"),Tc(o,t,n,"",function(c){return c})):o!=null&&(Nh(o)&&(o=J8(o,n+(!o.key||s&&s.key===o.key?"":(""+o.key).replace(kg,"$&/")+"/")+e)),t.push(o)),1;if(s=0,r=r===""?".":r+":",Pg(e))for(var a
=0;a<e.length;a++){i=e[a];var l=r+$f(i,a);s+=Tc(i,t,n,l,o)}else if(l=Q8(e),typeof l=="function")for(e=l.call(e),a=0;!(i=e.next()).done;)i=i.value,l=r+$f(i,a++),s+=Tc(i,t,n,l,o);else if(i==="object
")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of
 children, use an array instead.");return s}function Zl(e,t,n){if(e==null)return e;var r=[],o=0;return Tc(e,r,"","",function(i){return t.call(n,i,o++)}),r}function tS(e){if(e._status===-1){var t=
 e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status
 =0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var cn={current:null},Pc={transition:null},nS={ReactCurrentDispatcher:cn,ReactCurrentBatchConfig:Pc,ReactCurrentOwner:Ih
 };_e.Children={map:Zl,forEach:function(e,t,n){Zl(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Zl(e,function(){t++}),t},toArray:function(e){return Zl(e,function(t){re
 turn t})||[]},only:function(e){if(!Nh(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};_e.Component=Gs;_e.Fragment=U8;_e.Profiler=W8;_e.PureCompo
 nent=$h;_e.StrictMode=H8;_e.Suspense=q8;_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=nS;_e.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must
  be a React element, but you passed "+e+".");var r=G3({},e.props),o=e.key,i=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,s=Ih.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.def
  aultProps)var a=e.type.defaultProps;for(l in t)X3.call(t,l)&&!Y3.hasOwnProperty(l)&&(r[l]=t[l]===void 0&&a!==void 0?a[l]:t[l])}var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){a=Arra
  y(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];r.children=a}return{$$typeof:Rl,type:e.type,key:o,ref:i,props:r,_owner:s}};_e.createContext=function(e){return e={$$typeof:G8,_currentValue:e,_curre`}{" "}
        </Box>
    );
}
