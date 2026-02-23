export function wantsJson(req: { get(name: string): string | undefined }): boolean {
  return (req.get('accept') || '').includes('application/json');
}
