  import { h, Component, render } from './preact.js?n=1249';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1249!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  