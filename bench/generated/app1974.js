  import { h, Component, render } from './preact.js?n=1974';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1974!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  