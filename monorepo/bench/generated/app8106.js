  import { h, Component, render } from './preact.js?n=8106';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8106!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  