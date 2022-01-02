  import { h, Component, render } from './preact.js?n=1383';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1383!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  