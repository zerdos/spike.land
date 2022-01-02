  import { h, Component, render } from 'lib/preact.js?n=5009';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5009!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  