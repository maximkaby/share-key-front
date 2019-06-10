import {socket} from "../index";


export const newMessage = () => {
  socket.emit('message');
}

export const getSecretExt = () => {
  socket.emit('get_secret_ext');
}

export const setSecretExt = (secret) => {
  socket.emit('set_secret_ext', secret);
}
