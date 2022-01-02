  import { h, Component, render } from './preact.js?n=9143';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9143!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  