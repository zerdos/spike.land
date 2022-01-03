  import { h, Component, render } from './preact.js?n=5689';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5689!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  