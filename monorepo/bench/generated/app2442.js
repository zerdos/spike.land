  import { h, Component, render } from './preact.js?n=2442';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2442!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  