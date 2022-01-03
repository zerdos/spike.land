  import { h, Component, render } from './preact.js?n=3390';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3390!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  