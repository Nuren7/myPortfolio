function ContactWindow() {
  return (
    <div className="flex flex-col gap-4">
      <a href="mailto:your@email.com">📧 Email</a>
      <a href="https://linkedin.com" target="_blank">LinkedIn</a>
      <a href="https://github.com" target="_blank">GitHub</a>

      <a href="/CV.png" download>
        📄 Download CV
      </a>
    </div>
  );
}

export default ContactWindow;