  import { h, Component, render } from 'lib/preact.js?n=4922';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4922!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  