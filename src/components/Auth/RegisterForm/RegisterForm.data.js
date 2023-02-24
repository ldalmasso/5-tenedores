import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
    repeatpassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("El email no es correcto")
      .required("El email es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
    repeatpassword: Yup.string()
      .required("La confirmación de la contraseña es requerida")
      .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir"),
  });
}
