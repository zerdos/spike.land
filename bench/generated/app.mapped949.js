  import { h, Component, render } from 'lib/preact.js?n=949';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 949!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  