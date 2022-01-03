  import { h, Component, render } from './preact.js?n=9702';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9702!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  