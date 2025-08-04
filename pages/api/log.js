// File: pages/api/log.js
export default async function handler(req, res) {
  const pipedreamUrl = "https://eoc7rtgq66dkqic.m.pipedream.net"; // Replace this!

  if (req.method === "POST") {
    try {
      const payload = req.body;

      await fetch(pipedreamUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      res.status(200).json({ status: "forwarded" });
    } catch (error) {
      console.error("Forwarding failed:", error);
      res.status(500).json({ error: "Failed to forward" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

