  import { h, Component, render } from 'lib/preact.js?n=7567';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7567!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  