  import { h, Component, render } from './preact.js?n=5562';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5562!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  