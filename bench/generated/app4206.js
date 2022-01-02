  import { h, Component, render } from './preact.js?n=4206';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4206!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  