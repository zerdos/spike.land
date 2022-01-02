  import { h, Component, render } from './preact.js?n=1485';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1485!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  