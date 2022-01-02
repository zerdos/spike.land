  import { h, Component, render } from 'lib/preact.js?n=1524';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1524!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  