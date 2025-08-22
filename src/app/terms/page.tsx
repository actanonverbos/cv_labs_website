import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Terms of Service - CV Labs",
  description: "Terms of Service for CV Labs landing page design services",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-4xl font-medium mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                By accessing and using CV Labs services, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do 
                not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Services</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                CV Labs provides landing page design and development services. We offer various packages 
                including website design, product design add-ons, and custom enterprise solutions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Payment Terms</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Payment terms are as follows:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>50% deposit required to begin work</li>
                <li>50% final payment due upon completion and approval</li>
                <li>For projects over £5,000, a 3-payment schedule is available</li>
                <li>Late payments may incur additional fees</li>
                <li>All prices are in British Pounds (GBP)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Project Timeline</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Standard project timelines are 2-3 weeks from project start. Rush delivery is available 
                for an additional fee. Delays caused by client feedback or content provision may extend 
                the timeline accordingly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Revisions</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Each package includes one round of revisions. Additional revisions beyond the included 
                amount will be charged at our standard hourly rate. Revisions must be requested within 
                30 days of project completion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Upon full payment, you will own the rights to the final delivered work. CV Labs retains 
                the right to showcase the work in our portfolio and marketing materials unless otherwise 
                agreed upon in writing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Refund Policy</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We offer a 30-day money-back guarantee if we fail to meet the agreed-upon requirements 
                in our initial proposal. Refunds are not available for completed work that meets the 
                original specifications.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                CV Labs shall not be liable for any indirect, incidental, special, consequential, or 
                punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                or other intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-muted-foreground">
                Email: legal@cvlabs.dev<br />
                Address: CV Labs, United Kingdom
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
