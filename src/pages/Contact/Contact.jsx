import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Very basic check
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please fill all fields!",
        confirmButtonColor: "#6366f1",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate sending (replace with real API call if needed)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success alert with SweetAlert2
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you! We'll get back to you soon.",
      confirmButtonColor: "#6366f1",
      timer: 4000,
      timerProgressBar: true,
      showConfirmButton: false,
    });

    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section className="py-32 bg-base-200 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-base-content mb-4">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-base-content/70 max-w-3xl mx-auto">
            Have questions about ContestHub? We're here to help. Reach out to us!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Email */}
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Email Us</h3>
              <p className="text-base-content/70 mt-2 break-all">
                support@contesthub.com
              </p>
              <p className="text-sm text-base-content/60 mt-1">
                We usually reply within 24 hours
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Call Us</h3>
              <p className="text-base-content/70 mt-2">+880 1712-345678</p>
              <p className="text-sm text-base-content/60 mt-1">
                Mon-Fri 9:00 AM - 6:00 PM (BDT)
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Visit Us</h3>
              <p className="text-base-content/70 mt-2">Dhaka, Bangladesh</p>
              <p className="text-sm text-base-content/60 mt-1">
                Remote-first team
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12 md:mt-16 card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Your Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="input input-bordered input-lg w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="input input-bordered input-lg w-full"
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Message</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="How can we help you today?"
                  required
                  className="textarea textarea-bordered textarea-lg w-full"
                />
              </div>

              {/* Send Message Button - Centered */}
              <div className="md:col-span-2 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg px-12 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;