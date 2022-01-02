  import { h, Component, render } from 'lib/preact.js?n=5283';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5283!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  