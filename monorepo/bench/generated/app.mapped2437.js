  import { h, Component, render } from 'lib/preact.js?n=2437';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2437!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  