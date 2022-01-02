  import { h, Component, render } from 'lib/preact.js?n=1616';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1616!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  