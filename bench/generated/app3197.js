  import { h, Component, render } from './preact.js?n=3197';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3197!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  