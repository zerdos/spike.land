  import { h, Component, render } from 'lib/preact.js?n=1687';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1687!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  