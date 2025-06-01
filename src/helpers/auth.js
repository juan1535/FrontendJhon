export const setData = (data) => {
  console.log(data);
  localStorage.setItem('refreshToken', data.refreshToken)
  localStorage.setItem('accessToken', data.accessToken)
}

export const getData = () => {
if (localStorage.accessToken === undefined) {
  return false;
} else {
  return true;
}
}

export const estaAutenticado = () => {
  const token = localStorage.getItem("accessToken"); // O cualquier otro método de validación que uses
  return token !== null; // Retorna true si hay un token, false si no lo hay
};
