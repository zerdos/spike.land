  import { h, Component, render } from './preact.js?n=559';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 559!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  