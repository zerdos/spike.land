  import { h, Component, render } from './preact.js?n=4161';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4161!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  