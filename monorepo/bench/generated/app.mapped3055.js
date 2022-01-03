  import { h, Component, render } from 'lib/preact.js?n=3055';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3055!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  