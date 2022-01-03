  import { h, Component, render } from './preact.js?n=1663';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1663!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  