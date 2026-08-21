"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

/**
 * Formulário simples (opcional, per spec). Sem backend: monta um
 * mailto: com os dados preenchidos e abre o cliente de e-mail do
 * visitante. Suficiente para captar contato sem exigir infra extra.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = `Contato pelo site — ${name || "sem nome"}`;
    const body = `${message}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="panel grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm text-mute">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md border border-stroke bg-void px-3 py-2.5 text-ink outline-none transition-colors focus:border-text-mute"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-mute">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md border border-stroke bg-void px-3 py-2.5 text-ink outline-none transition-colors focus:border-text-mute"
        />
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="message" className="text-sm text-mute">
          Sobre o projeto
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="resize-none rounded-md border border-stroke bg-void px-3 py-2.5 text-ink outline-none transition-colors focus:border-text-mute"
        />
      </div>

      <button type="submit" className="btn btn-chrome sm:col-span-2 sm:w-fit">
        Enviar por e-mail
      </button>
    </form>
  );
}
