"use client"

import { useState } from "react";

export default function ContactModal({ open, onClose, home, action }) {
  const [name, setName] = useState("");

  if (!open || !home) return null;

  function handleSubmit(e) {
    e.preventDefault();
    // Use the exact user-provided template, replacing {{name}} and {{location}}
    const message = `Hi! My name is ${name || "(not provided)"}. I’m interested in one of your properties in ${home.location} and would like more details.`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    // open WhatsApp in a new tab so the app stays open
    window.open(url, "_blank");

  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <form onSubmit={handleSubmit} className="relative bg-white rounded-lg p-6 w-full max-w-md z-10">
        <h3 className="text-lg font-semibold mb-2">{action} — {home.title || home.name}</h3>
        <p className="text-sm text-stone-600 mb-4">Please enter your name so we can connect you via WhatsApp.</p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full border rounded-md p-2 mb-4"
          required
        />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-md bg-green-600 text-white">Continue</button>
        </div>
      </form>
    </div>
  );
}
