import { response } from "express";
import Swal from "sweetalert2";

export const success = () => {
  Swal.fire({
    title: 'Muy bien',
    text: response.message,
    icon: 'success',
    confirmButtonText: 'Cool'
  })
}

export const error = (data) => {
  Swal.fire({
    title: '¡Cuidado!',
    text: data.message,
    icon: 'error',
    confirmButtonText: 'Cerrar'
  })
}