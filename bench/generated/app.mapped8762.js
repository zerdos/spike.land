  import { h, Component, render } from 'lib/preact.js?n=8762';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8762!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  