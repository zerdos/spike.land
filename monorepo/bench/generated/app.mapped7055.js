  import { h, Component, render } from 'lib/preact.js?n=7055';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7055!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  