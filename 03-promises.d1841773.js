!function(){function e(e,t){return new Promise(((o,n)=>{const r={position:e,delay:t};Math.random()>.3?o(r):n(r)}))}document.querySelector(".form").addEventListener("submit",(function(t){t.preventDefault();const{elements:{delay:o,step:n,amount:r}}=t.target;for(let t=1;t<=Number(r.value);t+=1){let r=Number(o.value)+Number(n.value)*(t-1);setTimeout((()=>{e(t,r).then((({position:e,delay:t})=>{console.log(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{console.log(`❌ Rejected promise ${e} in ${t}ms`)}))}),r)}t.currentTarget.reset()}))}();
//# sourceMappingURL=03-promises.d1841773.js.map