const getData = (onSuccess, onFail) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, dataFromForm) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: dataFromForm,
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onFail();
    });
};


export {getData, sendData};
