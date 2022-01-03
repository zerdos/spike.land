  import { h, Component, render } from './preact.js?n=8608';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8608!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  