'use client';

import React, { useState } from 'react';

export default function SubmitRFQPage() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => setIsSubmitted(true), 500);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] selection:bg-copter-red selection:text-white pt-10 pb-20 lg:pt-20 lg:pb-32">
      <div className="max-w-[60rem] mx-auto px-6 lg:px-12">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-6 justify-center">
            <div className="w-10 h-[2px] bg-copter-red" />
            <span className="text-copter-red font-bold tracking-[0.2em] uppercase text-[12px] md:text-sm">Procurement & Sales</span>
            <div className="w-10 h-[2px] bg-copter-red" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-copter-blue mb-6 tracking-tight">
            Submit a Request for Quotation (RFQ)
          </h1>
          <p className="text-lg text-copter-grey max-w-2xl mx-auto">
            Need aircraft parts, engines, or ground support equipment? Provide your requirements below for rapid pricing and availability from our global supply network.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white p-12 rounded-2xl shadow-[0_20px_50px_rgba(22,72,120,0.08)] border border-gray-100 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-copter-blue mb-4">RFQ Submitted Successfully!</h2>
            <p className="text-copter-grey text-lg mb-8">
              Thank you for your request. Our parts and procurement team is reviewing your requirements and will return a quotation to you as soon as possible.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-copter-blue text-white px-8 py-3 rounded-md font-bold tracking-widest text-sm uppercase hover:bg-copter-red transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <div className="bg-white p-8 lg:p-14 rounded-2xl shadow-[0_20px_50px_rgba(22,72,120,0.08)] border border-gray-100 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <label className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${focusedField === 'company' ? '-top-2.5 bg-white px-2 text-copter-red font-bold text-[11px]' : 'top-4 text-gray-400 font-medium'}`}>
                    Company / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    onFocus={() => setFocusedField('company')}
                    onBlur={(e) => setFocusedField(e.target.value ? 'company' : null)}
                    className={`w-full bg-transparent border-2 rounded-xl px-4 py-4 outline-none text-copter-blue font-medium transition-all ${focusedField === 'company' ? 'border-copter-red' : 'border-gray-200 hover:border-copter-blue/30'}`}
                  />
                </div>
                <div className="relative group">
                  <label className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${focusedField === 'contact' ? '-top-2.5 bg-white px-2 text-copter-red font-bold text-[11px]' : 'top-4 text-gray-400 font-medium'}`}>
                    Primary Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    onFocus={() => setFocusedField('contact')}
                    onBlur={(e) => setFocusedField(e.target.value ? 'contact' : null)}
                    className={`w-full bg-transparent border-2 rounded-xl px-4 py-4 outline-none text-copter-blue font-medium transition-all ${focusedField === 'contact' ? 'border-copter-red' : 'border-gray-200 hover:border-copter-blue/30'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <label className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${focusedField === 'email' ? '-top-2.5 bg-white px-2 text-copter-red font-bold text-[11px]' : 'top-4 text-gray-400 font-medium'}`}>
                    Corporate Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    onFocus={() => setFocusedField('email')}
                    onBlur={(e) => setFocusedField(e.target.value ? 'email' : null)}
                    className={`w-full bg-transparent border-2 rounded-xl px-4 py-4 outline-none text-copter-blue font-medium transition-all ${focusedField === 'email' ? 'border-copter-red' : 'border-gray-200 hover:border-copter-blue/30'}`}
                  />
                </div>
                <div className="relative group">
                  <label className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${focusedField === 'phone' ? '-top-2.5 bg-white px-2 text-copter-red font-bold text-[11px]' : 'top-4 text-gray-400 font-medium'}`}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    onFocus={() => setFocusedField('phone')}
                    onBlur={(e) => setFocusedField(e.target.value ? 'phone' : null)}
                    className={`w-full bg-transparent border-2 rounded-xl px-4 py-4 outline-none text-copter-blue font-medium transition-all ${focusedField === 'phone' ? 'border-copter-red' : 'border-gray-200 hover:border-copter-blue/30'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <label className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${focusedField === 'partNumber' ? '-top-2.5 bg-white px-2 text-copter-red font-bold text-[11px]' : 'top-4 text-gray-400 font-medium'}`}>
                    Part Number / Component Name *
                  </label>
                  <input
                    type="text"
                    required
                    onFocus={() => setFocusedField('partNumber')}
                    onBlur={(e) => setFocusedField(e.target.value ? 'partNumber' : null)}
                    className={`w-full bg-transparent border-2 rounded-xl px-4 py-4 outline-none text-copter-blue font-medium transition-all ${focusedField === 'partNumber' ? 'border-copter-red' : 'border-gray-200 hover:border-copter-blue/30'}`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative group">
                    <label className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${focusedField === 'quantity' ? '-top-2.5 bg-white px-2 text-copter-red font-bold text-[11px]' : 'top-4 text-gray-400 font-medium'}`}>
                      Quantity *
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      onFocus={() => setFocusedField('quantity')}
                      onBlur={(e) => setFocusedField(e.target.value ? 'quantity' : null)}
                      className={`w-full bg-transparent border-2 rounded-xl px-4 py-4 outline-none text-copter-blue font-medium transition-all ${focusedField === 'quantity' ? 'border-copter-red' : 'border-gray-200 hover:border-copter-blue/30'}`}
                    />
                  </div>
                  <div className="relative group">
                    <label className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${focusedField === 'condition' ? '-top-2.5 bg-white px-2 text-copter-red font-bold text-[11px]' : 'top-4 text-gray-400 font-medium'}`}>
                      Condition *
                    </label>
                    <select
                      required
                      defaultValue=""
                      onFocus={() => setFocusedField('condition')}
                      onBlur={(e) => setFocusedField(e.target.value ? 'condition' : null)}
                      className={`w-full bg-transparent border-2 rounded-xl px-4 py-4 outline-none text-copter-blue font-medium transition-all appearance-none ${focusedField === 'condition' ? 'border-copter-red' : 'border-gray-200 hover:border-copter-blue/30'}`}
                    >
                      <option value="" disabled></option>
                      <option value="New">New (NE)</option>
                      <option value="Overhauled">Overhauled (OH)</option>
                      <option value="Repaired">Repaired (SV)</option>
                      <option value="As Removed">As Removed (AR)</option>
                      <option value="Any">Any Condition</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <label className={`absolute left-4 transition-all duration-300 pointer-events-none text-sm ${focusedField === 'details' ? '-top-2.5 bg-white px-2 text-copter-red font-bold text-[11px]' : 'top-4 text-gray-400 font-medium'}`}>
                  Additional Details / Multiple Parts (Optional)
                </label>
                <textarea
                  rows={4}
                  onFocus={() => setFocusedField('details')}
                  onBlur={(e) => setFocusedField(e.target.value ? 'details' : null)}
                  className={`w-full bg-transparent border-2 rounded-xl px-4 py-4 outline-none text-copter-blue font-medium resize-none transition-all ${focusedField === 'details' ? 'border-copter-red' : 'border-gray-200 hover:border-copter-blue/30'}`}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-copter-red text-white py-5 rounded-xl font-bold tracking-[0.2em] uppercase text-sm hover:bg-red-800 transition-all shadow-[0_10px_20px_rgba(196,14,20,0.2)] hover:shadow-[0_15px_30px_rgba(196,14,20,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                Request Quotation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
