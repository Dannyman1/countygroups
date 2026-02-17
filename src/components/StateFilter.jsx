"use client"

import { useState, useMemo, useRef, useEffect } from "react";

const ALL_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia',
  'Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland',
  'Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey',
  'New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina',
  'South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
];

export default function StateFilter({ value, onChange }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const options = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_STATES;
    return ALL_STATES.filter(s => s.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    function onDoc(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  }, []);

  function handleSelect(s) {
    onChange(s);
    setQuery("");
    setOpen(false);
  }

  return (
    <div className="mb-6" ref={ref}>
      <label className="block text-sm font-medium text-orange-400 mb-2">Filter by state</label>

      <div className="relative">
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            placeholder="Search states..."
            className="flex-1 border rounded-lg px-3 py-2"
            onFocus={() => setOpen(true)}
            aria-expanded={open}
          />

          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle states list"
            className={`p-2 rounded-md transition-transform ${open ? 'rotate-180' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-stone-950" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className={`absolute left-0 right-0 mt-2 z-30 bg-white border rounded-md shadow-lg overflow-hidden transition-all duration-300 ${open ? 'max-h-48' : 'max-h-0'}`}>
          <ul className="w-full overflow-auto">
            {options.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => handleSelect(s)}
                  className="w-full text-left px-3 py-2 hover:bg-orange-50 text-stone-900"
                >
                  <span className="text-orange-400 font-medium">{s}</span>
                </button>
              </li>
            ))}

            <li>
              <button
                type="button"
                onClick={() => { onChange(""); setQuery(""); setOpen(false); }}
                className="w-full text-left px-3 py-2 hover:bg-orange-50 text-sm text-stone-600"
              >Clear filter</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
