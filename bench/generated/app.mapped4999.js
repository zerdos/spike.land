  import { h, Component, render } from 'lib/preact.js?n=4999';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4999!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  