  import { h, Component, render } from 'lib/preact.js?n=4321';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4321!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  