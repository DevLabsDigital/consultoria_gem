import {toast} from "react-toastify";

export const genericError = () => toast.error('Ocorreu um erro inesperado!', {style: {fontSize: '14px'}})