'use client';

import React from 'react';

interface FormFieldProps {
  label: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, description, children, className = '' }: FormFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-xs font-mono font-semibold tracking-wider text-neutral-300 uppercase">
        {label}
      </label>
      {description && (
        <p className="text-[11px] font-sans text-neutral-500 leading-normal">{description}</p>
      )}
      {children}
    </div>
  );
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function TextInput({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-crimson focus:ring-1 focus:ring-crimson focus:outline-none text-xs text-white placeholder:text-neutral-600 font-sans transition-all disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea({ className = '', rows = 3, ...props }: TextAreaProps) {
  return (
    <textarea
      rows={rows}
      className={`w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-crimson focus:ring-1 focus:ring-crimson focus:outline-none text-xs text-white placeholder:text-neutral-600 font-sans leading-relaxed transition-all resize-y disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

interface SwitchToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  disabled?: boolean;
}

export function SwitchToggle({ label, checked, onChange, description, disabled }: SwitchToggleProps) {
  return (
    <label className={`flex items-start justify-between gap-4 p-3 rounded-xl bg-black/40 border border-white/5 cursor-pointer hover:border-white/15 transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="space-y-0.5">
        <span className="text-xs font-mono font-medium text-neutral-200 block uppercase tracking-wider">{label}</span>
        {description && <span className="text-[11px] font-sans text-neutral-500 block">{description}</span>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          checked ? 'bg-crimson' : 'bg-neutral-800'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </label>
  );
}

export interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export function SelectInput({ className = '', children, ...props }: SelectInputProps) {
  return (
    <select
      className={`w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-crimson focus:ring-1 focus:ring-crimson focus:outline-none text-xs text-white font-sans transition-all cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
