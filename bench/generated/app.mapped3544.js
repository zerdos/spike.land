  import { h, Component, render } from 'lib/preact.js?n=3544';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3544!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  