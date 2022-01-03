  import { h, Component, render } from 'lib/preact.js?n=2726';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2726!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  