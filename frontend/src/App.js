import { useState, useRef } from "react";
import Input from "./components/Input";

import phoneApi from "./api/phoneApi";
import Annoucement from "./components/Annoucement";

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [isError, setIsError] = useState(false);

  const accessCodeRef = useRef();

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submmited with value: ", { phoneNumber, accessCode });
  };

  const onPhoneCreateRequest = () => {
    const postPhoneToServer = async () => {
      const { data } = await phoneApi.createNewAccessCode(phoneNumber);
      setAnnouncement(data.message);
      setIsError(!data.isSuccess);
      console.log(data);
    };

    postPhoneToServer();
  };

  const onAccessCodeValidateRequest = () => {
    const postAccessCodeToServer = async () => {
      const { data } = await phoneApi.validateAccessCode({
        phoneNumber,
        accessCode,
      });

      setAnnouncement(data.message);
      setIsError(!data.isSuccess);
      accessCodeRef.current.value = "";
      setAccessCode("");
      console.log(data);
    };

    postAccessCodeToServer();
  };

  const onPhoneInputChange = (value) =>
    setPhoneNumber((currentPhoneNumber) => value);

  const onAccessCodeChange = (value) =>
    setAccessCode((currentAccessCode) => value);

  return (
    <div className="">
      <form className="flex flex-col gap-5 p-10" onSubmit={onFormSubmit}>
        <Input
          value={phoneNumber}
          label="phone number"
          id="phone"
          placeholder="Ex: 0913000112"
          onChange={onPhoneInputChange}
        />
        <Input
          reference={accessCodeRef}
          value={accessCode}
          label="access code"
          id="code"
          placeholder="Ex: 123456"
          onChange={onAccessCodeChange}
        />

        <div className="flex gap-5">
          <button
            onClick={onPhoneCreateRequest}
            type="button"
            className="bg-primary-400 text-lg px-5 py-2 rounded-lg text-white font-semibold max-w-[240px]"
          >
            Create phone number
          </button>
          <button
            onClick={onAccessCodeValidateRequest}
            type="button"
            className="bg-primary-400 text-lg px-5 py-2 rounded-lg text-white font-semibold max-w-[240px]"
          >
            Validate access code
          </button>
        </div>

        {announcement && (
          <Annoucement isError={isError}>{announcement}</Annoucement>
        )}
      </form>
    </div>
  );
}

export default App;
