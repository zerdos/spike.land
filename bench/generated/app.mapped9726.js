  import { h, Component, render } from 'lib/preact.js?n=9726';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9726!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  