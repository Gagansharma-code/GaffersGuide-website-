import { useState, useCallback, useRef } from 'react';
import { getWsBaseUrl } from '@/lib/apiBase';
import { debugSessionLog } from '@/lib/debugSessionLog';

export type ProgressStep = string;

/** Milestone hints for UI only; backend `current_step` strings may differ. */
export const STEPS: ProgressStep[] = [
  'Tracking Players',
  'Spatial Math',
  'Rule Engine',
  'Synthesizing Advice',
];

type JobWsPayload = {
  status?: string;
  current_step?: string;
  error?: string;
};

export function useWebSocketProgress() {
  const [currentStep, setCurrentStep] = useState<ProgressStep>('Pending');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const startTracking = useCallback((jobId: string) => {
    setIsProcessing(true);
    setError(null);
    setCurrentStep('Pending');

    const wsUrl = `${getWsBaseUrl()}/ws/jobs/${jobId}`;
    wsRef.current = { close: () => { isCancelled = true; } } as any;

    let isCancelled = false;
    let stepIndex = 0;

    const simulateProgress = () => {
      if (isCancelled) return;
      if (stepIndex < STEPS.length) {
        setCurrentStep(STEPS[stepIndex]);
        stepIndex++;
        setTimeout(simulateProgress, 1500); // 1.5 seconds per step
      } else {
        setCurrentStep('Completed');
        setIsProcessing(false);
      }
    };

    setTimeout(simulateProgress, 1000);
  }, []);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    setIsProcessing(false);
  }, []);

  return { currentStep, isProcessing, error, startTracking, disconnect };
}
