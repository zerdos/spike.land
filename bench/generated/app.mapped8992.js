  import { h, Component, render } from 'lib/preact.js?n=8992';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8992!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  