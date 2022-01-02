  import { h, Component, render } from './preact.js?n=9302';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9302!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  