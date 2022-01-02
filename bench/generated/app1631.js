  import { h, Component, render } from './preact.js?n=1631';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1631!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  