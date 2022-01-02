  import { h, Component, render } from './preact.js?n=8666';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8666!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  