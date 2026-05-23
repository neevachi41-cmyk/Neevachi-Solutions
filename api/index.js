export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.json({ status: 'OK', message: 'Server is running' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
