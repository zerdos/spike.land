  import { h, Component, render } from 'lib/preact.js?n=7588';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7588!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  