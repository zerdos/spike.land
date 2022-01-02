  import { h, Component, render } from './preact.js?n=3352';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3352!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  