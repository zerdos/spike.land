  import { h, Component, render } from './preact.js?n=6529';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6529!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  