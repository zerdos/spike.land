  import { h, Component, render } from 'lib/preact.js?n=5819';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5819!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  