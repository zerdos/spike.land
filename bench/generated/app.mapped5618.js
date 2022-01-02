  import { h, Component, render } from 'lib/preact.js?n=5618';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5618!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  