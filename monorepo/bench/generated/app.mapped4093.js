  import { h, Component, render } from 'lib/preact.js?n=4093';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4093!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  