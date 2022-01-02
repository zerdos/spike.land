  import { h, Component, render } from './preact.js?n=1096';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1096!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  