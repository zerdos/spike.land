  import { h, Component, render } from 'lib/preact.js?n=8156';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8156!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  