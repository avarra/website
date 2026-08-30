import type { Metadata } from "next";
import { DocumentPage, DocumentSection } from "@/app/documents/_components/document-page";
import { createSiteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createSiteMetadata({
  title: "between us Privacy Policy | Avarra",
  description: "How between us handles local data, analytics, and purchases.",
  path: "/documents/between-us/privacy-policy",
  index: true,
});

export default function BetweenUsPrivacyPolicyPage() {
  return (
    <DocumentPage documentLabel="Privacy" title="Privacy Policy" effectiveDate="7 August 2026">
      <DocumentSection title="Who operates the app">
        <p>
          between us is operated by Aerio, Aiken Tine Ahac s.p. (“we”, “us”, or
          “Avarra”). Questions and privacy requests can be sent to{" "}
          <a className="font-semibold text-ink underline" href="mailto:hello@avarra.dev">
            hello@avarra.dev
          </a>
          .
        </p>
      </DocumentSection>

      <DocumentSection title="Information kept on your device">
        <p>
          Player names, profile photos, game progress, your analytics choice,
          and a cached premium-access status are stored locally on your device so
          the app can work without an account. Profile photos are used only as
          on-device avatars. Your names, photos, progress, and answers are never
          uploaded by us.
        </p>
        <p>
          Deleting a player removes that player’s saved progress and profile
          photo. Removing the app through iOS removes the app’s remaining local
          data.
        </p>
      </DocumentSection>

      <DocumentSection title="Optional analytics">
        <p>
          Analytics is off until you choose to allow it. If you opt in, Amplitude
          receives an anonymous device identifier, app and device details,
          product interactions, screen and lifecycle activity, coarse location
          derived from network information, and diagnostic data. Purchase-related
          events may include product, price, currency, transaction identifier,
          and RevenueCat anonymous user identifier.
        </p>
        <p>
          We use this information to understand app performance, improve
          features, and diagnose failures. We never send player names, profile
          photos, or anything you say or answer in the game to Amplitude. You can
          withdraw consent at any time by turning Analytics off in the app’s
          Settings; sending stops and unsent local analytics events are cleared.
        </p>
      </DocumentSection>

      <DocumentSection title="Purchases">
        <p>
          Apple processes payments and RevenueCat processes anonymous purchase
          history, restore results, transaction data, and entitlement status.
          This information is needed to sell, restore, and validate the lifetime
          unlock and to understand purchase reliability. The app uses a
          RevenueCat-generated anonymous App User ID and does not require an
          account.
        </p>
      </DocumentSection>

      <DocumentSection title="Processors, retention, and international processing">
        <p>
          Our processors are Apple for App Store payments, RevenueCat for
          purchase and entitlement infrastructure, and—only with your
          consent—Amplitude EU for product analytics. They retain and process
          data under their own service settings, contracts, and legal
          obligations. Information may be processed outside your country with
          contractual and legal safeguards appropriate to the destination.
        </p>
        <p>
          Local data remains until you delete a player or remove the app. We
          retain processor data only as long as needed for the purposes above,
          our configured service retention periods, dispute prevention, and
          legal obligations.
        </p>
      </DocumentSection>

      <DocumentSection title="Your choices and requests">
        <p>
          You can decline analytics on first launch, change the choice later in
          Settings, delete individual local player data in the app, or remove all
          local app data by uninstalling. To request access to or deletion of
          analytics data, email{" "}
          <a className="font-semibold text-ink underline" href="mailto:hello@avarra.dev">
            hello@avarra.dev
          </a>
          . Include the RevenueCat anonymous user ID or another identifier shown
          to you if available; we may need it to locate anonymous records.
        </p>
      </DocumentSection>

      <DocumentSection title="Age and policy changes">
        <p>
          between us is intended for people aged 13 and over and is not directed
          to children under 13. We may update this policy when the app or its
          processors change. The effective date above identifies the current
          version.
        </p>
      </DocumentSection>
    </DocumentPage>
  );
}
