'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, Mail, Building, User, MessageSquare } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  service_interest: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const services = [
  'AI Strategy & Consulting',
  'Custom SaaS Development',
  'Cloud Architecture',
  'AI Integration',
  'Other',
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Info */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-8"
          >
            <div>
              <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-full mb-6 group hover:bg-brand-green/15 transition-all duration-300">
                <Mail className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                <span className="text-sm text-brand-green-light font-medium drop-shadow-[0_0_4px_rgba(34,197,94,0.4)]">Get in Touch</span>
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-serif mb-6"
              >
                Begin Your
                <br />
                <span className="gradient-text">Transformation</span>
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-400 leading-relaxed"
              >
                Share your vision, and we'll craft the solution. Our team of experts is ready to discuss how we can elevate your business with bespoke AI and SaaS solutions.
              </motion.p>
            </div>

            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">24-Hour Response Time</h3>
                  <p className="text-gray-400 text-sm">We'll get back to you within one business day</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Free Consultation</h3>
                  <p className="text-gray-400 text-sm">Complimentary discovery session to explore your needs</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Bespoke Solutions</h3>
                  <p className="text-gray-400 text-sm">Tailored strategies designed for your unique goals</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            className="relative"
          >
            {/* Form Card */}
            <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-brand-green/5 rounded-2xl blur-xl opacity-50" />

              <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-green transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-green transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                {/* Company Input */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company (Optional)
                  </label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      {...register('company')}
                      type="text"
                      id="company"
                      className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-green transition-colors"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                {/* Service Interest Select */}
                <div>
                  <label htmlFor="service_interest" className="block text-sm font-medium text-gray-300 mb-2">
                    Service Interest *
                  </label>
                  <select
                    {...register('service_interest')}
                    id="service_interest"
                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-brand-green transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.service_interest && (
                    <p className="mt-1 text-sm text-red-400">{errors.service_interest.message}</p>
                  )}
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                    <textarea
                      {...register('message')}
                      id="message"
                      rows={4}
                      className="w-full pl-12 pr-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-green transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  whileHover={{ scale: isSubmitting || isSuccess ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting || isSuccess ? 1 : 0.98 }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-green-light text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-brand-green/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSuccess ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Message Sent!</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {isSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-brand-green text-sm"
                  >
                    Thank you! We'll be in touch within 24 hours.
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
