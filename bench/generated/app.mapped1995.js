  import { h, Component, render } from 'lib/preact.js?n=1995';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1995!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  