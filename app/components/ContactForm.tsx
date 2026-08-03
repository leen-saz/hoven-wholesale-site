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

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 border border-white hover:bg-white hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '...' : copy.formSubmit}
        </button>
        {isSuccess && (
          <span className="text-green-400 text-sm">{copy.formSuccess}</span>
        )}
      </div>
    </form>
  );
}
