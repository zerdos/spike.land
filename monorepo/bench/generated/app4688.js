  import { h, Component, render } from './preact.js?n=4688';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4688!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  