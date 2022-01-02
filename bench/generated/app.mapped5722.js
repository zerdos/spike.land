  import { h, Component, render } from 'lib/preact.js?n=5722';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5722!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  