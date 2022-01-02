  import { h, Component, render } from './preact.js?n=4502';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4502!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  