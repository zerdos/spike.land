  import { h, Component, render } from 'lib/preact.js?n=6676';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6676!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  