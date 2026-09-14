CREATE TABLE public.rsvps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  adultos INTEGER NOT NULL DEFAULT 1,
  criancas INTEGER NOT NULL DEFAULT 0,
  observacao TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT INSERT ON public.rsvps TO anon;
GRANT SELECT, INSERT ON public.rsvps TO authenticated;
GRANT ALL ON public.rsvps TO service_role;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Qualquer visitante pode confirmar presenca" ON public.rsvps FOR INSERT TO anon, authenticated WITH CHECK (
  length(trim(nome)) BETWEEN 2 AND 80
  AND adultos BETWEEN 0 AND 20
  AND criancas BETWEEN 0 AND 20
  AND (observacao IS NULL OR length(observacao) <= 500)
);