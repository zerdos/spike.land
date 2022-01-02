  import { h, Component, render } from './preact.js?n=8855';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8855!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  