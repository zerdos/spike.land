  import { h, Component, render } from 'lib/preact.js?n=5812';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5812!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  