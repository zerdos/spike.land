  import { h, Component, render } from './preact.js?n=1549';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1549!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  