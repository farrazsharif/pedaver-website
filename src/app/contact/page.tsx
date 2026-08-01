import dict from "@/lib/dictionaries";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import TrackedExternalChannelLink from "@/components/analytics/TrackedExternalChannelLink";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Pedaver — Get in Touch About PQNK",
  description:
    "Have a question about PQNK for your crop, region or farm size? Reach Pedaver by email or WhatsApp.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.contact.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.contact.pageSubtitle}</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-bold text-primary-dark">{dict.contact.emailLabel}</h2>
            <a href="mailto:pedaver@gmail.com" className="mt-1 block text-lg text-accent">
              pedaver@gmail.com
            </a>

            <h2 className="mt-6 text-lg font-bold text-primary-dark">{dict.contact.whatsappLabel}</h2>
            <TrackedExternalChannelLink
              href="https://wa.me/923206776666"
              label="WhatsApp"
              className="mt-1 block text-lg text-accent"
            >
              +92 320 677 6666
            </TrackedExternalChannelLink>

            <h2 className="mt-8 text-lg font-bold text-primary-dark">{dict.contact.socialsTitle}</h2>
            <ul className="mt-2 flex flex-col gap-2 text-ink-soft">
              <li>
                <TrackedExternalChannelLink
                  href="https://www.facebook.com/Pedaver"
                  label="Facebook"
                  className="hover:text-primary"
                >
                  Facebook — facebook.com/Pedaver
                </TrackedExternalChannelLink>
              </li>
              <li>
                <TrackedExternalChannelLink
                  href="https://www.youtube.com/@pedaverpqnk3167/videos"
                  label="YouTube — PedaVer PQNK"
                  className="hover:text-primary"
                >
                  YouTube — PedaVer PQNK
                </TrackedExternalChannelLink>
              </li>
              <li>
                <TrackedExternalChannelLink
                  href="https://www.youtube.com/@aasifsharif"
                  label="YouTube — Asif Sharif"
                  className="hover:text-primary"
                >
                  YouTube — Asif Sharif
                </TrackedExternalChannelLink>
              </li>
            </ul>
          </div>

          <ContactForm dict={dict.contact} />
        </div>
      </Section>
    </div>
  );
}
