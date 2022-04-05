(()=>{var t={185:t=>{t.exports={Result:class{count;difference;differencePercent;score;sum;target;units;constructor(t,e){this.target=t,this.units=JSON.parse(JSON.stringify(e));const n=e.reduce(((t,e)=>t+e),0),r=e.length,i=n-t,s=n/t-1;this.sum=n,this.count=r,this.difference=i,this.differencePercent=s,this.score=0===i?(Math.pow(2,53)-1)/e.length:Math.abs(1/r/s)}simplePrint(){return`${String(this.sum).padEnd(6," ")}${String(this.difference).padStart(5," ").padEnd(8," ")}${this.units.reduce(((t,e)=>t+String(e).padEnd(5," ")),"")}`}detailPrint(){return`${this.target}\t${this.sum}\t${this.difference}\t${String(this.differencePercent).padEnd(22," ")}\t${this.units[0]}\t${this.count}\t${this.score}`}}}},573:t=>{t.exports={Unit:class{_unit;_quantity;_multiples;constructor(t,e){this._unit=t,this._quantity=e;for(let n=1,r=t;n<=e&&r<=MAX_UNIT_VALUE;n++)this._multiples.push(r),r+=t}get unit(){return this._unit}set unit(t){this._unit=t}get quantity(){return this._quantity}set quantity(t){this._quantity=t}get multiples(){return this._multiples}set multiples(t){this._multiples=t}}}},61:t=>{const e=Math.round(10*(1-1.1))/10,n=Math.round(10*(1-.9))/10;t.exports={MAX_UNIT_VALUE:5e3,LOW_PART:.9,HIGH_PART:1.1,LOW_THRESHOLD:e,HIGH_THRESHOLD:n}},523:(t,e,n)=>{const{factorUnits:r}=n(785),{Unit:i}=n(573),{Result:s}=n(185);t.exports={search:function(t,e){t=t<=0||void 0===t?500:t;const n=[];return(e="object"==typeof e&&e instanceof Array?e:r).forEach((e=>{const r=e.multiples,i=r[0];r.forEach(((e,r)=>{let u=r+1,o=Array.from({length:u},(t=>i)),a=new s(t,o);n.push(a)}))})),n.sort(((t,e)=>e.score-t.score)),n}}},785:(t,e,n)=>{const{Unit:r}=n(573),i=[{unit:533,quantity:4},{unit:535,quantity:3},{unit:536,quantity:1},{unit:540,quantity:6},{unit:554,quantity:1},{unit:565,quantity:2},{unit:576,quantity:2},{unit:1097,quantity:4},{unit:1100,quantity:4},{unit:1155,quantity:2}].map((t=>new r(t.unit,t.quantity)));t.exports={factorUnits:i}}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var s=e[r]={exports:{}};return t[r](s,s.exports,n),s.exports}(()=>{const{search:t}=n(523),{Result:e}=n(185),{MAX_UNIT_VALUE:r,LOW_PART:i,HIGH_PART:s,LOW_THRESHOLD:u,HIGH_THRESHOLD:o}=n(61),a=document.getElementById("factorResults"),c=document.getElementById("newTargetInput"),l=document.getElementById("targetValue"),d=document.getElementById("minValue"),f=document.getElementById("maxValue"),h=document.getElementById("resultsInRange"),p=document.createElement("tr"),g=document.createElement("td");var m,y=["Backspace","Alt","Control","Shift","End","ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Delete","Home","PageUp","PageDown","Insert","Tab","Escape"],E=parseInt(c.value,10);const _=()=>{E=parseInt(c.value,10),m=t(E),l.textContent=E,console.log(u,o),d.textContent=Math.ceil(E*i),f.textContent=Math.floor(E*s),a.innerHTML="";const n=m.filter((t=>t.differencePercent<=-.1));for(let t=0;t<n.length;t++)for(let r=t+1;r<n.length;r++){if(t===r)continue;let i=n[t].sum+n[r].sum,s=(E-i)/E;s<.1&&s>-.1&&m.push(new e(E,[...n[t].units,...n[r].units]))}(m=(m=m.filter((t=>t.differencePercent<.1))).filter(((t,e,n)=>{let r=JSON.stringify(t);for(let t=e+1;t<n.length;t++)if(t!==e&&JSON.stringify(n[t])===r)return!1;return!0}))).sort(((t,e)=>e.score-t.score));const y=m.filter((t=>t.differencePercent>-.1&&t.sum<=r));let _,v=!0;y.length<1?(_=JSON.parse(JSON.stringify(n)),v=!1,h.textContent=0):_=JSON.parse(JSON.stringify(y));const x=[];_.forEach((t=>{let{count:e}=t;x.every((t=>t.count!==e))&&x.push(t)})),v&&(h.textContent=x.length),x.forEach((t=>{const e=p.cloneNode(),n=g.cloneNode(),r=g.cloneNode(),i=g.cloneNode(),s=g.cloneNode();n.textContent=t.sum,r.textContent=`${t.difference} (${(100*t.differencePercent).toPrecision(3)}%)`,i.textContent=t.units.length,s.textContent=t.units.join(", "),e.appendChild(n),e.appendChild(r),e.appendChild(i),e.appendChild(s),a.appendChild(e)}))};c.addEventListener("keydown",(t=>{y.includes(t.key)||null!==t.key.match(/\d+/gi)||(t.preventDefault(),console.log(t),console.log(t.key))})),c.addEventListener("keyup",(t=>{if(t.target.value<400||t.target.value>5e3)return t.preventDefault(),!1;_()})),c.addEventListener("change",(t=>{if(t.target.value<400||t.target.value>5e3)return t.preventDefault(),!1;_()})),_()})()})();