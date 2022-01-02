  import { h, Component, render } from './preact.js?n=7478';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7478!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  