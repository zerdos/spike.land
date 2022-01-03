  import { h, Component, render } from './preact.js?n=7712';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7712!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  