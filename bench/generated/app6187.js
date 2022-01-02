  import { h, Component, render } from './preact.js?n=6187';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6187!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  