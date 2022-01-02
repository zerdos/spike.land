  import { h, Component, render } from './preact.js?n=3589';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3589!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  