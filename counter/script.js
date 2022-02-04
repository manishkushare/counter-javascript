let store = Redux.createStore(reducer);

let counter = store.getState();

const h1 = document.querySelector('h1');
const increment = document.querySelector('.increment');
const decrement = document.querySelector('.decrement');
const reset = document.querySelector('.reset');
const step = document.querySelectorAll('.step');
const limit = document.querySelectorAll('.limit');

h1.innerText = counter;


let stepValue;
for (let i = 0; i < step.length; i++) {
  step[i].addEventListener('click', (event) => {
    stepValue = Number(event.target.value);
  });
}


let limitValue;
for (let i = 0; i < limit.length; i++) {
  limit[i].addEventListener('click', (event) => {
    console.log(Number(event.target.value));
    limitValue = Number(event.target.value);
  });
}

// Dispatching action
increment.addEventListener('click', () => {
  store.dispatch({
    type: 'increment',
    step: stepValue || 1,
    limit: limitValue || Infinity,
  });
});

decrement.addEventListener('click', () => {
  store.dispatch({
    type: 'decrement',
    step: stepValue || 1,
    limit: limitValue || Infinity,
  });
});

reset.addEventListener('click', () => {
  store.dispatch({ type: 'reset' });
});

// Subscribing state
store.subscribe(() => {
  counter = store.getState();
  h1.innerText = counter;
});

// Reducer Function
function reducer(state = 0, action) {
  switch (action.type) {
    case 'increment':
      return state + (action.limit > counter ? (action.step) : 0);
    case 'decrement':
      return state - (action.limit > counter ? (action.step) : 0);
    case 'reset':
      return 0;
    default:
      return state;
  }
}
