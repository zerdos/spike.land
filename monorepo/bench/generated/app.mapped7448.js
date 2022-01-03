  import { h, Component, render } from 'lib/preact.js?n=7448';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7448!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  