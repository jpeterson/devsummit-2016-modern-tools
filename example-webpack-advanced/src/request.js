import $ from 'jquery';

function makeRequest(params) {
  return new Promise((resolve, reject) => {
    $.ajax(params.url, {
      method: params.method || 'GET',
      data: params.data || null,
      crossDomain: true,
      dataType: 'json',
      success: (response, status, xhr) => {
        resolve(response);
      },
      error: (xhr, status, error) => {
        reject(error);
      }
    });
  });
}

export { makeRequest };
