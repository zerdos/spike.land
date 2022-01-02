  import { h, Component, render } from 'lib/preact.js?n=5162';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5162!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  