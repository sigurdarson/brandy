"use client";

import type { FormEvent } from "react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui";
import { track } from "@/lib/analytics";
import styles from "./ContactForm.module.scss";

type Props = {
  email: string;
};

export function ContactForm({ email }: Props) {
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      track("contact_form_submit");
      const subject = encodeURIComponent("Project inquiry");
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${fromEmail}\n\n${message}`,
      );
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    },
    [email, fromEmail, message, name],
  );

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <input
            className={styles.input}
            name="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            autoComplete="name"
            placeholder="Your name"
            aria-label="Your name"
          />
        </div>
        <div className={styles.field}>
          <input
            className={styles.input}
            name="email"
            type="email"
            value={fromEmail}
            onChange={(ev) => setFromEmail(ev.target.value)}
            autoComplete="email"
            placeholder="Your email address"
            aria-label="Your email address"
          />
        </div>
      </div>
      <div className={styles.fieldFull}>
        <textarea
          className={styles.textarea}
          name="message"
          rows={5}
          value={message}
          onChange={(ev) => setMessage(ev.target.value)}
          placeholder="Tell us about your project"
          aria-label="Tell us about your project"
        />
      </div>
      <Button type="submit" variant="primary" size="default" className="focusRing">
        Submit form
      </Button>
    </form>
  );
}
