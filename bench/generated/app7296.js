  import { h, Component, render } from './preact.js?n=7296';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7296!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  