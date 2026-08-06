'use client';

import { useState } from 'react';

interface ContactFormProps {
  language: 'ar' | 'en';
  copy: {
    formName: string;
    formEmail: string;
    formPhone: string;
    formCompany: string;
    formMessage: string;
    formSubmit: string;
    formSuccess: string;
  };
}

export default function ContactForm({ language, copy }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-96 flex items-center justify-center text-center">
        <div className="space-y-6">
          <div className="text-6xl">✓</div>
          <h3 className="text-3xl font-bold text-white">
            {language === 'ar' ? 'شكراً لك' : 'Thank You'}
          </h3>
          <p className="text-xl text-gray-200 max-w-md">
            {copy.formSuccess}
          </p>
          <p className="text-sm text-gray-400">
            {language === 'ar'
              ? 'سيتم التواصل معك قريباً'
              : 'We will contact you soon'}
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="mt-6 px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition"
          >
            {language === 'ar' ? 'عودة' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder={copy.formName}
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder={copy.formEmail}
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="tel"
            name="phone"
            placeholder={copy.formPhone}
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition"
          />
        </div>
        <div>
          <input
            type="text"
            name="company"
            placeholder={copy.formCompany}
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition"
          />
        </div>
      </div>

      <div>
        <textarea
          name="message"
          placeholder={copy.formMessage}
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? '...' : copy.formSubmit}
      </button>
    </form>
  );
}
