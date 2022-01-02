  import { h, Component, render } from 'lib/preact.js?n=7828';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7828!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  