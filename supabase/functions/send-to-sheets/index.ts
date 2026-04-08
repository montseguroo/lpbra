const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const createJWT = async (serviceAccount: { client_email: string; private_key: string }) => {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const encode = (obj: unknown) =>
    btoa(JSON.stringify(obj)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const headerB64 = encode(header);
  const payloadB64 = encode(payload);
  const signingInput = `${headerB64}.${payloadB64}`;

  // Import the private key
  const pemContents = serviceAccount.private_key
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\n/g, '');
  const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(signingInput)
  );

  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${signingInput}.${sigB64}`;
};

const getAccessToken = async (serviceAccount: { client_email: string; private_key: string }) => {
  const jwt = await createJWT(serviceAccount);
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Token error: ${JSON.stringify(data)}`);
  return data.access_token as string;
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const saJson = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_JSON');
    if (!saJson) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON not configured');

    const spreadsheetId = Deno.env.get('GOOGLE_SPREADSHEET_ID');
    if (!spreadsheetId) throw new Error('GOOGLE_SPREADSHEET_ID not configured');

    const serviceAccount = JSON.parse(saJson);
    const body = await req.json();

    const {
      nome = '',
      telefone = '',
      porteEmpresa = '',
      planoAtual = '',
      faixasEtarias = {},
      hospitais = '',
      doencas = '',
      utm_source = '',
      utm_medium = '',
      utm_campaign = '',
      utm_term = '',
      utm_content = '',
      utm_id = '',
      gclid = '',
    } = body;

    const totalVidas = Object.values(faixasEtarias as Record<string, number>).reduce(
      (sum: number, count: number) => sum + count,
      0
    );

    const now = new Date();
    const data = now.toLocaleDateString('pt-BR');
    const horario = now.toLocaleTimeString('pt-BR');

    // Faixas etárias formatadas
    const faixasStr = Object.entries(faixasEtarias as Record<string, number>)
      .filter(([_, count]) => count > 0)
      .map(([faixa, count]) => `${faixa}: ${count}`)
      .join(', ') || '';

    const row = [
      nome,
      telefone,
      porteEmpresa,
      planoAtual,
      totalVidas,
      faixasStr,
      hospitais,
      doencas,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      utm_id,
      gclid,
      data,
      horario,
    ];

    const accessToken = await getAccessToken(serviceAccount);

    const sheetsRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:Q:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [row] }),
      }
    );

    const sheetsData = await sheetsRes.json();
    if (!sheetsRes.ok) {
      throw new Error(`Sheets API error [${sheetsRes.status}]: ${JSON.stringify(sheetsData)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: unknown) {
    console.error('Error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
