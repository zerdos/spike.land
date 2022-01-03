  import { h, Component, render } from './preact.js?n=8472';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8472!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  