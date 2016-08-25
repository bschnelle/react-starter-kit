// Actions
const INCREMENT = 'counter/INCREMENT';

// Reducer
export default (state = { count: 10 }, action) => {
  if (action.type === INCREMENT) {
    return { count: state.count + action.increment };
  }
  return state;
};

// Action Creators
export function increment() {
  return { type: INCREMENT, increment: 2 };
}
