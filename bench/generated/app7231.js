  import { h, Component, render } from './preact.js?n=7231';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7231!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  