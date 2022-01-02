  import { h, Component, render } from 'lib/preact.js?n=1037';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1037!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  