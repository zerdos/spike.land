  import { h, Component, render } from 'lib/preact.js?n=2410';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2410!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  