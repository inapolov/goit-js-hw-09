const submitEl = document.querySelector(".form");


submitEl.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const formElements = event.currentTarget.elements;
  let firstDelay = Number(formElements.delay.value);
  const delayStep = Number(formElements.step.value);
  const amount = Number(formElements.amount.value);

  for (let i = 1; i <= amount; i += 1) {

    createPromise(i, firstDelay).then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }).catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    firstDelay += delayStep;
  }
});


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}




