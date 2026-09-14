import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";

export const rsvpSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Informe o nome completo do convidado")
    .max(80, "O nome pode ter no máximo 80 caracteres"),
  adultos: z.coerce
    .number()
    .int("Use números inteiros")
    .min(0, "Quantidade inválida")
    .max(20, "No máximo 20"),
  criancas: z.coerce
    .number()
    .int("Use números inteiros")
    .min(0, "Quantidade inválida")
    .max(20, "No máximo 20"),
  observacao: z.string().trim().max(500, "Observação muito longa").optional().or(z.literal("")),
});

export type RsvpInput = z.input<typeof rsvpSchema>;

export type RsvpRow = {
  id: string;
  nome: string;
  adultos: number;
  criancas: number;
  observacao: string | null;
  created_at: string;
};

type AdminSession = { admin?: boolean };

function sessionConfig() {
  return {
    password: process.env["SESSION_SECRET"]!,
    name: "thales-admin",
    maxAge: 60 * 60 * 12,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

function passwordMatches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export const criarConfirmacao = createServerFn({ method: "POST" })
  .inputValidator((data: RsvpInput) => rsvpSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.adultos + data.criancas < 1) {
      throw new Error("Informe pelo menos uma pessoa (adulto ou criança).");
    }

    const supabase = createClient(
      process.env["SUPABASE_URL"]!,
      process.env["SUPABASE_PUBLISHABLE_KEY"]!,
      { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
    );

    const { error } = await supabase.from("rsvps").insert({
      nome: data.nome,
      adultos: data.adultos,
      criancas: data.criancas,
      observacao: data.observacao ? data.observacao : null,
    });

    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const entrarAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: { senha: string }) => z.object({ senha: z.string().max(200) }).parse(data))
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSWORD"];
    if (!expected) throw new Error("Senha de acesso não configurada.");
    if (!passwordMatches(data.senha, expected)) return { ok: false as const };

    const session = await useSession<AdminSession>(sessionConfig());
    await session.update({ admin: true });
    return { ok: true as const };
  });

export const sairAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  await session.clear();
  return { ok: true as const };
});

export const listarConfirmacoes = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  if (!session.data.admin) return { autorizado: false as const, confirmacoes: [] as RsvpRow[] };

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("rsvps")
    .select("id, nome, adultos, criancas, observacao, created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return { autorizado: true as const, confirmacoes: (data ?? []) as RsvpRow[] };
});
