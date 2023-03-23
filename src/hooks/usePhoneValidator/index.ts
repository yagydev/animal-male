import { useEffect, useState } from "react";

const usePhoneValidator = (phone: string) => {
  const [valid, setValid] = useState(true);

  useEffect(() => {
    setValid(
      /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(
        phone
      )
    );
  }, [phone]);

  return valid;
};

export default usePhoneValidator;
