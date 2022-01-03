  import { h, Component, render } from './preact.js?n=4287';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4287!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  