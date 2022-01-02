  import { h, Component, render } from './preact.js?n=8565';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8565!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  