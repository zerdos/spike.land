  import { h, Component, render } from 'lib/preact.js?n=4821';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4821!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  