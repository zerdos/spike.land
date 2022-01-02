  import { h, Component, render } from './preact.js?n=6426';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6426!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  