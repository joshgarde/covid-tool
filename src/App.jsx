import React, {Component} from "react";
import Results from './Results';

const REQUIRED_SELECT_TEXT = "This field is a required yes/no question";

class App extends Component {
  state = {
    page: 0,
    errors: {},
    checked: {}
  }

  constructor(props) {
    super(props);
    this.renderError = this.renderError.bind(this);
    this.renderProgressBar = this.renderProgressBar.bind(this);
    this.hasError = this.hasError.bind(this);
    this.incrementPage = this.incrementPage.bind(this);
    this.validatePage1 = this.validatePage1.bind(this);
    this.validatePage2 = this.validatePage2.bind(this);
    this.validatePage3 = this.validatePage3.bind(this);
    this.radioboxUpdate = this.radioboxUpdate.bind(this);
    this.isChecked = this.isChecked.bind(this);

    this.data = {};
  }

  renderProgressBar() {
    if (this.state.page < 4) {
      return <progress class="progress is-link mb-4" value={this.state.page} max="4"></progress>;
    }
  }

  render() {
    return (
      <div className="app">
        <section className="hero is-primary is-bold">
          <div class="">
            <div className="hero-body container">
              <p className="title">COVID-19 Risk Assessment Tool</p>
              <p className="subtitle">A CS4800 Project</p>
            </div>
          </div>
        </section>
        <section className="section">
          <div class="columns is-mobile">
            <div class="column is-half is-offset-one-quarter">
              {this.renderProgressBar()}
              {this.renderPage()}
            </div>
          </div>
        </section>
      </div>
    )
  }

  incrementPage(e) {
    this.setState({page: this.state.page + 1});
  }

  renderError(target) {
    if (this.state.errors.hasOwnProperty(target)) {
      return (<p className="help is-danger">{this.state.errors[target]}</p>)
    }
  }

  hasError(target) {
    if (this.state.errors.hasOwnProperty(target)) {
      return 'is-danger';
    }
  }

  radioboxUpdate(e) {
    let el = e.target;

    let checked = this.state.checked;
    checked[el.name] = (el.value === 'true');
    this.setState({checked});
  }

  isChecked(value, target) {
    if (!this.state.checked.hasOwnProperty(target))
      return false;

    return this.state.checked[target] === value;
  }

  renderPage() {
    switch (this.state.page) {
      case 0:
        return (
          <div>
            <h1 className="is-size-4 mb-4">Introduction</h1>

            <p>
              Hello! Welcome to the COVID-19 Risk Assessment tool. This tool
              was designed to provide a general indicator of the risk that
              individuals may have to COVID-19. It is not meant for use in
              diagnostic settings nor is it meant to be used as a factor in
              medical treatments. Please contact a medical professional if you
              believe you may have contracted COVID-19. None of your data will
              be permanently saved to our servers. Some anonymous usage data
              may be collected to help improve our services.
              <br/><br/>
              By clicking next, you have agreed to our terms of service and
              acknowledge the above text.
            </p>

            <div className="buttons is-right">
              <button className="button is-info" onClick={this.incrementPage}>Next</button>
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <h1 className="is-size-4 mb-4">General Information</h1>

            <div className="field">
              <label className="label">Age</label>
              <div className="control">
                <input id="age" className={`input ${this.hasError('age')}`} type="number" />
                {this.renderError('age')}
              </div>
            </div>

            <div className="field">
              <label className="label">Heart Rate</label>
              <div className="control">
                <input id="pulse" className={`input ${this.hasError('pulse')}`} type="number" />
                {this.renderError('pulse')}
              </div>
            </div>

            <div className="field">
              <label className="label">Body Temperature</label>
              <div className="control">
                <input id="temperature" className={`input ${this.hasError('temperature')}`} type="number" />
                {this.renderError('temperature')}
              </div>
            </div>

            <div className="buttons is-right">
              <button className="button is-info" onClick={this.validatePage1}>Next</button>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h1 className="is-size-4 mb-4">Patient History</h1>

            <div className="field">
              <label className="label">Are you in a high risk occupation?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="high_risk_exposure_occupation" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'high_risk_exposure_occupation')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="high_risk_exposure_occupation" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'high_risk_exposure_occupation')} /> No
                </label>
                {this.renderError('high_risk_exposure_occupation')}
              </div>
            </div>

            <div className="field">
              <label className="label">Have you had high risk encounters?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="high_risk_interactions" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'high_risk_interactions')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="high_risk_interactions" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'high_risk_interactions')} /> No
                </label>
                {this.renderError('high_risk_interactions')}
              </div>
            </div>

            <div className="field">
              <label className="label">Are you diagnosed with diabetes?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="diabetes" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'diabetes')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="diabetes" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'diabetes')} /> No
                </label>
                {this.renderError('diabetes')}
              </div>
            </div>

            <div className="field">
              <label className="label">Are you diagnosed with congenital heart defects (CHD)?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="chd" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'chd')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="chd" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'chd')} /> No
                </label>
                {this.renderError('chd')}
              </div>
            </div>

            <div className="field">
              <label className="label">Are you diagnosed with hypertension (HTN)?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="htn" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'htn')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="htn" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'htn')} /> No
                </label>
                {this.renderError('htn')}
              </div>
            </div>

            <div className="field">
              <label className="label">Are you diagnosed with cancer?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="cancer" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'cancer')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="cancer" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'cancer')} /> No
                </label>
                {this.renderError('cancer')}
              </div>
            </div>

            <div className="field">
              <label className="label">Are you diagnosed with asthma?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="asthma" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'asthma')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="asthma" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'asthma')} /> No
                </label>
                {this.renderError('asthma')}
              </div>
            </div>

            <div className="field">
              <label className="label">Are you diagnosed with chronic obstructive pulmonary disease (COPD)?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="copd" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'copd')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="copd" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'copd')} /> No
                </label>
                {this.renderError('copd')}
              </div>
            </div>

            <div className="field">
              <label className="label">Are you diagnosed with an autoimmune disease?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="autoimmune_dis" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'autoimmune_dis')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="autoimmune_dis" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'autoimmune_dis')} /> No
                </label>
                {this.renderError('autoimmune_dis')}
              </div>
            </div>

            <div className="field">
              <label className="label">Are you a smoker?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="smoker" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'smoker')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="smoker" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'smoker')} /> No
                </label>
                {this.renderError('smoker')}
              </div>
            </div>

            <div className="buttons is-right">
              <button className="button is-info" onClick={this.validatePage2}>Next</button>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h1 className="is-size-4 mb-5">Symptoms</h1>
            <div className="field">
              <label className="label">Are you having labored respiration?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="labored_respiration" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'labored_respiration')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="labored_respiration" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'labored_respiration')} /> No
                </label>
              </div>
            </div>

            <div className="field">
              <label className="label">Are you coughing?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="cough" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'cough')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="cough" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'cough')} /> No
                </label>
              </div>
            </div>

            <div className="field">
              <label className="label">Do you have a fever?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="fever" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'fever')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="fever" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'fever')} /> No
                </label>
              </div>
            </div>

            <div className="field">
              <label className="label">Are you having shortness of breath?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="sob" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'sob')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="sob" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'sob')} /> No
                </label>
              </div>
            </div>

            <div className="field">
              <label className="label">Are you having diarrhea?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="diarrhea" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'diarrhea')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="diarrhea" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'diarrhea')} /> No
                </label>
              </div>
            </div>

            <div className="field">
              <label className="label">Are you fatigued?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="fatigue" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'fatigue')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="fatigue" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'fatigue')} /> No
                </label>
              </div>
            </div>

            <div className="field">
              <label className="label">Do you have a headache?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="headache" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'headache')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="headache" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'headache')} /> No
                </label>
              </div>
            </div>

            <div className="field">
              <label className="label">Have you lost your sense of smell?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="loss_of_smell" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'loss_of_smell')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="loss_of_smell" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'loss_of_smell')} /> No
                </label>
              </div>
            </div>

            <div className="field">
              <label className="label">Have you lost your sense of taste?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="loss_of_taste" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'loss_of_taste')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="loss_of_taste" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'loss_of_taste')} /> No
                </label>
              </div>
            </div>

            <div className="field">
              <label className="label">Do you have a runny nose?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="runny_nose" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'runny_nose')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="runny_nose" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'runny_nose')} /> No
                </label>
              </div>
            </div>

            <div className="field">
              <label className="label">Do you have sore muscles?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="muscle_sore" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'muscle_sore')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="muscle_sore" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'muscle_sore')} /> No
                </label>
              </div>
            </div>

            <div className="field">
              <label className="label">Do you have a sore throat?</label>
              <div className="control">
                <label className="radio">
                  <input type="radio" name="sore_throat" value="true" onChange={this.radioboxUpdate} checked={this.isChecked(true, 'sore_throat')} /> Yes
                </label>
                <label className="radio">
                  <input type="radio" name="sore_throat" value="false" onChange={this.radioboxUpdate} checked={this.isChecked(false, 'sore_throat')} /> No
                </label>
              </div>
            </div>

            <div className="buttons is-right">
              <button className="button is-info" onClick={this.validatePage3}>Next</button>
            </div>
          </div>
        )

      case 4:
        return <Results data={this.data}/>;
    }
  }

  validatePage1() {
    let ageEl = document.getElementById('age');
    let temperatureEl = document.getElementById('temperature');
    let pulseEl = document.getElementById('pulse');

    let age = parseInt(ageEl.value);
    let temperature = parseFloat(temperatureEl.value);
    let pulse = parseInt(pulseEl.value);

    let error = false;
    let errors = this.state.errors;

    if (age < 18 || age > 100) {
      errors['age'] = 'Age should be between 18-100';
      error = true;
    } else {
      delete errors['age'];
    }

    if (temperature < 33.5 || temperature > 39.6) {
      errors['temperature'] = 'Temperature should be between 33.5-39.6';
      error = true;
    } else {
      delete errors['temperature'];
    }

    if (pulse < 35 || pulse > 160) {
      errors['pulse'] = 'Pulse should be between 35-160';
      error = true;
    } else {
      delete errors['pulse'];
    }

    this.setState({errors});

    if (!error) {
      this.data = {...this.data, ...{age, temperature, pulse}};

      this.setState({page: this.state.page + 1});
    }
  }

  validatePage2() {
    const fields = [
      'high_risk_exposure_occupation',
      'high_risk_interactions',
      'diabetes',
      'chd',
      'htn',
      'cancer',
      'asthma',
      'copd',
      'autoimmune_dis',
      'smoker'
    ];

    const vals = {};
    let error = false;
    let errors = this.state.errors;

    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      let el = document.querySelector(`input[name="${field}"]:checked`);

      if (el === null) {
        errors[field] = REQUIRED_SELECT_TEXT;
        error = true;
      } else {
        delete errors[field];
        vals[field] = (el.value === 'true');
      }
    }

    this.setState({errors})

    if (!error) {
      this.setState({page: this.state.page + 1});
      this.data = {...this.data, ...vals};
    }
  }

  validatePage3() {
    const fields = [
      'labored_respiration',
      'cough',
      'fever',
      'sob',
      'diarrhea',
      'fatigue',
      'headache',
      'loss_of_smell',
      'loss_of_taste',
      'runny_nose',
      'muscle_sore',
      'sore_throat'
    ];

    const vals = {};
    let error = false;
    let errors = this.state.errors;

    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      let el = document.querySelector(`input[name="${field}"]:checked`);

      if (el === null) {
        errors[field] = REQUIRED_SELECT_TEXT;
        error = true;
      } else {
        delete errors[field];
        vals[field] = (el.value === 'true');
      }
    }

    this.setState({errors})

    if (!error) {
      this.setState({page: this.state.page + 1});
      this.data = {...this.data, ...vals};
    }
  }
}

export default App;
