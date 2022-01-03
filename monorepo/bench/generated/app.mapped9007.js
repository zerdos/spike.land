  import { h, Component, render } from 'lib/preact.js?n=9007';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9007!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  