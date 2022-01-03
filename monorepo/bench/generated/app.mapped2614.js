  import { h, Component, render } from 'lib/preact.js?n=2614';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2614!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  