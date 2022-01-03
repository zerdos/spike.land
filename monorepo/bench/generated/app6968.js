  import { h, Component, render } from './preact.js?n=6968';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6968!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  