  import { h, Component, render } from 'lib/preact.js?n=6047';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6047!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  