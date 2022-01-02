  import { h, Component, render } from './preact.js?n=11';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 11!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  