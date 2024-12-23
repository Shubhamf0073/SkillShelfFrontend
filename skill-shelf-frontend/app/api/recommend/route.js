import axios from 'axios';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    const topN = searchParams.get('topN');
    const response = await axios.get(`http://127.0.0.1:8000/api/recommend/?query=${query}&topN=${topN}`);
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
  }
}