import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    location: null,
    images: [],
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    address: Yup.string().required("La dirección es requerida"),
    phone: Yup.string().required("El teléfono es requerido"),
    email: Yup.string()
      .email("El email no es válido")
      .required("El email es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    location: Yup.object().required("La geolocalización es requerida"),
    images: Yup.array()
      .min(1, "Se requiere una imagen como mínimo")
      .required("La imagen es requerida"),
  });
}
