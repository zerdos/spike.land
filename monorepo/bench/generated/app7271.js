  import { h, Component, render } from './preact.js?n=7271';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7271!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  