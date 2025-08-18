import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Privacy Policy - CV Labs",
  description: "Privacy Policy for CV Labs landing page design services",
}

export default function PrivacyPage() {
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
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, 
                fill out a form, or contact us for support. This may include your name, email address, 
                phone number, and any other information you choose to provide.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends and usage</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy. We may share your information 
                with trusted service providers who assist us in operating our website and conducting our business.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of 
                transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Cookies</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We use cookies and similar technologies to enhance your experience on our website. 
                Cookies help us understand how you use our site and improve our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                You have the right to access, update, or delete your personal information. 
                If you wish to exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-muted-foreground">
                Email: privacy@cvlabs.dev<br />
                Address: CV Labs, United Kingdom
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
