  import { h, Component, render } from 'lib/preact.js?n=7869';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7869!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  