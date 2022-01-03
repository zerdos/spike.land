  import { h, Component, render } from 'lib/preact.js?n=8464';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8464!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  