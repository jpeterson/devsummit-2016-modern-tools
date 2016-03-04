class App {
  constructor(props) {
    this.name = props;
  }

  sayHello(person) {
    return `Whats up ${person}! My name is ${this.name}`;
  }
}

window.App = App;
