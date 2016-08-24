import setHTML from './setHTML';

if (module.hot) {
  module.hot.accept('./setHTML', () => setHTML());
}

setHTML();
