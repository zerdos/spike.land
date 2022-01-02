  import { h, Component, render } from 'lib/preact.js?n=1850';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1850!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  