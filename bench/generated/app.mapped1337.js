  import { h, Component, render } from 'lib/preact.js?n=1337';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1337!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  