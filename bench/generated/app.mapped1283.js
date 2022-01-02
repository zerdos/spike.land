  import { h, Component, render } from 'lib/preact.js?n=1283';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1283!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  