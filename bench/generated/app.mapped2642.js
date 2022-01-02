  import { h, Component, render } from 'lib/preact.js?n=2642';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2642!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  