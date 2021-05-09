import React, {Component} from "react";

export default class App extends Component {
  state = {
    prediction: 0
  }

  constructor(props) {
    super(props);

    this.getProgressBarColor = this.getProgressBarColor.bind(this);
    this.getExplainerText = this.getExplainerText.bind(this);
  }

  async componentDidMount() {
    let data = this.props.data;

    let response = await fetch('https://covid.joshgarde.com/nn-submit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });

    let body = await response.json();
    this.setState({prediction: Math.round(body.prediction * 100) / 100});
  }

  getProgressBarColor() {
    let prediction = this.state.prediction;
    console.log(prediction)

    if (prediction < 0.25) {
      return 'is-primary';
    } else if (prediction < 0.5) {
      return 'is-warning';
    } else {
      return 'is-danger';
    }
  }

  getExplainerText() {
    let prediction = this.state.prediction;

    if (prediction < 0.25) {
      return (
        'You are at a low-risk of contracting COVID-19. Despite this, the CDC ' +
        'still recommends that individuals practice social distancing when ' +
        'possible and to wear a mask while indoors to prevent the spread to ' +
        'higher risk individuals.'
      );
    } else if (prediction < 0.5) {
      return (
        'You are at an elevated risk of contracting COVID-19. The CDC recommends ' +
        'practicing social distancing when possible and to wear a mask while ' +
        'indoors and around other individuals.'
      );
    } else {
      return (
        'You are at a high risk of contracting COVID-19. The CDC recommends ' +
        'practicing social distancing when possible and to wear a mask while ' +
        'indoors and around other individuals.'
      );
    }
  }

  render() {
    return (
      <div>
        <section class="hero">
          <div class="hero-body">
            <p class="title has-text-centered mb-6">Risk Assessment Results</p>
            <p class="subtitle has-text-centered is-size-1">{this.state.prediction * 100}%</p>
            <progress class={`progress mb-6 ${this.getProgressBarColor()}`} value={this.state.prediction * 100} max="100">{this.state.prediction * 100}%</progress>
            {this.getExplainerText()}
            <br/><br/>
            Thanks for using the COVID-19 Risk Assessment tool!
          </div>
        </section>
      </div>
    )
  }
}
