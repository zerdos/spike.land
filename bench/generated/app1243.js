  import { h, Component, render } from './preact.js?n=1243';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1243!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  