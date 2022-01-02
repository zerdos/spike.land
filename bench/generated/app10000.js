  import { h, Component, render } from './preact.js?n=10000';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 10000!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  