  import { h, Component, render } from 'lib/preact.js?n=1810';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1810!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  