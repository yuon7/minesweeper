(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,o,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(85)}])},85:function(e,o,n){"use strict";n.r(o);var t=n(5893),i=n(7294),l=n(2729),r=n.n(l);let s=()=>{let[e,o]=(0,i.useState)([[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]),n=[[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1]],[l,s]=(0,i.useState)([[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]),c=[[1,0],[-1,0],[0,1],[0,-1],[-1,-1],[1,-1],[-1,1],[1,1]],a=(e,o)=>{let t=0;for(let i of c)void 0!==n[e+i[0]]&&void 0!==n[o+i[1]]&&1===l[e+i[0]][o+i[1]]&&(t+=1);if(n[e][o]=t,0===t)for(let t of c)void 0!==n[e+t[0]]&&(-1===n[e+t[0]][o+t[1]]||9===n[e+t[0]][o+t[1]]||10===n[e+t[0]][o+t[1]])&&a(e+t[0],o+t[1])},_=JSON.parse(JSON.stringify(l)),d=JSON.parse(JSON.stringify(e)),f=-1;for(let o of e){f+=1;let e=-1;for(let t of o)e+=1,2===t?n[f][e]=9:3===t?n[f][e]=10:1===t&&0===l[f][e]&&a(f,e)}let u=(n,t)=>{if(!l.some((o,n)=>o.some((o,t)=>1===o&&1===e[n][t]))){d[n][t]=1,o(d);let e=()=>{let o=Math.floor(9*Math.random()),n=Math.floor(9*Math.random());0===_[n][o]?_[n][o]=1:e()};if(_.some(e=>e.includes(1)));else{console.log(t,n);for(let e=-1;e<2;e++)for(let o=-1;o<2;o++)void 0!==_[n+e]&&(_[n+e][t+o]=1);for(let o=1;o<11;o+=1)e();for(let e=-1;e<2;e++)for(let o=-1;o<2;o++)void 0!==_[n+e]&&(_[n+e][t+o]=0)}}s(_)};if(console.log("newBombMap"),console.table(_),console.log("board"),console.table(n),console.log("newUserInputs"),console.table(d),l.some((o,n)=>o.some((o,t)=>1===o&&1===e[n][t])))for(let o=0;o<9;o++)for(let t=0;t<9;t++)1===l[o][t]&&(n[o][t]=11,1===e[o][t]&&(n[o][t]=111));let x=(t,i)=>{switch(e[i][t]){case 0:d[i][t]=2,n[i][t]=9;break;case 2:d[i][t]=3,n[i][t]=10;break;case 3:d[i][t]=0,n[i][t]=-1}o(d)};return(0,t.jsxs)("div",{className:r().container,children:[(0,t.jsx)("div",{className:r().containerBorder,children:(0,t.jsx)("div",{className:r().cell,style:{}})}),(0,t.jsx)("div",{className:r().board,children:n.map((e,o)=>e.map((e,n)=>(0,t.jsx)("div",{className:r().cell,onClick:()=>u(o,n),style:{backgroundPosition:-30*(e%100)+30,backgroundColor:111===e?"#f00":"#0000"},children:-1===e&&(0,t.jsx)("div",{className:r().stone,onContextMenu:e=>{e.preventDefault(),x(n,o)}})},"".concat(n,"-").concat(o,"}"))))})]})};o.default=s},2729:function(e){e.exports={container:"index_container__gnN1f",containerBorder:"index_containerBorder__xJ46B",board:"index_board__2d6xe",picture:"index_picture__3USzY",cell:"index_cell__3W8ZQ",stone:"index_stone__oeDmm",main:"index_main__kAcUb",footer:"index_footer__qq_p6",title:"index_title__gEapU",description:"index_description__087sm",code:"index_code__VeCgy",grid:"index_grid__FmmIe",card:"index_card__kAxi6",logo:"index_logo__FcDOZ"}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);