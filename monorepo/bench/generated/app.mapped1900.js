  import { h, Component, render } from 'lib/preact.js?n=1900';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1900!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  