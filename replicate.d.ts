export declare type PredictionStatus = "starting" | "processing" | "succeeded" | "failed" | "canceled";
export declare type PredictionInput = string | Record<string, any> | any[];
export declare type PredictionOutput = PredictionInput;
export interface ReplicateInputProps {
    token?: string;
    baseUrl?: string;
    proxyUrl?: string;
    httpClient?: HTTPClient;
    pollingInterval?: number;
}
export interface Replicate extends ReplicateInputProps {
}
export declare class Replicate {
    models: {
        get: (path: string, version?: string) => Promise<ReplicateModel>;
    };
    constructor({ token, proxyUrl, httpClient, pollingInterval }?: ReplicateInputProps);
    getModel(path: string): Promise<any>;
    getPrediction(id: string): Promise<any>;
    startPrediction(modelVersion: string, input: PredictionInput, webhookCompleted?: string): Promise<any>;
    protected callHttpClient({ url, method, event, body }: HTTPClientRequest): Promise<any>;
}
export interface ReplicateModelInputs {
    path: string;
    version: string;
    replicate?: any;
    modelDetails?: any;
}
export interface ReplicateModel extends ReplicateModelInputs {
}
export declare class ReplicateModel {
    static fetch(options: ReplicateModelInputs): Promise<ReplicateModel>;
    constructor({ path, version, replicate }: ReplicateModelInputs);
    getModelDetails(): Promise<void>;
    predictor(input: PredictionInput): AsyncGenerator<any, void, unknown>;
    predict(input?: PredictionInput): Promise<any>;
}
export interface HTTPClientRequest {
    url: string;
    method: "get" | "post";
    event: "getModel" | "startPrediction" | "getPrediction";
    body?: Record<string, any>;
}
interface HTTPClientAuthenticatedRequest extends HTTPClientRequest {
    token: string;
}
export interface HTTPClient {
    get: (request: HTTPClientAuthenticatedRequest) => Promise<any>;
    post: (request: HTTPClientAuthenticatedRequest) => Promise<any>;
}
export declare class DefaultFetchHTTPClient implements HTTPClient {
    headers: Record<string, string>;
    constructor(token: string);
    importFetch(): Promise<void>;
    get({ url }: HTTPClientAuthenticatedRequest): Promise<any>;
    post({ url, body }: HTTPClientAuthenticatedRequest): Promise<any>;
}
export default Replicate;
//# sourceMappingURL=replicate.d.ts.map