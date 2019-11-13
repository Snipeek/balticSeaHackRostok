import * as Yup from "yup";

Yup.setLocale({
   string: {
       min: "Значение должно быть больше ${min} символов",
       required: "Это поле обязательно для заполнения",
       max: "Значение должно быть меньше ${max} символов",
   },
    mixed: {
        required: "Это поле обязательно для заполнения",
    },
});

export default Yup;
