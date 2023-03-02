import * as Yup from "yup";

export function initialValues() {
  return {
    oldpassword: "",
    password: "",
    repitepassword: "",
  };
}
export function validationSchema() {
  return Yup.object({
    oldpassword: Yup.string().required("La actual contraseña es requerida"),
    password: Yup.string().required("La nueva contraseña es requerida"),
    repitepassword: Yup.string()
      .required("La confirmación de la contraseña es requerida")
      .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir"),
  });
}
