  import { h, Component, render } from './preact.js?n=2506';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2506!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  