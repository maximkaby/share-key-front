import {API} from '../constants/Global';

const headers = {
  'Content-type': 'application/json',
  'Accept': 'application/json'
}

export const getSecretsRequest = () => fetch(`${API}/secrets`, {
  method: 'POST',
  mode: 'cors',
  headers
})

export const saveSecretRequest = (secret) => fetch(`${API}/saveSecret`, {
  method: 'POST',
  mode: 'cors',
  headers,
  body: JSON.stringify(secret)
});
