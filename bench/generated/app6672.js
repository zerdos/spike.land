  import { h, Component, render } from './preact.js?n=6672';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6672!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  