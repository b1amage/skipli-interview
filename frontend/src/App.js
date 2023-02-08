import { useState } from "react";
import Input from "./components/Input";
import phoneApi from "./api/phoneApi";
import Annoucement from "./components/Annoucement";
import Button from "./components/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

function App() {
  const [announcement, setAnnouncement] = useState("");
  const [isError, setIsError] = useState(false);

  const formik = useFormik({
    initialValues: {
      phone: "",
      code: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string().matches(
        /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
        "Please enter a valid phone number!"
      ),
      code: Yup.string().matches(/^[0-9]{6,6}$/, "Please enter a 6-digit-code"),
    }),
  });

  const onPhoneCreateRequest = () => {
    const postPhoneToServer = async () => {
      const { data } = await phoneApi.createNewAccessCode(formik.values.phone);
      setAnnouncement(data.message);
      setIsError(!data.isSuccess);
      console.log(data);
    };

    postPhoneToServer();
  };

  const onAccessCodeValidateRequest = () => {
    const postAccessCodeToServer = async () => {
      const { data } = await phoneApi.validateAccessCode({
        phoneNumber: formik.values.phone,
        accessCode: formik.values.code,
      });

      setAnnouncement(data.message);
      setIsError(!data.isSuccess);
      formik.setValues({ code: "", phone: "" });
      console.log(data);
    };

    postAccessCodeToServer();
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-slate-100">
      <form className="flex flex-col gap-5 p-10 mx-auto rounded-lg md:w-1/2 bg-primary-100">
        <Input
          label="phone number"
          id="phone"
          placeholder="Ex: 0913000112"
          value={formik.values.phone}
          onChange={formik.handleChange}
          err={formik.errors.phone}
        />
        <Input
          label="access code"
          id="code"
          placeholder="Ex: 123456"
          value={formik.values.code}
          onChange={formik.handleChange}
          err={formik.errors.code}
        />

        <div className="flex gap-5">
          <Button onClick={onPhoneCreateRequest} type="button">
            Create phone number
          </Button>

          <Button onClick={onAccessCodeValidateRequest} type="button">
            Validate access code
          </Button>
        </div>

        {announcement && (
          <Annoucement isError={isError}>{announcement}</Annoucement>
        )}
      </form>
    </div>
  );
}

export default App;
