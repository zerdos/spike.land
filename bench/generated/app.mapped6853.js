  import { h, Component, render } from 'lib/preact.js?n=6853';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6853!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  