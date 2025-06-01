import { setData } from "../../helpers/auth";
export const loginController = () => {
  const form = document.querySelector('form');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      email: email.value,
      password: password.value
    }
    const solicitud = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const response = await solicitud.json();
    if (response.success) {
      setData(response.data);
      window.location.href
    } else {
      error(response)
    }
  })
}