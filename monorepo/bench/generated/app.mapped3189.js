  import { h, Component, render } from 'lib/preact.js?n=3189';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3189!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  