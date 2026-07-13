export interface LoopRequest {
  post: string;
  iteration?: number;
}

export interface LoopResult {
  iteration: number;
  sourcePost: string;
  productName: string;
  opportunity: string;
  businessModel: string;
  oneShotPrompt: string;
  launchPost: string;
  nextInput: string;
  theoreticalValuation: string;
  engine: "template";
  disclaimer: string;
  generatedAt: string;
}
