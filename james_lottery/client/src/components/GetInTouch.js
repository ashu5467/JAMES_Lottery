import React from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';


const GetInTouch = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-r from-pink-400 to-purple-500 text-white py-16"> {/* Pink to Purple Gradient */}
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-6 animate__animated animate__fadeIn">{t('Get in Touch')}</h2>
        <p className="text-center text-lg mb-8 animate__animated animate__fadeIn animate__delay-1s">
          {t('We’d love to hear from you! Please reach out to us through any of the options below.')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl animate__animated animate__fadeIn animate__delay-2s">
            <PhoneIcon className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold">{t('Call Us')}</h3>
            <p className="text-gray-700">{t('+123 456 7890')}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl animate__animated animate__fadeIn animate__delay-3s">
            <EnvelopeIcon className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold">{t('Email Us')}</h3>
            <p className="text-gray-700">{t('contact@yourcompany.com')}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl animate__animated animate__fadeIn animate__delay-4s">
            <MapPinIcon className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold">{t('Visit Us')}</h3>
            <p className="text-gray-700">{t('123 Main Street, City, Country')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
