'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function OrdersContent() {
  const q = useSearchParams();
  const server = q.get('server') || '1';
  const country = q.get('country') || '6';

  const [services, setServices] = useState<any[]>([]);
  const [operators, setOperators] = useState<any[]>([]);
  const [produk, setProduk] = useState('wa');
  const [operator, setOperator] = useState('any');
  const [provider, setProvider] = useState('');
  const [result, setResult] = useState<any>();
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      const s = await fetch(
        `/api/services?server=${server}&country=${country}`
      ).then(x => x.json());

      setServices(s.data?.data || s.data || []);

      if (server === '1' || server === '4') {
        const o = await fetch(
          `/api/operators?server=${server}&country=${country}`
        ).then(x => x.json());

        setOperators(o.data?.data || o.data || []);
      }
    })();
  }, [server, country]);

  async function order() {
    setErr('');

    const body: any = {
      server,
      country,
      produk,
    };

    if (server === '1') body.operator = operator;
    if (server === '2' || server === '4') body.provider = provider;

    const r = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const j = await r.json();

    if (!j.ok) {
      setErr(j.error);
    } else {
      setResult(j.data);
    }
  }

  return (
    <main className="container section">
      <h1>Order Nomor</h1>
      <p className="muted">
        Server {server} · Country {country}
      </p>

      <div className="card">
        <div className="field">
          <label>Produk</label>

          <select
            value={produk}
            onChange={e => setProduk(e.target.value)}
          >
            {services.map((s: any, i: number) => (
              <option
                key={i}
                value={s.code || s.id || s.value}
              >
                {s.name || s.code || s.id || 'Service'}
              </option>
            ))}
          </select>
        </div>

        {(server === '1' || server === '4') && (
          <div className="field">
            <label>Operator</label>

            <select
              value={operator}
              onChange={e => setOperator(e.target.value)}
            >
              {operators.map((o: any, i: number) => (
                <option
                  key={i}
                  value={o.code || o.id || 'any'}
                >
                  {o.name || o.code || 'Operator'}
                </option>
              ))}

              <option value="any">
                Random Operator
              </option>
            </select>
          </div>
        )}

        {(server === '2' || server === '4') && (
          <div className="field">
            <label>Provider</label>

            <select
              value={provider}
              onChange={e => setProvider(e.target.value)}
            >
              <option value="">
                Pilih provider
              </option>

              {services.map((s: any, i: number) => (
                <option
                  key={i}
                  value={s.provider || s.id}
                >
                  {s.provider || s.name || s.id}
                </option>
              ))}
            </select>
          </div>
        )}

        <button className="btn" onClick={order}>
          Beli Nomor
        </button>

        {err && (
          <p className="error">
            {err}
          </p>
        )}

        {result && (
          <div
            className="card"
            style={{ marginTop: 15 }}
          >
            <b>Order berhasil</b>

            <pre style={{ whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}

export default function Orders() {
  return (
    <Suspense
      fallback={
        <main className="container section">
          <p className="muted">Memuat halaman order...</p>
        </main>
      }
    >
      <OrdersContent />
    </Suspense>
  );
}
