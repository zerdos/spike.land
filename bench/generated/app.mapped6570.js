  import { h, Component, render } from 'lib/preact.js?n=6570';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6570!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  