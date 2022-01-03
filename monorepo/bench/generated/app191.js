  import { h, Component, render } from './preact.js?n=191';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 191!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  