import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TranslateIcon from "@mui/icons-material/Translate";
import NoSsr from "@mui/material/NoSsr";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>();

  useEffect(() => {
    const lng = localStorage.getItem("language") || i18n.language;
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  }, [i18n, setSelectedLanguage]);

  const handleLanguageChange = (event: React.MouseEvent) => {
    const newLanguage = selectedLanguage === "en" ? "hi" : "en";
    i18n.changeLanguage(newLanguage);
    setSelectedLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <NoSsr>
      <Button
        color="secondary"
        startIcon={<TranslateIcon />}
        onClick={handleLanguageChange}
      >
        {selectedLanguage === "en" ? "हिंदी" : "Eng"}
      </Button>
    </NoSsr>
  );
};

export default LanguageSwitcher;
