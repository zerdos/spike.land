  import { h, Component, render } from './preact.js?n=8785';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8785!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  