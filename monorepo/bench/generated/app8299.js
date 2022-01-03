  import { h, Component, render } from './preact.js?n=8299';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8299!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  