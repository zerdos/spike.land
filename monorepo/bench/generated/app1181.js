  import { h, Component, render } from './preact.js?n=1181';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1181!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  