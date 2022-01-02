  import { h, Component, render } from 'lib/preact.js?n=156';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 156!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  