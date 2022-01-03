  import { h, Component, render } from 'lib/preact.js?n=2278';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2278!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  