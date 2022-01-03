  import { h, Component, render } from 'lib/preact.js?n=575';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 575!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  