  import { h, Component, render } from './preact.js?n=8587';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8587!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  