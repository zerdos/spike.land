  import { h, Component, render } from 'lib/preact.js?n=5299';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5299!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  