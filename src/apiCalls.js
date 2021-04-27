export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
}

export const postOrder = (body) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
  ).then(res => res.json())
  .catch(err => console.log(err))

}