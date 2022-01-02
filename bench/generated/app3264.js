  import { h, Component, render } from './preact.js?n=3264';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3264!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  