  import { h, Component, render } from 'lib/preact.js?n=2246';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2246!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  