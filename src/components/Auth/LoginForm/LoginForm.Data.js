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
      .required("Ingrese el email")
      .email("El email no es valido"),
    password: Yup.string().required("Ingrese la contraseña"),
  });
}
