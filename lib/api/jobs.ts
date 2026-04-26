import { getApiBaseUrl } from '@/lib/apiBase';
import { debugSessionLog } from '@/lib/debugSessionLog';
import type { TrackingPayload } from '@/lib/types/trackingTypes';

export interface JobResponse {
  job_id: string;
  status: string;
}

/** Local Modal-less dev: default `local` unless `NEXT_PUBLIC_CV_ENGINE=cloud`. */
const defaultCvEngine =
  process.env.NEXT_PUBLIC_CV_ENGINE === 'cloud' ? 'cloud' : 'local';

/** Default Llama/Ollama path unless user chose cloud in Engine Settings. */
export async function createJob(
  file: File,
  llmEngine: 'local' | 'cloud' = 'local',
): Promise<JobResponse> {
  // Mock job creation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ job_id: 'mock-job-123', status: 'started' });
    }, 500);
  });
}

const _sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/**
 * Fetch tracking JSON. Retries on HTTP 425 while the pipeline is still writing
 * `{job_id}_tracking_data.json` (see FastAPI `get_job_tracking`).
 */
export async function getTracking(jobId: string): Promise<TrackingPayload> {
  // Mock tracking response
  return {
    frames: [],
    events: [],
    metadata: {
      fps: 30,
      width: 1920,
      height: 1080
    }
  } as any;
}


