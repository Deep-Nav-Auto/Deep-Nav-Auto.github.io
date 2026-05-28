import { getContactPage } from "@/lib/content";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata = {
  title: "Contact",
  description: "Contact the Intelligent Navigation and Mapping Lab.",
};

export default function ContactPage() {
  const page = getContactPage();

  return (
    <div>
      <h1 className="mb-8 font-serif text-3xl font-bold">{page.title}</h1>
      <ContactContent page={page} />
    </div>
  );
}
