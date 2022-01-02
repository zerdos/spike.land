  import { h, Component, render } from 'lib/preact.js?n=1309';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1309!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  