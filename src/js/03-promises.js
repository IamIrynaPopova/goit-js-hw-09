
const formEl = document.querySelector('.form');
formEl.addEventListener('submit', getData);

function getData(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.target;

  for (let i= 1; i <= Number(amount.value); i += 1) {
    let stepPromise = Number(delay.value) + Number(step.value) * (i - 1);
   setTimeout(() => {
     createPromise(i, stepPromise)
       .then(({ position, delay }) => {
         console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
       })
       .catch(({ position, delay }) => {
         console.log(`❌ Rejected promise ${position} in ${delay}ms`);
       });
   }, stepPromise);
  }
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const newPromise = { position, delay };
    console.log(newPromise);
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      resolve(newPromise);
    } else {
      // Reject
      reject(newPromise);
    }
  });
}
