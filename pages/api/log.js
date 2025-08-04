export default async function handler(req, res) {
  const log = {
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    ua: req.headers['user-agent'],
    method: req.method,
    path: req.url,
    headers: req.headers,
    timestamp: new Date().toISOString(),
  };

  // 🔁 Send log to Pipedream
  try {
    await fetch("https://eoc7rtgq66dkqic.m.pipedream.net", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log)
    });
  } catch (e) {
    console.error("Failed to forward to Pipedream:", e);
  }

  // Reply with empty pixel
  res.setHeader("Content-Type", "image/gif");
  const emptyGif = Buffer.from("R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", "base64");
  res.status(200).send(emptyGif);
}
