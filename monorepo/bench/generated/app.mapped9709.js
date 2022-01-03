  import { h, Component, render } from 'lib/preact.js?n=9709';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9709!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  