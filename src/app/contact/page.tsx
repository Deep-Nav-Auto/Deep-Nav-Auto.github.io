import { ContactContent } from "@/components/contact/ContactContent";
import { ContactForm } from "@/components/contact/ContactForm";
import { getContactPage } from "@/lib/content";

export default function ContactPage() {
  const page = getContactPage();

  return (
    <div className="nm-page-enter nm-page-shell">
      <div className="nm-label">Get in Touch</div>
      <h1 className="nm-page-title mb-10 sm:mb-16">{page.title}</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <ContactContent page={page} />
        <div>
          <ContactForm recipientEmail={page.profile.email} />
        </div>
      </div>
    </div>
  );
}
