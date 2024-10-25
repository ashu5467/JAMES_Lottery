import React, { useState } from 'react';

const FAQ = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const faqs = [
    {
      question: "What is the lottery?",
      answer: "The lottery is a game of chance where players buy tickets for a chance to win prizes based on random draws.",
    },
    {
      question: "How do I participate in the lottery?",
      answer: "You can participate by purchasing a ticket through our website or app. Choose your numbers and wait for the draw!",
    },
    {
      question: "What are the winning odds?",
      answer: "Winning odds depend on the specific lottery game you are playing. Check the game rules for detailed odds.",
    },
    {
      question: "How are the winners notified?",
      answer: "Winners are notified via email and will also be announced on our website after the draw.",
    },
    {
      question: "Can I claim my prize anonymously?",
      answer: "This depends on the laws of your jurisdiction. Please check local regulations regarding lottery winnings.",
    },
    {
      question: "What should I do if I forget my ticket number?",
      answer: "If you forget your ticket number, please contact our support team with your purchase details for assistance.",
    },
    {
      question: "How do I contact customer support?",
      answer: "You can contact customer support via the 'Get in Touch' section on our website or email us directly.",
    },
  ];

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white text-gray-800 rounded-lg shadow-lg p-6 transition-transform duration-300 transform hover:scale-105">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleQuestion(index)}
              >
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <span className="text-xl">{expandedQuestion === index ? '-' : '+'}</span>
              </div>
              {expandedQuestion === index && (
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
