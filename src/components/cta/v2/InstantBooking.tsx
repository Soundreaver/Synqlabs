"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, CheckCircle2, Mail, User, Building } from "lucide-react";

export default function InstantBooking() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [booked, setBooked] = useState(false);

  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  const availableTimes = [
    "9:00 AM", "10:00 AM", "11:00 AM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const dates = generateDates();

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (booked) {
    return (
      <section className="relative py-24 bg-black">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 md:p-12 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-brand-green/30 rounded-3xl text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle2 className="w-20 h-20 text-brand-green mx-auto mb-6" />
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-4">
              You're All Set!
            </h2>

            <p className="text-gray-300 mb-8">
              Your consultation is booked for <span className="text-brand-green font-semibold">{selectedDate}</span> at <span className="text-brand-green font-semibold">{selectedTime}</span>
            </p>

            <div className="p-6 bg-brand-green/5 border border-brand-green/20 rounded-xl mb-8 text-left">
              <h4 className="text-sm font-semibold text-brand-green mb-4">
                WHAT HAPPENS NEXT
              </h4>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-brand-green text-sm font-bold">1</span>
                  </div>
                  <span>Check your email for calendar invite and meeting link</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-brand-green text-sm font-bold">2</span>
                  </div>
                  <span>Fill out pre-call questionnaire (5 minutes)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-brand-green text-sm font-bold">3</span>
                  </div>
                  <span>Join the call - we'll discuss your needs and next steps</span>
                </li>
              </ul>
            </div>

            <p className="text-sm text-gray-400">
              📧 Confirmation sent to <span className="text-white">{formData.email}</span>
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-green/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-full backdrop-blur-sm">
            <Calendar className="w-4 h-4 text-brand-green" />
            <span className="text-sm text-brand-green-light">
              Free 30-Minute Consultation
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif">
            Book Your{" "}
            <span className="bg-gradient-to-r from-brand-green-light to-brand-green-dark bg-clip-text text-transparent">
              Discovery Call
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Pick a time that works for you. No commitment, no pressure - just a conversation about your needs.
          </p>
        </motion.div>

        {/* Booking Interface */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar & Time Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Date Selection */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-green" />
                Select a Date
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {dates.map((date) => {
                  const dateStr = formatDate(date);
                  return (
                    <button
                      key={dateStr}
                      onClick={() => {
                        setSelectedDate(dateStr);
                        setSelectedTime(null);
                      }}
                      className={`p-4 rounded-lg border transition-all text-sm ${
                        selectedDate === dateStr
                          ? "bg-brand-green/10 border-brand-green text-white"
                          : "bg-gray-900 border-gray-800 text-gray-300 hover:border-gray-700"
                      }`}
                    >
                      <div className="font-semibold">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                      <div className="text-xs text-gray-400">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-green" />
                  Select a Time
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border transition-all text-sm ${
                        selectedTime === time
                          ? "bg-brand-green/10 border-brand-green text-white"
                          : "bg-gray-900 border-gray-800 text-gray-300 hover:border-gray-700"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-brand-green/30 rounded-3xl"
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              Your Information
            </h3>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-green transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-green transition-colors"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-green transition-colors"
                  placeholder="Acme Inc."
                />
              </div>

              {selectedDate && selectedTime && (
                <div className="p-4 bg-brand-green/5 border border-brand-green/20 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Selected Time:</div>
                  <div className="text-white font-semibold">
                    {selectedDate} at {selectedTime}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!selectedDate || !selectedTime || !formData.name || !formData.email}
                className="w-full px-6 py-4 bg-gradient-to-r from-brand-green-dark to-brand-green rounded-lg text-black font-bold hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Booking
              </button>

              <p className="text-xs text-gray-500 text-center">
                ⚡ Instant confirmation • No credit card required • Cancel anytime
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
