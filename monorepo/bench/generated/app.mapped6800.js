  import { h, Component, render } from 'lib/preact.js?n=6800';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6800!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  