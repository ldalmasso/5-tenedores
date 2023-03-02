import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
  };
}
export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .required("El Email es requerido")
      .email("El formato del Email no es correcto"),
    password: Yup.string().required("La contraseña es requerida"),
  });
}
