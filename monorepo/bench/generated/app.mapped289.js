  import { h, Component, render } from 'lib/preact.js?n=289';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 289!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  