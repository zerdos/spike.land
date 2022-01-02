  import { h, Component, render } from 'lib/preact.js?n=5248';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5248!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  