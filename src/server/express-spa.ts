interface SpaRequest {
  path: string;
  get(name: string): string | undefined;
}

interface SpaResponse {
  status(code: number): SpaResponse;
  json(data: unknown): void;
  render(view: string): void;
  sendFile?(path: string): void;
}

type NextFunction = () => void;

export interface SpaCatchAllOptions {
  view: string;
  apiPrefixes?: string[];
  staticPrefixes?: string[];
}

export function spaCatchAll(opts: SpaCatchAllOptions) {
  const apiPrefixes = opts.apiPrefixes || ['/api/'];
  const staticPrefixes = opts.staticPrefixes || ['/public/'];

  return (req: SpaRequest, res: SpaResponse, _next: NextFunction) => {
    for (const prefix of [...apiPrefixes, ...staticPrefixes]) {
      if (req.path.startsWith(prefix)) {
        return res.status(404).json({ error: 'not_found' });
      }
    }
    return res.render(opts.view);
  };
}
