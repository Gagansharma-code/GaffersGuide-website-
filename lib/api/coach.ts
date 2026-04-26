import { getApiBaseUrl } from "@/lib/apiBase";

export interface CoachingAdviceItem {
  frame_idx: number;
  team: string;
  flaw: string;
  severity: string;
  evidence: string;
  matched_philosophy_author: string;
  fc25_player_roles: string[] | null;
  tactical_instruction: string | null;
  tactical_instruction_steps: string[];
  llm_error: string | null;
}

export interface CoachAdviceResponse {
  generated_at: string;
  pipeline: Record<string, unknown>;
  advice_items: CoachingAdviceItem[];
}

const _sleep = (ms: number): Promise<void> =>
  new Promise<void>((r) => {
    setTimeout(r, ms);
  });

// #region agent log
function _coachDebug(
  hypothesisId: string,
  location: string,
  message: string,
  data: Record<string, unknown>,
): void {
  fetch("http://127.0.0.1:7265/ingest/b94af6c0-0f3f-4385-ab39-095f9a480704", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "bb63ae",
    },
    body: JSON.stringify({
      sessionId: "bb63ae",
      hypothesisId,
      location,
      message,
      data,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
}
// #endregion

function coachAdviceUrl(
  jobId: string,
  llmEngine: "local" | "cloud",
  skipLlm: boolean,
): string {
  const base = getApiBaseUrl();
  return `${base}/api/v1/coach/advice?${new URLSearchParams({
    job_id: jobId,
    llm_engine: llmEngine,
    skip_llm: skipLlm ? "true" : "false",
  }).toString()}`;
}

async function _coachFetch(url: string): Promise<Response> {
  try {
    return await fetch(url);
  } catch (e) {
    const inner = e instanceof Error ? e.message : String(e);
    // #region agent log
    _coachDebug("A", "coach.ts:_coachFetch", "fetch_rejected", {
      inner,
      urlHost: (() => {
        try {
          return new URL(url).host;
        } catch {
          return "bad-url";
        }
      })(),
    });
    // #endregion
    const base = getApiBaseUrl();
    throw new Error(
      `Coach request could not reach the API (${inner}). ` +
        `Confirm FastAPI is running at ${base}. ` +
        `Safari/WebKit often reports this as "Load failed" when the connection drops or times out ` +
        `(a long local-Ollama refresh on /coach/advice can cause that).`,
    );
  }
}

/**
 * Load job-scoped coaching advice from the FastAPI pipeline (report JSON + optional local LLM refresh).
 * Polls with `skip_llm=true` so HTTP 425 wait loops do not block on Ollama.
 * For `llm_engine=local`, attempts one enrichment request (`skip_llm=false`); if it fails or times out,
 * returns the fast disk-backed response so the timeline still renders.
 */
export async function getCoachAdvice(
  jobId: string,
  llmEngine: "local" | "cloud" = "local",
): Promise<CoachAdviceResponse> {
  // Mock coach advice
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        generated_at: new Date().toISOString(),
        pipeline: {},
        advice_items: [
          {
            frame_idx: 100,
            team: 'A',
            flaw: 'Poor spacing in midfield',
            severity: 'High',
            evidence: 'Midfielders are clustered together.',
            matched_philosophy_author: 'Pep Guardiola',
            fc25_player_roles: ['CM', 'CDM'],
            tactical_instruction: 'Spread out and create triangles.',
            tactical_instruction_steps: ['Move to open space', 'Look for passing lanes'],
            llm_error: null
          }
        ]
      });
    }, 1000);
  });
}

export interface CoachChatResponse {
  reply: string;
}

export async function postCoachChat(params: {
  message: string;
  jobId: string | null;
  llmEngine: "local" | "cloud";
}): Promise<CoachChatResponse> {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/api/v1/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: params.message,
      job_id: params.jobId,
      llm_engine: params.llmEngine,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as CoachChatResponse & {
    detail?: unknown;
  };

  if (!res.ok) {
    const detail =
      typeof data.detail === "string"
        ? data.detail
        : JSON.stringify(data.detail ?? {}).slice(0, 400);
    throw new Error(`Chat failed (HTTP ${res.status}): ${detail}`);
  }

  return { reply: data.reply ?? "" };
}
