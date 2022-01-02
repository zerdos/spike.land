  import { h, Component, render } from './preact.js?n=5483';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5483!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  