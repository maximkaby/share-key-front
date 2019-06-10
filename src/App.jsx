import React, {Component} from 'react';
import './socket/Listeners';
import {newMessage} from "./socket/Emiters"
import {getSecretsRequest, saveSecretRequest} from "./requests"
import {getSecretExt, setSecretExt} from "./socket/Emiters"

class App extends Component {

  state = {
    name: '',
    secret: '',
    partSecrets: [],
    recoveredKey: ''
  }

  handleMessage() {
    newMessage();
  }

  getSecretFromServer() {
    getSecretsRequest()
      .then(res => res.json())
      .then(res => {
        const keys = res.slice(res.length - 2);
        window.key += keys[0].secret;
        window.key += keys[1].secret;
      })
  }
  
  getSecretFromExt() {
    getSecretExt();
  }

  handleChange = (name) => e => {
    this.setState({
      [name]: e.target.value
    })
  }

  saveSecretServer(name, secret) {
    saveSecretRequest({
      name,
      secret
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
  }

  shareSecret = () => {
    const {name, secret} = this.state;
    const si = ccall('genShare2', 'string', ['string'], [this.state.secret]);
    const partSecrets = si.match(/.{1,64}/g);
    partSecrets.length = 5;
    this.setState({
      partSecrets
    });
    this.saveSecretServer(name, partSecrets[0]);
    this.saveSecretServer(name, partSecrets[1]);
    setSecretExt(partSecrets[2]);
    localStorage.setItem('key_4', partSecrets[3]);
    localStorage.setItem('key_5', partSecrets[4]);
  }

  recover = () => {
    this.setState({
      recoveredKey: ccall('genRecover2', 'string', ['string'], [window.key])
    })
  }

  render() {
    const {name, secret, partSecrets, recoveredKey} = this.state;
    return (
      <div>
        <div className="input name">
          name secret: <input value={name} type="text" onChange={this.handleChange('name')}/>
        </div>
        <div className="input secret">
          secret: <input value={secret} type="text" onChange={this.handleChange('secret')}/>
        </div>
        <button onClick={this.shareSecret}>
          Share secret
        </button>
        <div className="partSecrets">
          {partSecrets.map((secr, index) => {
            return <div
              className="partSecrets__item"
              key={secr}>
                key {index + 1} : {secr}
              </div>;
          })}
        </div>
        <div className="item" onClick={this.getSecretFromServer}>Get server part secret</div>
        <div className="item" onClick={() => this.saveSecretServer(name, secret)}>Save secret in server</div>
        <div className="item" onClick={this.getSecretFromExt}>Get ext secret</div>
        <button onClick={this.recover}>Recover secret</button>
        <div>
          {recoveredKey}
        </div>
      </div>
    );
  }
}
export default App;
