import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { 
        translation: {
          home: "Home",
          lotteries: "Lotteries",
          results: "Results",
          winners: "Winners",
          cart: "Cart",
          login_register: "Login / Register"
        }
      },
      bn: { 
        translation: {
          "JAMES Lottery":"জেমস লটারি",
          "Home": "হোম",
          "Lotteries": "লটারি",
          "Results": "ফলাফল",
          "Winners": "বিজয়ীরা",
          "Cart": "কার্ট",
          "Login" :"লগইন ",
          "Register": " রেজিস্টার",
          "Login / Register":"লগইন / নিবন্ধন",
          
  
    "Upcoming Attractions": "আসন্ন আকর্ষণ",
    "Win First Prize!": "প্রথম পুরস্কার জেতার সুযোগ!",
    "Add to Cart": "কার্টে যোগ করুন",
    "Buy Now": "এখনই কিনুন",
    "Draw Date": "ড্র তারিখ",
    "Time": "সময়",
    "Price": "মূল্য",
    "View All": "সব দেখুন",
    "Monthly Lotteries": "মাসিক লটারি",
    "How to Play": "খেলার নিয়মাবলী",
    "Select a lottery.": "একটি লটারি নির্বাচন করুন।",
    "Pick your numbers or use the auto-pick option.": "আপনার নম্বর বাছাই করুন বা অটো-পিক অপশন ব্যবহার করুন।",
    "Add to cart and purchase tickets.": "কার্টে যোগ করে টিকিট কিনুন।",
    "Wait for the draw and check the results!": "ড্র-এর জন্য অপেক্ষা করুন এবং ফলাফল দেখুন!",
    "Latest Result": "সর্বশেষ ফলাফল",
    "Lottery Results": "লটারি ফলাফল",
    "View Results": "ফলাফল দেখুন",
    "Winners": "বিজয়ীরা",
    "Won 5 Lakh": "৫ লাখ জিতেছেন",
    "Won 1 Lakh": "১ লাখ জিতেছেন",
    "Won 10 Lakh": "১০ লাখ জিতেছেন",
    "Get in Touch": "যোগাযোগ করুন",
    "We’d love to hear from you! Please reach out to us through any of the options below.": "আমরা আপনার সাথে যোগাযোগ করতে পেরে আনন্দিত হব! নিচের যেকোনো অপশন দিয়ে আমাদের সাথে যোগাযোগ করুন।",
    "Call Us": "আমাদের কল করুন",
    "Email Us": "আমাদের ইমেইল করুন",
    "Visit Us": "আমাদের ভিজিট করুন",
    "Frequently Asked Questions": "প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী",
    "What is the lottery?": "লটারি কী?",
    "How do I participate in the lottery?": "আমি কীভাবে লটারিতে অংশগ্রহণ করব?",
    "What are the winning odds?": "জেতার সম্ভাবনা কতটুকু?",
    "How are the winners notified?": "বিজয়ীদের কীভাবে জানানো হয়?",
    "Can I claim my prize anonymously?": "আমি কি আমার পুরস্কার গোপন রাখতে পারি?",
    "What should I do if I forget my ticket number?": "যদি আমি আমার টিকিট নম্বর ভুলে যাই তবে কী করব?",
    "How do I contact customer support?": "গ্রাহক সহায়তা কিভাবে পাব?",
    "About Us": "আমাদের সম্পর্কে",
    "Welcome to Lottery App! Participation in the lottery is open to individuals 18 years and older. Please play responsibly. For support or inquiries, contact us at support@yourcompany.com.": "লটারি অ্যাপে স্বাগতম! লটারিতে অংশগ্রহণ ১৮ বছর এবং তার বেশি বয়সীদের জন্য উন্মুক্ত। দায়িত্বশীলভাবে খেলুন। সহায়তা বা অনুসন্ধানের জন্য, support@yourcompany.com-এ যোগাযোগ করুন।",
    "By participating, you agree to our Terms & Conditions and Privacy Policy.": "অংশগ্রহণের মাধ্যমে আপনি আমাদের শর্তাবলী এবং গোপনীয়তা নীতিতে সম্মতি দিচ্ছেন।",
    "Quick Links": "দ্রুত লিঙ্কসমূহ",
    "Get in Touch": "যোগাযোগ করুন",
    "Follow Us": "আমাদের অনুসরণ করুন",
    "© 2024 Lottery App. All rights reserved.": "© ২০২৪ লটারি অ্যাপ। সর্বস্বত্ব সংরক্ষিত।",

    faq: {
      title: "প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী",
      questions: [
        {
          question: "লটারি কী?",
          answer: "লটারি একটি চ্যান্সের খেলা যেখানে খেলোয়াড়রা টিকিট কিনে পুরস্কার জিতার সুযোগ পান।"
        },
        {
          question: "আমি কীভাবে লটারিতে অংশগ্রহণ করব?",
          answer: "আপনি আমাদের ওয়েবসাইট বা অ্যাপ থেকে টিকিট কিনে অংশ নিতে পারেন। আপনার নম্বর চয়ন করুন এবং ড্র-এর জন্য অপেক্ষা করুন!"
        },
        {
          question: "জেতার সম্ভাবনা কতটুকু?",
          answer: "জয়ের সম্ভাবনা নির্ভর করে আপনি যে নির্দিষ্ট লটারি খেলছেন তার উপর। বিস্তারিত সম্ভাবনা দেখতে গেমের নিয়ম দেখুন।"
        },
        {
          question: "বিজয়ীদের কীভাবে জানানো হয়?",
          answer: "ইমেইলের মাধ্যমে বিজয়ীদের জানানো হয় এবং ড্র-এর পর আমাদের ওয়েবসাইটে প্রকাশ করা হয়।"
        },
        {
          question: "আমি কি আমার পুরস্কার গোপন রাখতে পারি?",
          answer: "এটি আপনার অঞ্চলের আইনগুলির উপর নির্ভর করে। লটারি জয়ের বিষয়ে স্থানীয় বিধি পরীক্ষা করুন।"
        },
        {
          question: "যদি আমি আমার টিকিট নম্বর ভুলে যাই তবে কী করব?",
          answer: "আপনি যদি আপনার টিকিট নম্বর ভুলে যান, আমাদের সমর্থন দলকে আপনার ক্রয়ের বিস্তারিত সহযোগিতা করুন।"
        },
        {
          question: "গ্রাহক সহায়তা কিভাবে পাব?",
          answer: "আপনি আমাদের ওয়েবসাইটে 'যোগাযোগ করুন' বিভাগে বা সরাসরি ইমেইলের মাধ্যমে কাস্টমার সাপোর্টের সাথে যোগাযোগ করতে পারেন।"
        }
      ]
    }

        }
      }
    },
    lng: 'bn', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
