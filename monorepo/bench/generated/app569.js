  import { h, Component, render } from './preact.js?n=569';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 569!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  