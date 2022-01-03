  import { h, Component, render } from './preact.js?n=8115';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8115!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  