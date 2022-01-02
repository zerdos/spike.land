  import { h, Component, render } from 'lib/preact.js?n=3336';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3336!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  