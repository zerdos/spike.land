  import { h, Component, render } from 'lib/preact.js?n=13';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 13!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  