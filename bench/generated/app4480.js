  import { h, Component, render } from './preact.js?n=4480';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4480!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  