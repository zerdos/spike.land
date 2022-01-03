  import { h, Component, render } from 'lib/preact.js?n=1519';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1519!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  