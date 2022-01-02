  import { h, Component, render } from './preact.js?n=9916';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9916!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  