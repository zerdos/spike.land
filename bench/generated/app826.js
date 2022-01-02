  import { h, Component, render } from './preact.js?n=826';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 826!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  