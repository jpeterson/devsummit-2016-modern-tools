import $ from 'jquery';

function makeRequest(params) {
  return new Promise((resolve) => {
    $.ajax(params.url, {
      method: params.method || 'GET',
      data: params.data || null,
      crossDomain: true,
      dataType: 'json',
      success: (response, status, xhr) => {
        resolve(response);
      }
    });
  });
}

export { makeRequest };
