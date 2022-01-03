  import { h, Component, render } from 'lib/preact.js?n=1677';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1677!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  