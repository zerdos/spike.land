  import { h, Component, render } from './preact.js?n=3523';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3523!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  