  import { h, Component, render } from 'lib/preact.js?n=1968';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1968!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  