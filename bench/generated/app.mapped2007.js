  import { h, Component, render } from 'lib/preact.js?n=2007';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2007!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  