  import { h, Component, render } from 'lib/preact.js?n=1612';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1612!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  