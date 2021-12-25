
import { store } from 'react-notifications-component';


// to test only the string in blank or undefined
export const blankValidator = (str) => {
  if (str === "" || str === undefined || str === null) {
    return false;
  }
  return true;
};

//for email Validation
export const emailValidator = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email.match(regEx)) {
    return false;
  }
  return true;
};


// show notification msz
export const showNotificationMsz = (message, messageType) => {
  store.addNotification({
    title: "",
    message: `${message}`,
    type: `${messageType}`,
    insert: "top",
    container: "top-right",
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
};