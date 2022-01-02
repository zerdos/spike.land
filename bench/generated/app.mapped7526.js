  import { h, Component, render } from 'lib/preact.js?n=7526';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7526!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  