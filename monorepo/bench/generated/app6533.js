  import { h, Component, render } from './preact.js?n=6533';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6533!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  