  import { h, Component, render } from 'lib/preact.js?n=5611';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5611!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  