  import { h, Component, render } from 'lib/preact.js?n=5305';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5305!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  