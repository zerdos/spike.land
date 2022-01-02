  import { h, Component, render } from 'lib/preact.js?n=1089';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1089!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  