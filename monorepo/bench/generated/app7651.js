  import { h, Component, render } from './preact.js?n=7651';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7651!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  