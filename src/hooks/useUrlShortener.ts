import { useState } from 'react';

interface ShortenerState {
  shortUrl: string | null;
  loading: boolean;
  error: string | null;
}

export function useUrlShortener() {
  const [state, setState] = useState<ShortenerState>({
    shortUrl: null,
    loading: false,
    error: null,
  });

  async function shorten(longUrl: string): Promise<void> {
    setState({ shortUrl: null, loading: true, error: null });

    const encoded = encodeURIComponent(longUrl);

    try {
      // Primary: is.gd API (JSON response, CORS-enabled)
      const res = await fetch(
        `https://is.gd/create.php?format=json&url=${encoded}`
      );
      const data = await res.json() as { shorturl?: string; errorcode?: number; errormessage?: string };

      if (data.shorturl) {
        setState({ shortUrl: data.shorturl, loading: false, error: null });
        return;
      }

      // is.gd returned an error
      throw new Error(data.errormessage ?? 'Error al acortar la URL');
    } catch (_primaryError) {
      // Fallback: TinyURL API (plain text response)
      try {
        const fallbackRes = await fetch(
          `https://tinyurl.com/api-create.php?url=${encoded}`
        );
        const shortUrl = await fallbackRes.text();

        if (shortUrl.startsWith('https://tinyurl.com/')) {
          setState({ shortUrl, loading: false, error: null });
          return;
        }

        throw new Error('Respuesta inválida del servicio de acortado');
      } catch {
        setState({
          shortUrl: null,
          loading: false,
          error: 'No se pudo acortar la URL. Por favor intenta de nuevo.',
        });
      }
    }
  }

  function reset() {
    setState({ shortUrl: null, loading: false, error: null });
  }

  return { ...state, shorten, reset };
}
