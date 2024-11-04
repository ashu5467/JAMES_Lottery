import React from 'react';
import i18next from 'i18next';

const LanguageSwitcher = () => {
  const changeLanguage = (lng) => {
    i18next.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('fr')}>Français</button>
      {/* Add more buttons for additional languages */}
    </div>
  );
};

export default LanguageSwitcher;
