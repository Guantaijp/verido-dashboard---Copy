import { useState, useEffect } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface InternationalPhoneSelectProps {
  setValue: (name: "phoneNumber", value: string) => void;
  initialValue?: string;
}

const InternationalPhoneSelect = ({
  setValue,
  initialValue,
}: InternationalPhoneSelectProps) => {
  const [phone, setPhone] = useState(initialValue || "");

  useEffect(() => {
    if (initialValue) {
      setPhone(initialValue);
      setValue("phoneNumber", initialValue);
    }
  }, [initialValue, setValue]);

  const handleChange = (phone: string) => {
    setPhone(phone);
    setValue("phoneNumber", phone);
  };

  return (
    <div className="w-full">
      <PhoneInput
        defaultCountry="gb"
        value={phone}
        inputClassName="w-full"
        onChange={handleChange}
      />
    </div>
  );
};

export default InternationalPhoneSelect;
