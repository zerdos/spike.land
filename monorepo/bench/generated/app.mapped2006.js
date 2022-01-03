  import { h, Component, render } from 'lib/preact.js?n=2006';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2006!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  