  import { h, Component, render } from 'lib/preact.js?n=4152';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4152!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  