const postData = async(url = '', reqBody = {}) => {
    const completeUrl = `http://localhost:8000/api/v1${url}`;
    const response = await fetch(completeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    });
    const statusCode = response.status;
    const data = await response.json();
    return { statusCode, ...data };
}

const getData = async(url = '') => {
    const completeUrl = `http://localhost:8000/api/v1${url}`;
    const response = await fetch(completeUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      });
    const statusCode = response.status;
    const data = await response.json();
    return { statusCode, ...data };
  }


  module.exports = {
    postData,
    getData,
  }
  