  import { h, Component, render } from './preact.js?n=1449';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1449!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  