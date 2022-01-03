  import { h, Component, render } from 'lib/preact.js?n=3069';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3069!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  