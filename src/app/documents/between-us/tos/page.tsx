import type { Metadata } from "next";
import Link from "next/link";
import { DocumentPage, DocumentSection } from "@/app/documents/_components/document-page";
import { createSiteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createSiteMetadata({
  title: "between us Terms of Service | Avarra",
  description: "Terms that apply when you download or use between us.",
  path: "/documents/between-us/tos",
  index: true,
});

export default function BetweenUsTermsPage() {
  return (
    <DocumentPage documentLabel="Terms" title="Terms of Service" effectiveDate="30 August 2026">
      <DocumentSection title="Agreement to these terms">
        <p>
          These Terms of Service (“Terms”) are an agreement between you and
          Aerio, Aiken Tine Ahac s.p. (“we”, “us”, or “Avarra”) governing your
          use of the between us mobile application (the “App”). By downloading
          or using the App, you agree to these Terms. If you do not agree, do not
          use the App.
        </p>
        <p>
          You must be at least 13 years old to use the App. If you are not legally
          able to agree to these Terms on your own, a parent or legal guardian
          must agree on your behalf.
        </p>
      </DocumentSection>

      <DocumentSection title="What the app provides">
        <p>
          between us is a conversation game that presents prompts intended to
          help two people talk and connect. The App is for general entertainment
          and informational purposes. It is not medical, mental-health,
          relationship, legal, or other professional advice, and it is not a
          substitute for professional care or emergency services.
        </p>
        <p>
          You decide whether to answer any prompt. Be considerate of the other
          person’s boundaries and stop a conversation if either person is
          uncomfortable or feels unsafe.
        </p>
      </DocumentSection>

      <DocumentSection title="License and acceptable use">
        <p>
          The App is licensed, not sold. Your license to use the App is governed
          by Apple’s Licensed Application End User License Agreement and the
          applicable Apple Media Services Terms, in addition to these Terms.
        </p>
        <p>
          You may use the App only for personal, non-commercial, lawful purposes.
          You may not misuse the App, interfere with its operation, circumvent
          access controls, extract or republish its question decks, or copy,
          modify, distribute, sell, lease, reverse engineer, or create derivative
          works from the App except where applicable law expressly permits it.
        </p>
      </DocumentSection>

      <DocumentSection title="Your content and privacy">
        <p>
          Names, profile photos, progress, and conversation answers belong to
          you. The App stores names, profile photos, and progress locally on your
          device; it does not record or upload your conversation answers. You are
          responsible for content you add and for having permission to use any
          photo you select.
        </p>
        <p>
          Our collection and use of information is described in the{" "}
          <Link className="font-semibold text-ink underline" href="/documents/between-us/privacy-policy">
            Privacy Policy
          </Link>
          .
        </p>
      </DocumentSection>

      <DocumentSection title="Premium lifetime unlock">
        <p>
          The App may offer a one-time in-app purchase that unlocks premium
          content for the lifetime of the App. The price and included features
          are shown before purchase. “Lifetime” refers to the commercial lifetime
          of the App and does not guarantee that the App, every feature, or
          compatibility with every device or operating-system version will be
          available forever.
        </p>
        <p>
          Apple processes purchases, billing, refunds, and applicable taxes under
          its own terms. We do not receive your full payment-card details. You can
          use Restore Purchases in Settings while signed in to the Apple ID used
          for the original purchase. Your mandatory consumer rights, including
          remedies for faulty digital content, are not limited by these Terms.
        </p>
      </DocumentSection>

      <DocumentSection title="Ownership">
        <p>
          The App, its design, software, branding, question decks, and other
          included content are owned by us or our licensors and are protected by
          intellectual-property laws. These Terms grant only the limited right to
          use the App described above and do not transfer ownership to you.
        </p>
      </DocumentSection>

      <DocumentSection title="Availability and changes">
        <p>
          We may update the App to improve it, add or remove content or features,
          address security or legal requirements, or maintain compatibility with
          third-party services and operating systems. We may also suspend or
          discontinue the App where reasonably necessary. When applicable law
          requires notice or provides remedies for a change, we will honor those
          requirements.
        </p>
      </DocumentSection>

      <DocumentSection title="Disclaimers and liability">
        <p>
          To the maximum extent permitted by law, the App is provided “as is” and
          “as available.” We do not promise that it will always be uninterrupted,
          error-free, or compatible with every device. We are not responsible for
          what users choose to say, disclose, or do during conversations prompted
          by the App.
        </p>
        <p>
          To the maximum extent permitted by law, we are not liable for indirect,
          incidental, special, consequential, or punitive losses arising from use
          of the App. Nothing in these Terms excludes or limits liability or
          consumer rights that cannot lawfully be excluded or limited.
        </p>
      </DocumentSection>

      <DocumentSection title="Ending use">
        <p>
          You may stop using the App at any time by deleting it. We may restrict
          or end your right to use the App if you materially breach these Terms.
          Provisions that by their nature should continue—including ownership,
          disclaimers, and liability provisions—survive termination.
        </p>
      </DocumentSection>

      <DocumentSection title="Governing law and changes to these terms">
        <p>
          These Terms are governed by the laws of Slovenia, without depriving you
          of mandatory protections available under the law of your country of
          residence. Courts have jurisdiction as provided by applicable law.
        </p>
        <p>
          We may update these Terms when the App, our practices, or legal
          requirements change. The effective date above identifies the current
          version. If a change materially affects your rights, we will provide
          notice where required by law.
        </p>
      </DocumentSection>

      <DocumentSection title="Contact">
        <p>
          Questions, complaints, and support requests can be sent to{" "}
          <a className="font-semibold text-ink underline" href="mailto:hello@avarra.dev">
            hello@avarra.dev
          </a>
          .
        </p>
      </DocumentSection>
    </DocumentPage>
  );
}
