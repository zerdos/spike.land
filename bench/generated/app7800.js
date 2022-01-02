  import { h, Component, render } from './preact.js?n=7800';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7800!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  