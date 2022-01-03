  import { h, Component, render } from './preact.js?n=1464';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1464!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  