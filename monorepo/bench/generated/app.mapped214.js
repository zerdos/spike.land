  import { h, Component, render } from 'lib/preact.js?n=214';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 214!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  