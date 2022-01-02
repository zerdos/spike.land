  import { h, Component, render } from './preact.js?n=3956';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3956!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  