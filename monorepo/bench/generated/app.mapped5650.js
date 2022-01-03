  import { h, Component, render } from 'lib/preact.js?n=5650';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5650!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  