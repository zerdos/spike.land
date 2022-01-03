  import { h, Component, render } from 'lib/preact.js?n=8508';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8508!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  