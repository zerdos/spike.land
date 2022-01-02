  import { h, Component, render } from './preact.js?n=6312';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6312!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  