!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.AutoWriter=e():t.AutoWriter=e()}(window,(function(){return function(t){var e={};function r(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(i,o,function(e){return t[e]}.bind(null,o));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";e.__esModule=!0;var i=function(){function t(t){this.name="AutoWriter",this.frame=0,this.characterFrame=0,this.tickFrame=0,this.requestId=void 0,this.updateOptions(t),this.useRequestAnimation=!(t.engine&&"setInterval"===t.engine),this.useRequestAnimation=!(!window||!window.requestAnimationFrame)&&this.useRequestAnimation}return t.prototype.updateOptions=function(t){void 0===t&&(t={}),this.options=Object.assign({speed:2,speedNext:4,shuffle:!1,offset:2,firstChar:"-",firstCharOffset:4,exclude:[],pattern:"abcdefghijklmnopqrstuvwxyz0123456789-_!@#$%^&*()+~<>",colors:["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4caf50","#8bc34a","#cddc39","#ffeb3b","#ffc107","#ff9800","#ff5722","#795548","#9e9e9e","#607d8b"],output:"string"},t)},t.prototype.tick=function(){this.characterFrame>=this.keyword.length||(this.frame>0&&(this.frame%(this.options.speed*this.options.speedNext)||this.nextCharacter(),this.frame%this.options.speed||(this.tickFrame++,this.make())),this.frame++,this.useRequestAnimation&&(this.requestId=window.requestAnimationFrame(this.tick.bind(this))))},t.prototype.make=function(){var t=Array(this.keyword.length).fill(void 0),e=this.options.offset<=0?this.keyword.length:this.options.offset,r=this.options.firstCharOffset>this.options.offset?this.options.firstCharOffset-this.options.offset:0;this.characterFrame+e>this.keyword.length&&(e+=this.keyword.length-(this.characterFrame+e));for(var i=0;i<e;i++){this.newKeyword[this.keywordAddress[i]]=this.randomWord(),r>0&&this.keywordAddress[i+r]&&(this.newKeyword[this.keywordAddress[i+r]]=this.options.firstChar);var o=Math.floor(Math.random()*this.options.colors.length);t[this.keywordAddress[i]]=this.options.colors[o]}switch(this.options.output){case"object":this.fn(this.newKeyword.map((function(e,r){return{label:e,color:t[r]}})));break;case"string":default:this.fn(this.newKeyword.join(""))}},t.prototype.nextCharacter=function(){this.newKeyword[this.keywordAddress[0]]=this.keyword[this.keywordAddress[0]],this.keywordAddress.shift(),this.characterFrame++},t.prototype.randomWord=function(){var t=Math.floor(Math.random()*this.options.pattern.length);return this.options.pattern.substring(t,t+1)},t.prototype.run=function(t,e){var r=this;void 0===e&&(e=null),this.fn=e,this.keyword=Array.from(t),this.options.firstCharOffset>0?this.newKeyword=new Array(this.keyword.length).fill("").map((function(t,e){return e<r.options.firstCharOffset?r.options.firstChar:""})):this.newKeyword=new Array(this.keyword.length).fill(this.options.firstChar),this.keywordAddress=[],this.frame=0,this.characterFrame=0,this.tickFrame=0,this.keyword.forEach((function(t,e){r.options.exclude&&r.options.exclude.length&&r.options.exclude.indexOf(t)>=0?r.newKeyword[e]=r.keyword[e]:r.keywordAddress.push(e)})),this.options.shuffle&&this.keywordAddress.sort((function(){return.5-Math.random()})),this.useRequestAnimation?(this.requestId&&window.cancelAnimationFrame(this.requestId),this.requestId=window.requestAnimationFrame(this.tick.bind(this))):(this.requestId&&clearInterval(this.requestId),this.requestId=setInterval((function(){return r.tick()}),1))},t}();e.default={core:i,wrap:function(t,e,r){void 0===r&&(r=null),new i(e).run(t,r)}}}]).default}));