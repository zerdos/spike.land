  import { h, Component, render } from 'lib/preact.js?n=6835';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6835!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  