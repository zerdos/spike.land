  import { h, Component, render } from 'lib/preact.js?n=3151';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3151!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  