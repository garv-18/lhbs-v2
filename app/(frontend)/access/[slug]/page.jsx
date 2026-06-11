import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import { getPayload } from 'payload';
import configPromise from '../../../../payload.config';

export default async function AccessPage({ params, searchParams }) {
  const session = await getServerSession(authOptions);
  if (!session) return <div>Please sign in to access this course.</div>;

  const payload = await getPayload({ config: configPromise });
  const payment = await payload.find({
    collection: 'payments',
    where: {
      and: [
        { userEmail: { equals: session.user.email } },
        { courseSlug: { equals: params.slug } },
        { paid: { equals: true } },
      ],
    },
  });

  if (!payment.docs.length) return <div>You have not purchased this course.</div>;

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: "2rem", background: "#f9f9f9", borderRadius: "8px", textAlign: "center" }}>
      <h1>🎉 Welcome to the Live Healthy and Be Safe Family!</h1>
      <p style={{ fontSize: "1.2rem", margin: "1.5rem 0" }}>
        Thank you for joining our course! Your access will be activated within 24 hours.<br />
        We appreciate your trust in us and are excited to support your learning journey.
      </p>
      <p>
        If you have any questions or need assistance, feel free to&nbsp;
        <a
          href="https://api.whatsapp.com/send?phone=919713600085&text=Hello%2C%20%0AI%20am%20Interested%20to%20Learn%20Martial%20Arts%0APlease%20Share%20Details%20with%20me."
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#25D366", fontWeight: "bold" }}
        >
          contact us on WhatsApp
        </a>
        . We're here to help!
      </p>
    </div>
  );
}
