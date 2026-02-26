import SectionHeading from "../components/SectionHeading";

function Contact() {
  return (
    <section id="contact" className="px-6 py-section">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="Contact"
          subtitle="Let's work together."
        />
        <p className="text-center text-text-muted">
          Contact form will go here. This will be our first real
          frontend-to-backend feature — the form will POST to our
          Express API, which will store messages in MongoDB.
        </p>
      </div>
    </section>
  );
}

export default Contact;