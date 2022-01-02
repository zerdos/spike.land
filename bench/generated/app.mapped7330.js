  import { h, Component, render } from 'lib/preact.js?n=7330';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7330!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  