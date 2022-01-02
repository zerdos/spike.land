  import { h, Component, render } from 'lib/preact.js?n=7875';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7875!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  