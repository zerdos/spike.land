  import { h, Component, render } from 'lib/preact.js?n=6305';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6305!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  