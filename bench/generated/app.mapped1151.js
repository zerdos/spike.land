  import { h, Component, render } from 'lib/preact.js?n=1151';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1151!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  