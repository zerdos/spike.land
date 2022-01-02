  import { h, Component, render } from './preact.js?n=7587';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7587!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  