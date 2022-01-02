  import { h, Component, render } from 'lib/preact.js?n=1662';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1662!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  