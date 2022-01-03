  import { h, Component, render } from 'lib/preact.js?n=6825';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6825!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  