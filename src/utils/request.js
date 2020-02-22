const base = 'https://api.peaceandlove.top:50001';

const request = async (input, init) => {
  const response = await fetch(base + input, init);
  return await response.json();
};

const attack = async (validateFields, onChange) => {
  const body = await new Promise((resolve, reject) => {
    validateFields((error, values) => {
      error === null ? resolve(values) : reject(error);
    })
  });
  const json = await request('/attack', {
    body: JSON.stringify(body),
    method: 'POST',
    mode: 'cors',
  });
  if (json.success) {
    onChange(json);
  }
};

export {base, attack};
