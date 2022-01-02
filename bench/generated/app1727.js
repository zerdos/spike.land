  import { h, Component, render } from './preact.js?n=1727';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1727!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  