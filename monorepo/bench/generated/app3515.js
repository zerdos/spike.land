  import { h, Component, render } from './preact.js?n=3515';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3515!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  