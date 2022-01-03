  import { h, Component, render } from 'lib/preact.js?n=9918';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9918!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  