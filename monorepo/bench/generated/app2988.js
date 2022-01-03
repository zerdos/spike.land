  import { h, Component, render } from './preact.js?n=2988';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2988!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  