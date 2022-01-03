  import { h, Component, render } from 'lib/preact.js?n=5192';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5192!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  