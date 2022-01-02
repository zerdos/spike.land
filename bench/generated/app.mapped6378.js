  import { h, Component, render } from 'lib/preact.js?n=6378';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6378!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  