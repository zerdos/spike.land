  import { h, Component, render } from 'lib/preact.js?n=3795';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3795!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  