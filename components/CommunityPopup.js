"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function CommunityPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitBtn, setSubmitBtn] = useState("Put me on priority list");
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const hasSubmitted = localStorage.getItem("communityFormSubmitted");
    const lastClosed = localStorage.getItem("communityPopupLastClosed");
    const today = new Date().toDateString();
    const resalePage = pathname.includes("/resale");

    if (!hasSubmitted && (!lastClosed || lastClosed !== today) && !resalePage) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("communityPopupLastClosed", new Date().toDateString());
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitBtn("Submitting...");

    try {
      const response = await fetch("https://api.homebaba.ca/api/newsletter/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          page_url: pathname,
          city: pathname.split("/")[1] || "toronto",
          subscribed_at: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data?.email?.[0]?.includes("already exists")) {
          setSubmitBtn("Email already subscribed!");
          setTimeout(() => {
            setIsOpen(false);
            setFormData({ name: "", email: "", phone: "" });
            setSubmitBtn("Put me on priority list");
          }, 2000);
          return;
        }
        throw new Error("Failed to subscribe");
      }

      setSubmitBtn("Successfully Subscribed!");
      localStorage.setItem("communityFormSubmitted", "true");
      setTimeout(() => {
        setIsOpen(false);
        setFormData({ name: "", email: "", phone: "" });
        setSubmitBtn("Put me on priority list");
      }, 2000);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setSubmitBtn("Failed to subscribe. Try again");
      setTimeout(() => {
        setSubmitBtn("Put me on priority list");
      }, 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  if (!isOpen) return null;
  const isResalePage = pathname.includes("resale");
  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center px-4 rounded-xl ${
        isResalePage ? "hidden" : ""
      }`}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />
      <div className="relative bg-white rounded-xl p-6 max-w-md w-full">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="flex justify-center">
            <Image
              src="/contact-bottom-2.png"
              alt="Real Estate Agent"
              width={150}
              height={150}
              className="rounded-full mb-6 md:mb-8 w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-cover"
              priority
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            JOIN HOMEBABA COMMUNITY
          </h2>
          <p className="text-gray-600">
            Be the First to Know About New Projects!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-red focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-red focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-red focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={submitBtn === "Submitting..."}
            className="w-full py-3 bg-[#ff6200] text-white rounded-md hover:bg-[#ff6200]/90 transition-colors font-semibold"
          >
            {submitBtn}
          </button>
        </form>
      </div>
    </div>
  );
}
